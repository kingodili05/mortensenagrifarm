"use client";

import { Suspense, useMemo, useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Line,
  PerspectiveCamera,
  Stars,
  Environment,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";

const HARVEST = "#facc15";
const STEEL = "#9fb4c7";
const RADIUS = 2;

// Fixed sun direction in WORLD space; the night-lights shader needs it in VIEW
// space (recomputed each frame from the camera) because geometryNormal in the
// fragment shader is view-space.
const SUN_WORLD = new THREE.Vector3(5, 2.5, 4).normalize();

export type SpinRef = MutableRefObject<{ vel: number; angle: number }>;

function latLngToVec3(lat: number, lng: number, r: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

const HUB = { lat: 41.6, lng: -93.6 };
const DESTS = [
  { lat: 9.1, lng: 8.7 }, { lat: -1.3, lng: 36.8 }, { lat: -30, lng: 25 },
  { lat: 51, lng: 10 }, { lat: 20.6, lng: 78.9 }, { lat: -14, lng: -51 },
  { lat: -25, lng: 133 }, { lat: 56, lng: -106 },
];

// Photoreal Earth: PBR day surface, ocean HDRI/sun glints (specular as a
// metalness mask), city night-lights that only glow on the dark hemisphere
// (shader patch), drifting clouds, and a fresnel atmosphere rim.
function Earth({ spin }: { spin?: SpinRef }) {
  const group = useRef<THREE.Group>(null);
  const clouds = useRef<THREE.Mesh>(null);

  const [albedo, normal, specular, cloudsTex, lights] = useTexture([
    "/textures/earth/albedo.jpg",
    "/textures/earth/normal.jpg",
    "/textures/earth/specular.jpg",
    "/textures/earth/clouds.png",
    "/textures/earth/lights.png",
  ]);

  // Shared uniform — written by useFrame, read by the patched shader.
  const sunView = useMemo(() => ({ value: new THREE.Vector3() }), []);

  const surfaceMat = useMemo(() => {
    albedo.colorSpace = THREE.SRGBColorSpace;
    lights.colorSpace = THREE.SRGBColorSpace;
    [albedo, normal, specular, lights].forEach((t) => (t.anisotropy = 8));

    const mat = new THREE.MeshStandardMaterial({
      map: albedo,
      normalMap: normal,
      normalScale: new THREE.Vector2(0.8, 0.8),
      // Specular map drives ocean reflectivity: bright seas read metallic and
      // catch the HDRI + sun; matte land stays diffuse.
      metalnessMap: specular,
      metalness: 0.7,
      roughness: 0.62,
      emissiveMap: lights,
      emissive: new THREE.Color(0xffe9b0),
      emissiveIntensity: 2.2,
    });

    // Mask night-lights to the dark hemisphere only.
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uSunDirection = sunView;
      shader.fragmentShader = shader.fragmentShader
        .replace(
          "void main() {",
          "uniform vec3 uSunDirection;\nvoid main() {"
        )
        .replace(
          "#include <emissivemap_fragment>",
          // 'normal' (perturbed, view-space) is defined by normal_fragment_begin
          // which runs before this chunk; 'geometryNormal' is not yet in scope.
          `#include <emissivemap_fragment>
           float dayDot = dot( normal, uSunDirection );
           float nightMask = smoothstep( 0.08, -0.30, dayDot );
           totalEmissiveRadiance *= nightMask;`
        );
    };
    mat.customProgramCacheKey = () => "earth-night-lights";
    return mat;
  }, [albedo, normal, specular, lights, sunView]);

  const cloudMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: cloudsTex,
      alphaMap: cloudsTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.85,
      roughness: 1,
      metalness: 0,
    });
  }, [cloudsTex]);

  useFrame(({ camera }, delta) => {
    // Sun direction into view space (geometryNormal is view-space).
    sunView.value.copy(SUN_WORLD).transformDirection(camera.matrixWorldInverse);

    if (spin) {
      spin.current.angle += spin.current.vel + delta * 0.08; // drag + idle spin
      spin.current.vel *= 0.94; // inertia damping
      if (group.current) group.current.rotation.y = spin.current.angle;
    } else if (group.current) {
      group.current.rotation.y += delta * 0.08;
    }
    if (clouds.current) clouds.current.rotation.y += delta * 0.012;
  });

  return (
    <group rotation={[0.35, 0, 0]}>
      <group ref={group}>
        <mesh material={surfaceMat}>
          <sphereGeometry args={[RADIUS, 96, 96]} />
        </mesh>
        <mesh ref={clouds} material={cloudMat}>
          <sphereGeometry args={[RADIUS * 1.012, 64, 64]} />
        </mesh>
      </group>
      <Atmosphere />
    </group>
  );
}

