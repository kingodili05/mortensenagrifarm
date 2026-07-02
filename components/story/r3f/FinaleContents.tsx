"use client";

import { Suspense, useMemo, useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Environment, Stars, useTexture } from "@react-three/drei";
import * as THREE from "three";

type ProgressRef = MutableRefObject<number>;
const GREEN = new THREE.Color("#34d27d");
const RADIUS = 2;

const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);

// The hopeful payoff: a living, green-lit Earth. Real albedo/normal so it reads
// as Earth, but wrapped in an additive green atmosphere + city-light glow that
// fakes the bloom we can't run as post-FX on the shared <View> canvas.
function Earth({ progress }: { progress: ProgressRef }) {
  const group = useRef<THREE.Group>(null);
  const haloA = useRef<THREE.Mesh>(null);
  const haloB = useRef<THREE.Mesh>(null);

  const [albedo, normal, lights] = useTexture([
    "/textures/earth/albedo.jpg",
    "/textures/earth/normal.jpg",
    "/textures/earth/lights.png",
  ]);

  const surfaceMat = useMemo(() => {
    albedo.colorSpace = THREE.SRGBColorSpace;
    lights.colorSpace = THREE.SRGBColorSpace;
    [albedo, normal, lights].forEach((t) => (t.anisotropy = 8));
    return new THREE.MeshStandardMaterial({
      map: albedo,
      normalMap: normal,
      normalScale: new THREE.Vector2(0.7, 0.7),
      emissiveMap: lights,
      emissive: GREEN,
      emissiveIntensity: 2.4, // green city-lights glow (bloom-fake, all sides)
      roughness: 0.85,
      metalness: 0.1,
    });
  }, [albedo, normal, lights]);

  useFrame(({ clock }) => {
    const reveal = easeOutCubic(THREE.MathUtils.clamp((progress.current - 0.3) / 0.7, 0, 1));
    if (group.current) {
      group.current.rotation.y = clock.elapsedTime * 0.1;
      group.current.scale.setScalar(0.18 + reveal * 0.82);
    }
    const pulse = 0.85 + Math.sin(clock.elapsedTime * 1.4) * 0.15;
    const a = haloA.current?.material as THREE.Material & { opacity: number };
    const b = haloB.current?.material as THREE.Material & { opacity: number };
    if (a) a.opacity = reveal * 0.5 * pulse;
    if (b) b.opacity = reveal * 0.28 * pulse;
  });

  return (
    <group ref={group}>
      <mesh material={surfaceMat}>
        <sphereGeometry args={[RADIUS, 96, 96]} />
      </mesh>
      {/* Two additive backside fresnel shells = soft blooming halo. */}
      <mesh ref={haloA} material={fresnelMat} scale={1.16}>
        <sphereGeometry args={[RADIUS, 48, 48]} />
      </mesh>
      <mesh ref={haloB} material={fresnelMatWide} scale={1.4}>
        <sphereGeometry args={[RADIUS, 48, 48]} />
      </mesh>
    </group>
  );
}

function makeFresnel(power: number) {
  return new THREE.ShaderMaterial({
    transparent: true,
    side: THREE.BackSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: { uColor: { value: GREEN }, uPower: { value: power } },
    vertexShader: `
      varying vec3 vN;
      void main(){ vN = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `
      varying vec3 vN; uniform vec3 uColor; uniform float uPower;
      void main(){ float rim = pow(1.0 - abs(vN.z), uPower);
        gl_FragColor = vec4(uColor, rim); }`,
  });
}
const fresnelMat = makeFresnel(3.0);
const fresnelMatWide = makeFresnel(1.8);

// Drifting additive specks for atmosphere/depth around the planet.
function GlowDust() {
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const n = 320;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const r = 4 + Math.random() * 7;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(p) * Math.cos(t);
      arr[i * 3 + 1] = r * Math.cos(p);
      arr[i * 3 + 2] = r * Math.sin(p) * Math.sin(t);
    }
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, []);
  const ref = useRef<THREE.Points>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.03;
  });
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color={GREEN} size={0.05} transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
    </points>
  );
}

// Sprout that opens the shot, fading as we pull back to the planet.
function Sprout({ progress }: { progress: ProgressRef }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const fade = 1 - THREE.MathUtils.clamp(progress.current / 0.4, 0, 1);
    ref.current.visible = fade > 0.02;
    ref.current.scale.setScalar(fade * 1.2);
    ref.current.rotation.y = clock.elapsedTime * 0.4;
  });
  return (
    <group ref={ref} position={[0, -0.3, 4.2]}>
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.03, 0.05, 1.2, 6]} />
        <meshStandardMaterial color="#3f7d3a" />
      </mesh>
      <mesh position={[0.18, 0.8, 0]} rotation={[0, 0, -0.6]}>
        <sphereGeometry args={[0.18, 16, 12]} />
        <meshStandardMaterial color="#34d27d" emissive="#34d27d" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[-0.18, 0.65, 0]} rotation={[0, 0, 0.6]}>
        <sphereGeometry args={[0.16, 16, 12]} />
        <meshStandardMaterial color="#34d27d" emissive="#34d27d" emissiveIntensity={0.4} />
      </mesh>
    </group>
  );
}

function Rig({ progress }: { progress: ProgressRef }) {
  useFrame(({ camera }) => {
    const e = easeOutCubic(progress.current);
    const targetZ = THREE.MathUtils.lerp(2.4, 11, e);
    const targetY = THREE.MathUtils.lerp(0.15, 0.55, e);
    camera.position.z += (targetZ - camera.position.z) * 0.07;
    camera.position.y += (targetY - camera.position.y) * 0.07;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// Seed → glowing Earth pull-back — contents for a drei <View>.
export default function FinaleContents({ progress }: { progress: ProgressRef }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.15, 2.4]} fov={50} />
      <fog attach="fog" args={["#02110a", 8, 26]} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 3, 6]} intensity={1.6} />
      <pointLight color={"#34d27d"} position={[0, 0, 4]} intensity={1.4} distance={14} />
      <Suspense fallback={null}>
        <Environment files="/hdri/env.hdr" environmentIntensity={0.4} />
        <Earth progress={progress} />
        <GlowDust />
        <Stars radius={70} depth={50} count={1500} factor={3.5} saturation={0} fade speed={0.3} />
      </Suspense>
      <Sprout progress={progress} />
      <Rig progress={progress} />
    </>
  );
}
