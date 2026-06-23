import { IonPage } from "@ionic/react";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";

const ARView: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    let mindarThree: InstanceType<typeof MindARThree> | null = null;
    let started = false;

    const start = async () => {
      mindarThree = new MindARThree({
        container: containerRef.current!,
        imageTargetSrc: "/targets/card.mind",
      });

      const { renderer, scene, camera } = mindarThree;

      // Lighting fixes
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
      directionalLight.position.set(0, 1, 1);
      scene.add(directionalLight);

      // Color space fix
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      const anchor = mindarThree.addAnchor(0);

      // Load GLB model
      const loader = new GLTFLoader();
      loader.load("/models/flowy.glb", (gltf) => {
        const model = gltf.scene;
        model.scale.set(2, 2, 2);
        model.rotation.y = THREE.MathUtils.degToRad(-90);
        anchor.group.add(model);
      });

      await mindarThree.start();
      started = true;

      renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
      });
    };

    start();

    return () => {
      if (mindarThree && started) {
        mindarThree.renderer.setAnimationLoop(null);
        mindarThree.stop();
      }
    };
  }, []);

  return (
    <IonPage>
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 9999,
        }}
      />
    </IonPage>
  );
};

export default ARView;