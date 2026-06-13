import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const darkSquare = 0x2b1810;
const lightSquare = 0xe8d4b0;
const goldTheme = 0xc9a050;
const ivoryTheme = 0xf2e8d5;
const obsidianTheme = 0x1a2a2a;

function premiumMaterial(color, isMetallic = false) {
  return new THREE.MeshStandardMaterial({
    color,
    metalness: isMetallic ? 0.75 : 0.05,
    roughness: isMetallic ? 0.25 : 0.4,
    envMapIntensity: 1.2,
  });
}

function cylinder(radiusTop, radiusBottom, height, materialObj, segments = 48) {
  return new THREE.Mesh(
    new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segments),
    materialObj,
  );
}

function sphere(radius, materialObj) {
  return new THREE.Mesh(new THREE.SphereGeometry(radius, 48, 32), materialObj);
}

function torus(radius, tube, materialObj) {
  return new THREE.Mesh(new THREE.TorusGeometry(radius, tube, 16, 48), materialObj);
}

function box(width, height, depth, materialObj) {
  return new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), materialObj);
}

function setShadow(part) {
  part.castShadow = true;
  part.receiveShadow = true;
  return part;
}

function addAll(group, parts) {
  parts.forEach((part) => group.add(setShadow(part)));
}

function makeBase(mat) {
  const group = new THREE.Group();
  addAll(group, [
    (() => { const m = cylinder(0.42, 0.5, 0.12, mat); m.position.y = 0.06; return m; })(),
    (() => { const m = cylinder(0.32, 0.42, 0.1, mat); m.position.y = 0.16; return m; })(),
    (() => { const m = torus(0.34, 0.025, mat); m.position.y = 0.21; m.rotation.x = Math.PI / 2; return m; })(),
  ]);
  return group;
}

function makePawn(mat) {
  const group = new THREE.Group();
  addAll(group, makeBase(mat).children.map((c) => c.clone()));

  const stem = cylinder(0.16, 0.27, 0.55, mat);
  stem.position.y = 0.5;

  const collar = cylinder(0.24, 0.18, 0.08, mat);
  collar.position.y = 0.8;

  const head = sphere(0.24, mat);
  head.position.y = 0.98;

  addAll(group, [stem, collar, head]);
  return group;
}

function makeRook(mat) {
  const group = new THREE.Group();
  addAll(group, makeBase(mat).children.map((c) => c.clone()));

  const body = cylinder(0.32, 0.4, 0.85, mat);
  body.position.y = 0.63;

  const collar = torus(0.36, 0.03, mat);
  collar.position.y = 1.05;
  collar.rotation.x = Math.PI / 2;

  const crownBase = cylinder(0.42, 0.36, 0.16, mat);
  crownBase.position.y = 1.13;

  addAll(group, [body, collar, crownBase]);

  const turretCount = 8;
  for (let i = 0; i < turretCount; i += 1) {
    if (i % 2 === 0) continue;
    const angle = (i / turretCount) * Math.PI * 2;
    const turret = box(0.13, 0.16, 0.13, mat);
    turret.position.set(Math.cos(angle) * 0.32, 1.29, Math.sin(angle) * 0.32);
    addAll(group, [turret]);
  }

  const topRing = cylinder(0.38, 0.42, 0.06, mat);
  topRing.position.y = 1.18;
  addAll(group, [topRing]);

  return group;
}

function makeBishop(mat) {
  const group = new THREE.Group();
  addAll(group, makeBase(mat).children.map((c) => c.clone()));

  const lowerBody = cylinder(0.22, 0.35, 0.45, mat);
  lowerBody.position.y = 0.42;

  const collar = torus(0.26, 0.03, mat);
  collar.position.y = 0.66;
  collar.rotation.x = Math.PI / 2;

  const upperBody = cylinder(0.13, 0.24, 0.5, mat);
  upperBody.position.y = 0.95;

  const head = sphere(0.18, mat);
  head.position.y = 1.28;

  const slit = box(0.045, 0.22, 0.32, mat);
  slit.position.y = 1.32;
  slit.rotation.z = Math.PI / 5;

  const finial = sphere(0.06, mat);
  finial.position.y = 1.45;

  addAll(group, [lowerBody, collar, upperBody, head, slit, finial]);
  return group;
}

