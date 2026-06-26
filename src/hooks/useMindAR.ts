import { useEffect, useRef } from "react";
import { useIonViewWillLeave } from "@ionic/react";
import * as THREE from "three";
import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";
import { setupLights, loadModel } from "../ar/sceneSetup";
import { ANCHOR_INDEX, AR_TARGET_SRC, MINDAR_CONFIG } from "../ar/arConfig";

export const useMindAR = (containerRef: React.RefObject<HTMLDivElement | null>): void => {
  const mindarThreeRef = useRef<InstanceType<typeof MindARThree> | null>(null);
  const isRunningRef = useRef(false);

  const teardown = (): void => {
    if (!mindarThreeRef.current || !isRunningRef.current) return;

    mindarThreeRef.current.renderer.setAnimationLoop(null);
    mindarThreeRef.current.stop();
    mindarThreeRef.current = null;
    isRunningRef.current = false;

    document.querySelectorAll(".mindar-ui-overlay").forEach((el) => el.remove());
  };

  useIonViewWillLeave(() => {
    teardown();
  });

  useEffect(() => {
    let cancelled = false;

    const start = async (): Promise<void> => {
      if (!containerRef.current) return;

      const instance = new MindARThree({
        container: containerRef.current,
        imageTargetSrc: AR_TARGET_SRC,
        ...MINDAR_CONFIG,
      });

      const { renderer, scene, camera } = instance;

      renderer.outputColorSpace = THREE.SRGBColorSpace;
      setupLights(scene);

      const anchor = instance.addAnchor(ANCHOR_INDEX);
      loadModel(anchor.group);

      await instance.start();

      // If React tore us down while we were awaiting, clean up immediately
      if (cancelled) {
        renderer.setAnimationLoop(null);
        instance.stop();
        document.querySelectorAll(".mindar-ui-overlay").forEach((el) => el.remove());
        return;
      }

      mindarThreeRef.current = instance;
      isRunningRef.current = true;

      renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
      });
    };

    start();

    return () => {
      cancelled = true;
      teardown();
    };
  }, []);
};