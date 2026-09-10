import { Suspense, useLayoutEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import avatarAsset from "@/assets/avatar.glb.asset.json";

function AvatarModel() {
  const { scene } = useGLTF(avatarAsset.url);
  const group = useRef<THREE.Group>(null);

  useLayoutEffect(() => {
    if (!group.current) return;
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 3.9 / maxDim;
    scene.scale.setScalar(scale);
    scene.position.set(
      -center.x * scale,
      -box.min.y * scale - 1.95,
      -center.z * scale,
    );
    scene.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [scene]);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += Math.min(delta, 0.05) * 0.6;
  });

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload(avatarAsset.url);

export default function AvatarViewer() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0.15, 4.6], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 6, 4]} intensity={1.6} />
      <directionalLight position={[-4, 2, -3]} intensity={0.5} />
      <Suspense fallback={null}>
        <AvatarModel />
        <Environment>
          <Lightformer intensity={2} position={[0, 4, 2]} scale={[8, 8, 1]} />
          <Lightformer
            intensity={1}
            color="#c9d6e8"
            position={[-5, 1, -1]}
            rotation-y={Math.PI / 2}
            scale={[16, 2, 1]}
          />
        </Environment>
      </Suspense>
    </Canvas>
  );
}