// --- Rebuilt knight: a recognizable lathed body + sculpted horse head ---
// Previous version used disjointed boxes with arbitrary rotations that
// didn't read as a horse. This version builds the head from a tapered
// muzzle (cone), a rounded skull (sphere, scaled), a mane ridge (half
// cylinder along the back of the neck), and two small ear cones, all
// aligned along a single forward-leaning neck axis so it reads as a
// continuous horse profile instead of floating boxes.
function makeKnight(mat) {
  const group = new THREE.Group();
  addAll(group, makeBase(mat).children.map((c) => c.clone()));

  const body = cylinder(0.24, 0.38, 0.5, mat);
  body.position.y = 0.45;

  const collar = torus(0.27, 0.03, mat);
  collar.position.y = 0.7;
  collar.rotation.x = Math.PI / 2;

  // Neck: a tapered cylinder leaning back-to-front, forming the main
  // sweeping curve of the horse's neck.
  const neck = cylinder(0.13, 0.24, 0.7, mat, 32);
  neck.position.set(-0.02, 1.05, 0);
  neck.rotation.z = -0.32;

  // Skull: a sphere scaled into an elongated egg shape, oriented along
  // the neck's lean so it sits naturally at the top of the neck.
  const skull = sphere(0.18, mat);
  skull.scale.set(1.1, 0.85, 0.9);
  skull.position.set(0.27, 1.42, 0);
  skull.rotation.z = -0.32;

  // Muzzle: a cone tapering forward from the skull, giving the
  // characteristic horse snout silhouette.
  const muzzle = cylinder(0.05, 0.13, 0.42, mat, 24);
  muzzle.position.set(0.52, 1.34, 0);
  muzzle.rotation.z = Math.PI / 2 - 0.55;

  // Mane: a half-cylinder running along the back edge of the neck.
  const mane = cylinder(0.07, 0.07, 0.65, mat, 16, true);
  mane.position.set(-0.2, 1.08, 0);
  mane.rotation.z = -0.32;
  mane.rotation.x = Math.PI / 2;

  // Ears: two small cones angled forward at the top of the skull.
  const ear1 = cylinder(0.0, 0.05, 0.18, mat, 12);
  ear1.position.set(0.18, 1.68, 0.07);
  ear1.rotation.z = -0.5;
  ear1.rotation.x = -0.3;

  const ear2 = cylinder(0.0, 0.05, 0.18, mat, 12);
  ear2.position.set(0.18, 1.68, -0.07);
  ear2.rotation.z = -0.5;
  ear2.rotation.x = 0.3;

  addAll(group, [body, collar, neck, skull, muzzle, mane, ear1, ear2]);
  return group;
}

function makeQueen(mat) {
  const group = new THREE.Group();
  addAll(group, makeBase(mat).children.map((c) => c.clone()));

  const lowerBody = cylinder(0.2, 0.4, 0.65, mat);
  lowerBody.position.y = 0.5;

  const collar = torus(0.3, 0.035, mat);
  collar.position.y = 0.85;
  collar.rotation.x = Math.PI / 2;

  const upperBody = cylinder(0.16, 0.27, 0.45, mat);
  upperBody.position.y = 1.12;

  const crownBase = cylinder(0.38, 0.3, 0.14, mat);
  crownBase.position.y = 1.42;

  addAll(group, [lowerBody, collar, upperBody, crownBase]);

  const spikeCount = 8;
  for (let i = 0; i < spikeCount; i += 1) {
    const angle = (i / spikeCount) * Math.PI * 2;
    const spike = sphere(0.075, mat);
    spike.position.set(Math.cos(angle) * 0.32, 1.56, Math.sin(angle) * 0.32);
    addAll(group, [spike]);
  }

  const orb = sphere(0.13, mat);
  orb.position.y = 1.62;
  addAll(group, [orb]);

  return group;
}

function makeKing(mat) {
  const group = new THREE.Group();
  addAll(group, makeBase(mat).children.map((c) => c.clone()));

  const lowerBody = cylinder(0.22, 0.42, 0.7, mat);
  lowerBody.position.y = 0.53;

  const collar = torus(0.32, 0.035, mat);
  collar.position.y = 0.9;
  collar.rotation.x = Math.PI / 2;

  const upperBody = cylinder(0.18, 0.29, 0.5, mat);
  upperBody.position.y = 1.2;

  const crownBase = cylinder(0.4, 0.32, 0.15, mat);
  crownBase.position.y = 1.52;

  addAll(group, [lowerBody, collar, upperBody, crownBase]);

  const crossV = box(0.1, 0.42, 0.1, mat);
  crossV.position.y = 1.82;

  const crossH = box(0.34, 0.1, 0.1, mat);
  crossH.position.y = 1.84;

  addAll(group, [crossV, crossH]);

  return group;
}

