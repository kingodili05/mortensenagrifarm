"use client";

import { Suspense, useMemo, useRef, type MutableRefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  useGLTF,
  Center,
  ContactShadows,
  PerspectiveCamera,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";

type ProgressRef = MutableRefObject<number>;

// Per-model material tuning. These .glb files ship a single baked-albedo
// texture with metalness=0 (no normal/MR/AO maps, no Draco/KTX2/Meshopt), so
// they decode fine but read flat. We re-light them: high-anisotropy SRGB
// albedo, an HDRI env reflection (envMapIntensity), correct vertex normals
// (combine.glb ships none), and a touch of specular so painted metal catches
// the sky.
type Tuning = { metalness: number; roughness: number; envMapIntensity: number };

const DEFAULT_TUNING: Tuning = { metalness: 0.15, roughness: 0.7, envMapIntensity: 1.1 };

const TUNING: Record<string, Tuning> = {
  "tractor.glb": { metalness: 0.2, roughness: 0.55, envMapIntensity: 1.25 },
  "combine.glb": { metalness: 0.2, roughness: 0.6, envMapIntensity: 1.2 },
  // Drone is a 128px palette model — keep it matte/stylized, don't fake metal.
  "drone.glb": { metalness: 0.05, roughness: 0.85, envMapIntensity: 0.9 },
};

// Driving choreography per model. `face` orients the model in profile so its
// front points along the travel direction (+X, screen-right). Tune per model
// if a vehicle drives backwards — flip by Math.PI.
type Drive = { face: number; y: number; bank: number };
const DRIVE: Record<string, Drive> = {
  "tractor.glb": { face: -Math.PI / 2, y: 0, bank: 0 },
  // iedalton combine fleet (3 in a row). Verified live: Math.PI faces the
  // camera (crab-drive), -PI/2 drives header-backwards — +PI/2 puts the
  // cutting headers in front along the travel direction.
  "combine.glb": { face: Math.PI / 2, y: 0, bank: 0 },
  // Little Drone's length runs along X already — no 90° turn; it flies higher.
  "drone.glb": { face: 0, y: 0.8, bank: 0.12 },
};

// Drive span. Camera shows roughly ±4.2 of horizontal world space, and a
// normalised model is ~1.8 half-length, so a range of ±3.4 keeps the vehicle
// at least partly on-screen across the WHOLE scroll (fully centred mid-drive),
// instead of vanishing off-stage for most of it.
const X_RANGE = 3.4;
const DEFAULT_SIZE = 3.7; // normalise most models to this max dimension
// Per-model size override. The combine asset is a 3-wide fleet, so it needs a
// bigger budget to read at the same per-vehicle size as the single tractor.
const SIZE: Record<string, number> = {
  "combine.glb": 7.0,
  "drone.glb": 4.2,
};

function keyOf(src: string) {
  return src.split("/").pop() ?? "";
}

function sizeFor(src: string) {
  return SIZE[keyOf(src)] ?? DEFAULT_SIZE;
}

function Model({ src, progress }: { src: string; progress?: ProgressRef }) {
  const { scene } = useGLTF(src);
  const ref = useRef<THREE.Group>(null);

  // One-time conditioning: material re-light, missing normals, and a uniform
  // scale so tractor/combine/drone share one on-screen size.
  const prepared = useMemo(() => {
    const key = keyOf(src);
    const t = TUNING[key] ?? DEFAULT_TUNING;
    scene.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return;
      obj.castShadow = true;
      obj.receiveShadow = true;
      const geo = obj.geometry as THREE.BufferGeometry;
      if (!geo.attributes.normal) geo.computeVertexNormals();
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
      mats.forEach((m) => {
        const mat = m as THREE.MeshStandardMaterial;
        if (mat.map) {
          mat.map.colorSpace = THREE.SRGBColorSpace;
          mat.map.anisotropy = 8;
          mat.map.needsUpdate = true;
        }
        if ("metalness" in mat) mat.metalness = t.metalness;
        if ("roughness" in mat) mat.roughness = t.roughness;
        if ("envMapIntensity" in mat) mat.envMapIntensity = t.envMapIntensity;
        mat.needsUpdate = true;
      });
    });
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    return { scene, scale: sizeFor(src) / maxDim };
  }, [scene, src]);

  const drive = DRIVE[keyOf(src)] ?? DRIVE["tractor.glb"];

  useFrame((state, delta) => {
    const g = ref.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    if (progress) {
      // Drive across the stage with scroll: left → right, profile to camera.
      g.position.x = THREE.MathUtils.lerp(-X_RANGE, X_RANGE, progress.current);
      g.position.y = drive.y + Math.sin(t * 1.4) * 0.05;
      g.rotation.y = drive.face;
      // Subtle terrain jostle / banking so it feels alive, not on rails.
      g.rotation.z = Math.sin(t * 2.1) * 0.012 + drive.bank * Math.sin(t * 1.1);
    } else {
      // Catalog/turntable fallback (no scroll): centred slow spin.
      g.position.set(0, drive.y + Math.sin(t * 0.8) * 0.06, 0);
      g.rotation.set(0, g.rotation.y + delta * 0.35, 0);
    }
  });

  return (
    <group ref={ref}>
      <group scale={prepared.scale}>
        <Center>
          <primitive object={prepared.scene} />
        </Center>
      </group>
    </group>
  );
}

// A single glTF model — contents for a drei <View> (no <Canvas>). With a
// `progress` ref the model drives across the stage as the section scrolls;
// without one it turntables (for future catalog cards).
export default function ModelContents({
  src,
  progress,
}: {
  src: string;
  progress?: ProgressRef;
}) {
  // Portrait phones have a much narrower horizontal FOV at the same camera
  // distance, so desktop framing turns the vehicles into cropped close-ups.
  // Pull the camera back and shrink the model slightly on narrow viewports.
  const isNarrow = useThree((s) => s.size.width / s.size.height < 0.9);

  return (
    <>
      {/* Side-on, slightly above — frames the full drive path. */}
      <PerspectiveCamera makeDefault position={[0, 1.3, isNarrow ? 12.5 : 8]} fov={36} />
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[5, 9, 6]}
        intensity={2.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0002}
      />
      <directionalLight position={[-6, 3, -4]} intensity={0.6} color="#facc15" />
      <Suspense fallback={null}>
        <Environment files="/hdri/env.hdr" environmentIntensity={0.85} />
        <group scale={isNarrow ? 0.8 : 1}>
          <Model src={src} progress={progress} />
        </group>
        {/* Wide grounded shadow — follows the model because ContactShadows
            renders the live scene depth each frame. */}
        <ContactShadows
          position={[0, -1.65, 0]}
          opacity={0.5}
          scale={20}
          blur={2.8}
          far={5}
          resolution={512}
        />
      </Suspense>
    </>
  );
}
