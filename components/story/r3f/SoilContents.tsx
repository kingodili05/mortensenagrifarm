"use client";

import { Suspense, useMemo, useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Environment,
  ContactShadows,
  PerspectiveCamera,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";

type ProgressRef = MutableRefObject<number>;

const HARVEST = "#facc15";
const ROOT_COL = "#caa873";
const GREEN = "#4c9a45";

function scatter(n: number, spread: number) {
  return Array.from({ length: n }, (_, i) => {
    const a = i * 2.399963;
    const r = Math.sqrt(i / n) * spread;
    return { x: Math.cos(a) * r, z: Math.sin(a) * r, off: (i % 13) / 13 };
  });
}

function SoilLayers() {
  const [diff, nor, rough] = useTexture([
    "/textures/soil/diff.jpg",
    "/textures/soil/nor.jpg",
    "/textures/soil/rough.jpg",
  ]);
  useMemo(() => {
    [diff, nor, rough].forEach((t) => {
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(6, 1);
      t.anisotropy = 8;
    });
    diff.colorSpace = THREE.SRGBColorSpace;
    nor.colorSpace = THREE.NoColorSpace;
    rough.colorSpace = THREE.NoColorSpace;
  }, [diff, nor, rough]);

  const layers = [
    { y: -1.2, tint: "#5a4631" },
    { y: -2.4, tint: "#4a3829" },
    { y: -3.6, tint: "#3f3023" },
    { y: -4.8, tint: "#352a1f" },
  ];
  return (
    <group>
      {layers.map((l) => (
        <mesh key={l.y} position={[0, l.y, 0]} receiveShadow castShadow>
          <boxGeometry args={[26, 1.15, 26]} />
          <meshStandardMaterial
            map={diff}
            normalMap={nor}
            roughnessMap={rough}
            color={l.tint}
            normalScale={new THREE.Vector2(1.1, 1.1)}
            roughness={1}
          />
        </mesh>
      ))}
    </group>
  );
}

function Granules({ progress }: { progress: ProgressRef }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const data = useMemo(() => scatter(80, 7), []);
  useFrame(({ clock }) => {
    const mesh = ref.current;
    if (!mesh) return;
    const t = clock.elapsedTime;
    const fall = Math.min(progress.current / 0.55, 1);
    data.forEach((d, i) => {
      const y = 2.2 - ((t * 1.4 + d.off * 6) % 6.2);
      dummy.position.set(d.x, y, d.z);
      dummy.scale.setScalar(y < -5 ? 0 : 0.06 * fall);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh
      ref={ref}
      args={[undefined, undefined, 80] as unknown as [THREE.BufferGeometry, THREE.Material, number]}
    >
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color={HARVEST} emissive={HARVEST} emissiveIntensity={2.4} toneMapped={false} roughness={0.4} />
    </instancedMesh>
  );
}

function Roots({ progress }: { progress: ProgressRef }) {
  const group = useRef<THREE.Group>(null);
  const roots = useMemo(() => scatter(10, 5), []);
  useFrame(() => {
    if (group.current) group.current.scale.y = 0.001 + Math.min(progress.current / 0.5, 1);
  });
  return (
    <group ref={group} position={[0, -0.6, 0]}>
      {roots.map((r, i) => (
        <mesh key={i} position={[r.x, -1.4, r.z]} rotation={[0, r.off * 6, (r.x % 2) * 0.2]} castShadow>
          <cylinderGeometry args={[0.02, 0.07, 2.8, 7]} />
          <meshStandardMaterial color={ROOT_COL} roughness={0.85} />
        </mesh>
      ))}
    </group>
  );
}

function Crops({ progress }: { progress: ProgressRef }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const data = useMemo(() => scatter(90, 9), []);
  useFrame(({ clock }) => {
    const mesh = ref.current;
    if (!mesh) return;
    const grow = Math.max(0, (progress.current - 0.45) / 0.55);
    const t = clock.elapsedTime;
    data.forEach((d, i) => {
      const h = 0.0001 + grow * (1 + d.off);
      const sway = Math.sin(t * 1.5 + i) * 0.04 * grow;
      dummy.position.set(d.x + sway, -0.6 + h / 2, d.z);
      dummy.scale.set(0.06, h, 0.06);
      dummy.rotation.z = sway;
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh
      ref={ref}
      args={[undefined, undefined, 90] as unknown as [THREE.BufferGeometry, THREE.Material, number]}
      castShadow
    >
      <coneGeometry args={[1, 2, 6]} />
      <meshStandardMaterial color={GREEN} roughness={0.6} />
    </instancedMesh>
  );
}

function NutrientGlow({ progress }: { progress: ProgressRef }) {
  const light = useRef<THREE.PointLight>(null);
  useFrame(({ clock }) => {
    if (light.current) {
      const pulse = 0.7 + Math.sin(clock.elapsedTime * 2) * 0.4;
      light.current.intensity = pulse * (1 - Math.abs(progress.current - 0.4) * 1.4) * 6;
    }
  });
  return <pointLight ref={light} color={HARVEST} position={[0, -3, 2]} distance={16} />;
}

function Rig({ progress }: { progress: ProgressRef }) {
  useFrame(({ camera }) => {
    const p = progress.current;
    const dive = p < 0.5 ? p / 0.5 : 1 - (p - 0.5) / 0.5;
    camera.position.y += (1.4 - dive * 5.2 - camera.position.y) * 0.1;
    camera.position.z += (7 - dive * 2.2 - camera.position.z) * 0.1;
    camera.position.x = Math.sin(p * Math.PI) * 0.6;
    camera.lookAt(0, camera.position.y - 1.2, 0);
  });
  return null;
}

// Soil dive → growth scene contents (no <Canvas>; rendered inside a drei <View>).
export default function SoilContents({ progress }: { progress: ProgressRef }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 1.4, 7]} fov={40} />
      <fog attach="fog" args={["#06160d", 7, 22]} />
      <ambientLight intensity={0.25} />
      <directionalLight
        position={[6, 9, 5]}
        intensity={2.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={30}
        shadow-camera-left={-14}
        shadow-camera-right={14}
        shadow-camera-top={14}
        shadow-camera-bottom={-14}
      />
      <NutrientGlow progress={progress} />
      <Suspense fallback={null}>
        <Environment files="/hdri/env.hdr" environmentIntensity={0.5} />
        <SoilLayers />
        <Roots progress={progress} />
        <Granules progress={progress} />
        <Crops progress={progress} />
        <ContactShadows position={[0, -0.62, 0]} opacity={0.5} scale={24} blur={2.6} far={6} />
      </Suspense>
      <Rig progress={progress} />
    </>
  );
}