function placePiece(piece, x, z, scale = 1) {
  piece.position.set(x, 0, z);
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
    scene.fog = new THREE.FogExp2(0x0a0e16, 0.045);

    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(6, 5.5, 9);
    camera.lookAt(1.5, 0.5, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    mount.appendChild(renderer.domElement);

    const ambient = new THREE.HemisphereLight(0x3a4a6a, 0x0a0e16, 0.6);

    const keyLight = new THREE.DirectionalLight(0xfff0d8, 3.2);
    keyLight.position.set(6, 9, 5);
    keyLight.target.position.set(1.5, 0, 0);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(2048, 2048);
    keyLight.shadow.bias = -0.00015;
    keyLight.shadow.normalBias = 0.045;
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 25;
    keyLight.shadow.camera.left = -6;
    keyLight.shadow.camera.right = 6;
    keyLight.shadow.camera.top = 6;
    keyLight.shadow.camera.bottom = -6;
    keyLight.shadow.camera.updateProjectionMatrix();

    const fillLight = new THREE.DirectionalLight(0x6f9fff, 0.9);
    fillLight.position.set(-6, 4, -4);

    const rimLight = new THREE.PointLight(0xffa552, 3.5, 18, 2);
    rimLight.position.set(-3, 3.5, -3.5);

    const accentLight = new THREE.PointLight(0x5fd6c8, 1.4, 14, 2);
    accentLight.position.set(4, 2, -4);

    scene.add(ambient, keyLight, keyLight.target, fillLight, rimLight, accentLight);

    const board = new THREE.Group();
    board.position.set(1.5, -0.2, 0);
    scene.add(board);

    const squareGeometry = new THREE.BoxGeometry(0.95, 0.15, 0.95);
    const lightMaterial = premiumMaterial(lightSquare, false);
    const darkMaterial = premiumMaterial(darkSquare, false);

    for (let row = 0; row < 8; row += 1) {
      for (let col = 0; col < 8; col += 1) {
        const square = new THREE.Mesh(
          squareGeometry,
          (row + col) % 2 === 0 ? lightMaterial : darkMaterial,
        );
        square.position.set((col - 3.5) * 0.95, 0, (row - 3.5) * 0.95);
        square.receiveShadow = true;
        square.castShadow = true;
        board.add(square);
      }
    }

    const edge = new THREE.Mesh(
      new THREE.BoxGeometry(8.2, 0.3, 8.2),
      premiumMaterial(goldTheme, true)
    );
    edge.position.y = -0.08;
    edge.receiveShadow = true;
    edge.castShadow = true;
    board.add(edge);

    const goldMat = premiumMaterial(goldTheme, true);
    const ivoryMat = premiumMaterial(ivoryTheme, false);
    const obsidianMat = premiumMaterial(obsidianTheme, true);

    // --- Chess-grid mapping for "real" gameplay-like movement ---
    // The board is 8x8 squares of size 0.95, centered on board's local
    // origin. Square (col,row) -> local (x,z) = ((col-3.5)*0.95, (row-3.5)*0.95).
    // We give each piece a starting square and a small set of legal-ish
    // target squares it can glide between, similar to how a piece would
    // move on a real board (files/ranks), rather than free-floating drift.
    const SQUARE = 0.95;
    const squareToLocal = (col, row) => ({
      x: (col - 3.5) * SQUARE,
      z: (row - 3.5) * SQUARE,
    });

    const king = placePiece(makeKing(goldMat), 0, 0, 0.85);
    const queen = placePiece(makeQueen(ivoryMat), 0, 0, 0.8);
    const knight = placePiece(makeKnight(obsidianMat), 0, 0, 0.78);
    const bishop = placePiece(makeBishop(goldMat), 0, 0, 0.75);
    const rook = placePiece(makeRook(obsidianMat), 0, 0, 0.75);
    const pawnA = placePiece(makePawn(ivoryMat), 0, 0, 0.7);
    const pawnB = placePiece(makePawn(goldMat), 0, 0, 0.7);

    const pieces = [king, queen, knight, bishop, rook, pawnA, pawnB];
    pieces.forEach((piece) => board.add(piece));

    // Each entry: piece, its home square, and a list of "move-to" squares
    // it slides between (column,row indices 0-7), mimicking realistic
    // chess movement patterns (rook moves along a rank/file, bishop along
    // a diagonal, knight in an L, king/queen short steps).
    const pieceMotion = [
      { piece: king, squares: [[5, 1], [5, 0], [6, 0], [6, 1]] }, // king short shuffles
      { piece: queen, squares: [[4, 1], [4, 4], [1, 1], [4, 1]] }, // queen long diagonal/file moves
      { piece: knight, squares: [[2, 4], [3, 6], [1, 5], [2, 4]] }, // knight L-shaped hops
      { piece: bishop, squares: [[6, 6], [3, 3], [1, 1], [3, 3]] }, // bishop diagonal slides
      { piece: rook, squares: [[1, 6], [6, 6], [6, 1], [1, 6]] }, // rook rank/file slides
      { piece: pawnA, squares: [[0, 2], [0, 4], [0, 6]] }, // pawn forward pushes
      { piece: pawnB, squares: [[5, 4], [5, 5], [4, 5], [5, 4]] }, // pawn small advances
    ].map(({ piece, squares }) => {
      const waypoints = squares.map(([c, r]) => squareToLocal(c, r));
      // Stagger each piece's "turn" timing and per-move duration so they
      // don't all move in lockstep, like an actual game with alternating
      // turns and pauses for thinking.
      return {
        piece,
        waypoints,
        index: 0,
        moveDuration: 1.6 + Math.random() * 1.0, // time for one glide
        pauseDuration: 1.5 + Math.random() * 2.5, // "thinking" pause between moves
        elapsed: Math.random() * -3, // random negative offset staggers start
        phase: 'pause', // 'pause' | 'moving'
        bobPhase: Math.random() * Math.PI * 2,
        bobSpeed: 1.0 + Math.random() * 0.6,
      };
    });

    // Place pieces at their first waypoint immediately so there's no
    // jump-to-origin frame on mount.
    pieceMotion.forEach(({ piece, waypoints }) => {
      piece.position.x = waypoints[0].x;
      piece.position.z = waypoints[0].z;
    });

    // floor: pulled further down and given a larger gap from the board's
    // underside (board.position.y = -0.2, edge bottom ~ -0.225) to remove
    // the z-fighting that produced the brown flicker, and made fully
    // opaque non-reflective so it can't pick up depth-buffer noise.
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(60, 60),
      new THREE.MeshStandardMaterial({
        color: 0x05080c,
        roughness: 0.6,
        metalness: 0.0,
      })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.6;
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
    let lastTime = 0;
    const animate = () => {
      const time = clock.getElapsedTime();
      const dt = Math.min(time - lastTime, 0.05);
      lastTime = time;

      const isMobile = mount.clientWidth < 720;
      const baseRadiusX = isMobile ? 5.0 : 6.4;
      const baseRadiusZ = isMobile ? 8.0 : 9.2;

      const pushCycle = (Math.sin(time * 0.07) + 1) / 2;
      const pushEase = pushCycle * pushCycle * (3 - 2 * pushCycle);
      const radiusScale = 1 - pushEase * 0.35;

      const orbitAngle = time * 0.085;
      camera.position.x = 1.5 + Math.sin(orbitAngle) * baseRadiusX * radiusScale;
      camera.position.z = Math.cos(orbitAngle) * baseRadiusZ * radiusScale;
      camera.position.y = 4.0 + Math.sin(time * 0.11) * 0.7 + pushEase * -1.2;

      const lookX = 1.5 + Math.sin(time * 0.04) * 0.6;
      const lookZ = Math.cos(time * 0.05) * 0.5;
      camera.lookAt(lookX, 0.55 + pushEase * 0.3, lookZ);

      board.rotation.y = -0.18 + Math.sin(time * 0.09) * 0.06;
      board.rotation.z = Math.sin(time * 0.12) * 0.012;

      // --- Turn-based gliding movement, like a real game in progress ---
      pieceMotion.forEach((motion) => {
        const { piece, waypoints, bobPhase, bobSpeed } = motion;
        motion.elapsed += dt;

        if (motion.phase === 'pause') {
          if (motion.elapsed >= motion.pauseDuration) {
            motion.elapsed = 0;
            motion.phase = 'moving';
            motion.fromIndex = motion.index;
            motion.toIndex = (motion.index + 1) % waypoints.length;
          }
        } else {
          const t = Math.min(motion.elapsed / motion.moveDuration, 1);
          // Smoothstep ease for a natural glide rather than linear travel.
          const eased = t * t * (3 - 2 * t);
          const from = waypoints[motion.fromIndex];
          const to = waypoints[motion.toIndex];
          piece.position.x = from.x + (to.x - from.x) * eased;
          piece.position.z = from.z + (to.z - from.z) * eased;

          // Slight "lift" mid-move, like a hand picking the piece up and
          // setting it back down — arcs up then down across the move.
          const lift = Math.sin(t * Math.PI) * 0.18;
          piece.position.y = 0.05 + lift;

          if (t >= 1) {
            motion.elapsed = 0;
            motion.phase = 'pause';
            motion.index = motion.toIndex;
            motion.pauseDuration = 1.5 + Math.random() * 2.5;
          }
        }

        // When paused (sitting on a square), use a small idle bob instead
        // of the move-arc, plus slow rotation for visual interest.
        if (motion.phase === 'pause') {
          piece.position.y = 0.05 + Math.sin(time * bobSpeed + bobPhase) * 0.04;
        }
        piece.rotation.y += dt * 0.15;
      });

      rimLight.intensity = 2.5 + Math.sin(time * 0.9) * 1.0;
      accentLight.intensity = 1.0 + Math.cos(time * 0.7 + 1.0) * 0.5;
      rimLight.position.x = -3 + Math.sin(time * 0.3) * 1.0;
      accentLight.position.z = -4 + Math.cos(time * 0.25) * 1.0;

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