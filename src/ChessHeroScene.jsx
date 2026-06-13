import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const darkSquare = 0x12352f;
const lightSquare = 0xf0d190;
const goldPiece = 0xd7a448;
const ivoryPiece = 0xf6ead3;
const greenPiece = 0x1f6a5a;

function material(color, roughness = 0.54, metalness = 0.18) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness,
    metalness,
  });
}

function cylinder(radiusTop, radiusBottom, height, color) {
  return new THREE.Mesh(
    new THREE.CylinderGeometry(radiusTop, radiusBottom, height, 34),
    material(color),
  );
}

function sphere(radius, color) {
  return new THREE.Mesh(new THREE.SphereGeometry(radius, 34, 18), material(color));
}

function box(width, height, depth, color) {
  return new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material(color));
}

function makePawn(color) {
  const group = new THREE.Group();
  const parts = [
    cylinder(0.34, 0.44, 0.14, color),
    cylinder(0.22, 0.3, 0.48, color),
    sphere(0.25, color),
  ];
  parts[0].position.y = 0.07;
  parts[1].position.y = 0.38;
  parts[2].position.y = 0.74;
  parts.forEach((part) => {
    part.castShadow = true;
    part.receiveShadow = true;
    group.add(part);
  });
  return group;
}

function makeKing(color) {
  const group = new THREE.Group();
  const parts = [
    cylinder(0.42, 0.52, 0.18, color),
    cylinder(0.3, 0.38, 0.72, color),
    sphere(0.25, color),
    box(0.12, 0.5, 0.12, color),
    box(0.42, 0.12, 0.12, color),
  ];
  parts[0].position.y = 0.09;
  parts[1].position.y = 0.48;
  parts[2].position.y = 0.92;
  parts[3].position.y = 1.28;
  parts[4].position.y = 1.38;
  parts.forEach((part) => {
    part.castShadow = true;
    part.receiveShadow = true;
    group.add(part);
  });
  return group;
}

function makeKnight(color) {
  const group = new THREE.Group();
  const base = cylinder(0.42, 0.54, 0.18, color);
  const neck = cylinder(0.24, 0.34, 0.68, color);
  const head = box(0.45, 0.34, 0.62, color);
  const crest = box(0.16, 0.36, 0.16, color);
  base.position.y = 0.09;
  neck.position.set(-0.06, 0.48, 0);
  neck.rotation.z = -0.22;
  head.position.set(0.08, 0.9, 0.05);
  head.rotation.z = -0.38;
  crest.position.set(-0.1, 1.08, -0.04);
  [base, neck, head, crest].forEach((part) => {
    part.castShadow = true;
    part.receiveShadow = true;
    group.add(part);
  });
  return group;
}

function placePiece(piece, x, z, scale = 1) {
  piece.position.set(x, 0.12, z);
  piece.scale.setScalar(scale);
  return piece;
}

function disposeObject(object) {
  object.traverse((child) => {
    if (child.geometry) {
      child.geometry.dispose();
    }
    if (child.material) {
      if (Array.isArray(child.material)) {
        child.material.forEach((item) => item.dispose());
      } else {
        child.material.dispose();
      }
    }
  });
}

export default function ChessHeroScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return undefined;
    }

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x101624, 9, 24);

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 80);
    camera.position.set(5.6, 6.3, 7.8);
    camera.lookAt(0.2, 0.1, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    const ambient = new THREE.HemisphereLight(0xfff4d8, 0x0f302b, 1.9);
    const key = new THREE.DirectionalLight(0xffdf9b, 3.1);
    key.position.set(2.8, 7.2, 4.4);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    const rim = new THREE.PointLight(0x67d8c6, 3.2, 18);
    rim.position.set(-4.5, 3.5, -3.2);
    scene.add(ambient, key, rim);

    const board = new THREE.Group();
    board.position.set(1.75, -0.18, 0.25);
    board.rotation.y = -0.34;
    scene.add(board);

    const squareGeometry = new THREE.BoxGeometry(0.92, 0.1, 0.92);
    const lightMaterial = material(lightSquare, 0.62, 0.08);
    const darkMaterial = material(darkSquare, 0.56, 0.12);

    for (let row = 0; row < 8; row += 1) {
      for (let col = 0; col < 8; col += 1) {
        const square = new THREE.Mesh(
          squareGeometry,
          (row + col) % 2 === 0 ? lightMaterial : darkMaterial,
        );
        square.position.set((col - 3.5) * 0.92, 0, (row - 3.5) * 0.92);
        square.receiveShadow = true;
        board.add(square);
      }
    }

    const edge = new THREE.Mesh(
      new THREE.BoxGeometry(7.8, 0.18, 7.8),
      material(0x091a18, 0.42, 0.2),
    );
    edge.position.y = -0.13;
    edge.receiveShadow = true;
    board.add(edge);

    const king = placePiece(makeKing(goldPiece), 1.38, -1.38, 1.05);
    const knight = placePiece(makeKnight(ivoryPiece), -0.46, 0.46, 0.95);
    const pawnA = placePiece(makePawn(greenPiece), -2.3, -1.38, 0.86);
    const pawnB = placePiece(makePawn(ivoryPiece), 2.3, 1.38, 0.86);
    const pawnC = placePiece(makePawn(goldPiece), -1.38, 2.3, 0.78);
    [king, knight, pawnA, pawnB, pawnC].forEach((piece) => board.add(piece));

    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(8.8, 72),
      new THREE.MeshStandardMaterial({
        color: 0x101624,
        roughness: 0.72,
        metalness: 0.06,
        transparent: true,
        opacity: 0.42,
      }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.34;
    floor.receiveShadow = true;
    scene.add(floor);

    const resize = () => {
      const width = Math.max(1, mount.clientWidth);
      const height = Math.max(1, mount.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.x = width < 720 ? 4.8 : 5.6;
      camera.position.y = width < 720 ? 6.6 : 6.3;
      camera.position.z = width < 720 ? 9.2 : 7.8;
      camera.lookAt(0.5, 0.05, 0);
      camera.updateProjectionMatrix();
    };

    const clock = new THREE.Clock();
    const animate = () => {
      const time = clock.getElapsedTime();
      board.rotation.y = -0.34 + Math.sin(time * 0.32) * 0.08;
      king.rotation.y = time * 0.45;
      knight.position.x = -0.46 + Math.sin(time * 0.9) * 1.05;
      knight.position.y = 0.12 + Math.sin(time * 1.8) * 0.08;
      knight.rotation.y = Math.sin(time * 0.9) * 0.34;
      pawnA.rotation.y = -time * 0.34;
      pawnB.rotation.y = time * 0.28;
      pawnC.position.y = 0.12 + Math.sin(time * 1.4 + 1.2) * 0.045;
      rim.intensity = 2.6 + Math.sin(time * 1.2) * 0.8;
      renderer.render(scene, camera);
    };

    resize();
    renderer.setAnimationLoop(animate);
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      renderer.setAnimationLoop(null);
      disposeObject(scene);
      squareGeometry.dispose();
      lightMaterial.dispose();
      darkMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="hero-scene" ref={mountRef} aria-hidden="true" />;
}
