import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

const goldTheme = 0xd4af37;
const obsidianTheme = 0x1a2a2a;

function premiumMaterial(color, isMetallic = false) {
  return new THREE.MeshStandardMaterial({
    color,
    metalness: isMetallic ? 0.85 : 0.15,
    roughness: isMetallic ? 0.2 : 0.35,
    envMapIntensity: 1.5,
  });
}

function disposeObject(object) {
  object.traverse((child) => {
    if (child.geometry) child.geometry.dispose();
    if (child.material) {
      if (Array.isArray(child.material)) {
        child.material.forEach((item) => item.dispose());
      } else {
        child.material.dispose();
      }
    }
  });
}

// Gold particle system
function createParticles(scene) {
  const count = 80;
  const positions = new Float32Array(count * 3);
  const velocities = [];
  const sizes = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
    velocities.push({
      x: (Math.random() - 0.5) * 0.005,
      y: Math.random() * 0.008 + 0.002,
      z: (Math.random() - 0.5) * 0.005,
    });
    sizes[i] = Math.random() * 0.06 + 0.02;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const material = new THREE.PointsMaterial({
    color: 0xd4af37,
    size: 0.06,
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  return { points, velocities, positions };
}

function updateParticles(particles, time) {
  const { positions, velocities } = particles;
  const count = velocities.length;

  for (let i = 0; i < count; i++) {
    positions[i * 3] += velocities[i].x;
    positions[i * 3 + 1] += velocities[i].y;
    positions[i * 3 + 2] += velocities[i].z;

    // Reset particle when it goes too high
    if (positions[i * 3 + 1] > 5) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = -4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
  }

  particles.points.geometry.attributes.position.needsUpdate = true;
  particles.points.material.opacity = 0.3 + Math.sin(time * 0.8) * 0.15;
}

export default function ChessHeroScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0e16, 0.06);

    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(4, 3, 5);
    camera.lookAt(0, 0.8, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    mount.appendChild(renderer.domElement);

    // Lighting
    const ambient = new THREE.HemisphereLight(0x2a3a5a, 0x0a0e16, 0.4);

    const keyLight = new THREE.DirectionalLight(0xfff0d8, 2.5);
    keyLight.position.set(5, 8, 4);
    keyLight.target.position.set(0, 0.8, 0);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.bias = -0.0002;
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 20;
    keyLight.shadow.camera.left = -4;
    keyLight.shadow.camera.right = 4;
    keyLight.shadow.camera.top = 4;
    keyLight.shadow.camera.bottom = -4;

    const goldLight = new THREE.PointLight(0xd4af37, 3.0, 12, 2);
    goldLight.position.set(-2, 3, -2);

    const rimLight = new THREE.PointLight(0xffa552, 2.5, 14, 2);
    rimLight.position.set(-3, 2, 3);

    const accentLight = new THREE.PointLight(0x5fd6c8, 1.0, 10, 2);
    accentLight.position.set(3, 1, -3);

    scene.add(ambient, keyLight, keyLight.target, goldLight, rimLight, accentLight);

    // Load 3D model
    const knight = new THREE.Group();
    scene.add(knight);

    const objLoader = new OBJLoader();
    objLoader.load(
      '/KNIGHT_3d%20model/12936_Wooden_Chess_Knight_Side_B_V2_l3.obj',
      (object) => {
        const goldMat = premiumMaterial(goldTheme, true);
        goldMat.metalness = 0.6; // less metal to catch diffuse light better
        goldMat.roughness = 0.4;
        
        object.traverse((child) => {
          if (child.isMesh) {
            child.geometry.computeVertexNormals(); // Fix black lighting
            child.castShadow = true;
            child.receiveShadow = true;
            child.material = goldMat;
          }
        });

        // Compute bounding box
        const box = new THREE.Box3().setFromObject(object);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        // Center the object's origin
        object.position.set(-center.x, -center.y, -center.z);

        // Put it in a wrapper so we can scale and rotate the whole centered object
        const wrapper = new THREE.Group();
        wrapper.add(object);
        
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 5.0 / maxDim; // Make it significantly larger
        
        wrapper.scale.setScalar(scale);
        
        // Model is exported Z-up, so rotate X to stand it up
        wrapper.rotation.x = -Math.PI / 2;
        // Rotate around local Z to face camera
        wrapper.rotation.z = Math.PI / 6;
        wrapper.position.y = 0.5; // move it up

        knight.add(wrapper);
      },
      undefined,
      (error) => console.error('Error loading model:', error)
    );

    // Gold particles
    const particles = createParticles(scene);

    // Invisible floor for shadow
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 20),
      new THREE.MeshStandardMaterial({
        color: 0x05080c,
        roughness: 0.8,
        metalness: 0.0,
        transparent: true,
        opacity: 0.4,
      })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.1;
    floor.receiveShadow = true;
    scene.add(floor);

    const resize = () => {
      const width = Math.max(1, mount.clientWidth);
      const height = Math.max(1, mount.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const clock = new THREE.Clock();
    const animate = () => {
      const time = clock.getElapsedTime();

      // Knight floating and slow rotation
      knight.position.y = Math.sin(time * 0.6) * 0.15 + 0.1;
      knight.rotation.y = time * 0.18;

      // Subtle tilt
      knight.rotation.z = Math.sin(time * 0.4) * 0.03;
      knight.rotation.x = Math.cos(time * 0.3) * 0.02;

      // Camera gentle orbit
      const isMobile = mount.clientWidth < 720;
      const radius = isMobile ? 5.5 : 6.5;
      const camAngle = time * 0.06 + 0.5;
      camera.position.x = Math.sin(camAngle) * radius;
      camera.position.z = Math.cos(camAngle) * radius;
      camera.position.y = 2.5 + Math.sin(time * 0.15) * 0.3;
      camera.lookAt(0, 0.9, 0);

      // Shift camera locally to place knight on the right for desktop
      if (!isMobile) {
        camera.translateX(-2.0); // Move camera left, placing knight on the right
      }

      // Animate lights
      goldLight.intensity = 2.5 + Math.sin(time * 0.7) * 1.0;
      rimLight.position.x = -3 + Math.sin(time * 0.3) * 1.5;
      accentLight.position.z = -3 + Math.cos(time * 0.25) * 1.5;

      // Update particles
      updateParticles(particles, time);

      renderer.render(scene, camera);
    };

    resize();
    renderer.setAnimationLoop(animate);
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      renderer.setAnimationLoop(null);
      disposeObject(scene);
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="hero-scene" ref={mountRef} aria-hidden="true" />;
}