// Backside fresnel shell — soft blue rim that reads as atmospheric scattering.
function Atmosphere() {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.BackSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uColor: { value: new THREE.Color(0x4ea8ff) } },
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize( normalMatrix * normal );
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
          }`,
        fragmentShader: `
          varying vec3 vNormal;
          uniform vec3 uColor;
          void main() {
            float rim = pow( 1.0 - abs( vNormal.z ), 3.0 );
            gl_FragColor = vec4( uColor, rim * 0.9 );
          }`,
      }),
    []
  );
  return (
    <mesh material={mat} scale={1.16}>
      <sphereGeometry args={[RADIUS, 48, 48]} />
    </mesh>
  );
}

// Emissive additive shipping arcs + travelling pulses (bloom-ready).
function Arcs() {
  const pulses = useRef<(THREE.Mesh | null)[]>([]);
  const hubVec = useMemo(() => latLngToVec3(HUB.lat, HUB.lng, RADIUS * 1.02), []);
  const arcs = useMemo(
    () =>
      DESTS.map((d, i) => {
        const start = hubVec.clone();
        const end = latLngToVec3(d.lat, d.lng, RADIUS * 1.02);
        const mid = start.clone().add(end).multiplyScalar(0.5);
        const dist = start.distanceTo(end);
        mid.normalize().multiplyScalar(RADIUS + dist * 0.45);
        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        return {
          points: curve.getPoints(60),
          curve,
          end,
          speed: 0.18 + (i % 5) * 0.03,
          offset: i / DESTS.length,
        };
      }),
    [hubVec]
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    arcs.forEach((a, i) => {
      const pulse = pulses.current[i];
      if (!pulse) return;
      const tt = (t * a.speed + a.offset) % 1;
      pulse.position.copy(a.curve.getPoint(tt));
      const s = 0.7 + Math.sin(tt * Math.PI) * 0.9;
      pulse.scale.setScalar(s);
      (pulse.material as THREE.MeshBasicMaterial).opacity = Math.sin(tt * Math.PI);
    });
  });

  return (
    <group rotation={[0.35, 0, 0]}>
      <mesh position={hubVec}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color={HARVEST} toneMapped={false} />
      </mesh>
      {arcs.map((a, i) => (
        <group key={i}>
          <Line points={a.points} color={HARVEST} transparent opacity={0.55} lineWidth={1.4} toneMapped={false} />
          <mesh position={a.end}>
            <sphereGeometry args={[0.035, 12, 12]} />
            <meshBasicMaterial color={STEEL} toneMapped={false} />
          </mesh>
          <mesh ref={(el) => { pulses.current[i] = el; }}>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshBasicMaterial color={HARVEST} transparent blending={THREE.AdditiveBlending} toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function GlobeContents({ spin }: { spin?: SpinRef }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 6.2]} fov={45} />
      <ambientLight intensity={0.08} />
      <directionalLight position={SUN_WORLD.clone().multiplyScalar(10).toArray()} intensity={2.6} />
      <Suspense fallback={null}>
        <Environment files="/hdri/env.hdr" environmentIntensity={0.35} />
        <Earth spin={spin} />
        <Arcs />
        <Stars radius={60} depth={40} count={1800} factor={3} saturation={0} fade speed={0.4} />
      </Suspense>
    </>
  );
}
