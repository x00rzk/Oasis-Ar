import { IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, useIonViewWillLeave } from "@ionic/react";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";

const ARView: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);
  const mindarThreeRef = useRef<InstanceType<typeof MindARThree> | null>(null);
  const startedRef = useRef(false);

  useIonViewWillLeave(() => {
    if (mindarThreeRef.current && startedRef.current) {
      mindarThreeRef.current.renderer.setAnimationLoop(null);
      mindarThreeRef.current.stop();
      mindarThreeRef.current = null;
      startedRef.current = false;
      hasStarted.current = false;
    }

    // Manually remove MindAR's body-level injected overlays
    document.querySelectorAll(".mindar-ui-overlay").forEach((el) => el.remove());
  });

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    const start = async () => {
      mindarThreeRef.current = new MindARThree({
        container: containerRef.current!,
        imageTargetSrc: "/targets/card.mind",
        filterMinCF: 0.0001,
        filterBeta: 0.001,
        missTolerance: 5,
        warmupTolerance: 5,
      });

      const { renderer, scene, camera } = mindarThreeRef.current;

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
      directionalLight.position.set(0, 1, 1);
      scene.add(directionalLight);

      renderer.outputColorSpace = THREE.SRGBColorSpace;

      const anchor = mindarThreeRef.current.addAnchor(0);

      const loader = new GLTFLoader();
      loader.load("/models/flowy.glb", (gltf) => {
        const model = gltf.scene;
        model.scale.set(2, 2, 2);
        model.rotation.y = THREE.MathUtils.degToRad(-90);
        anchor.group.add(model);
      });

      await mindarThreeRef.current.start();
      startedRef.current = true;

      renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
      });
    };

    start();

    return () => {
      if (mindarThreeRef.current && startedRef.current) {
        mindarThreeRef.current.renderer.setAnimationLoop(null);
        mindarThreeRef.current.stop();
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
          zIndex: 0,
        }}
      />

      <IonHeader
        style={{
          position: "relative",
          zIndex: 99999,
          pointerEvents: "all",
        }}
      >
        <IonToolbar style={{ "--background": "transparent", "--border-width": "0" }}>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/description" style={{ pointerEvents: "all" }} />
          </IonButtons>
          <IonTitle style={{ color: "white" }}>Sesión AR</IonTitle>
        </IonToolbar>
      </IonHeader>
    </IonPage>
  );
};

export default ARView;