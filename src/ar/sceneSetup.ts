import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import {
  AMBIENT_LIGHT_COLOR,
  AMBIENT_LIGHT_INTENSITY,
  DIRECTIONAL_LIGHT_COLOR,
  DIRECTIONAL_LIGHT_INTENSITY,
  DIRECTIONAL_LIGHT_POSITION,
  MODEL_ROTATION_Y_DEG,
  MODEL_SCALE,
  MODEL_SRC,
} from "./arConfig";

export const setupLights = (scene: THREE.Scene): void => {
  const ambientLight = new THREE.AmbientLight(AMBIENT_LIGHT_COLOR, AMBIENT_LIGHT_INTENSITY);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(DIRECTIONAL_LIGHT_COLOR, DIRECTIONAL_LIGHT_INTENSITY);
  directionalLight.position.copy(DIRECTIONAL_LIGHT_POSITION);
  scene.add(directionalLight);
};

export const loadModel = (anchorGroup: THREE.Group): void => {
  const loader = new GLTFLoader();

  loader.load(MODEL_SRC, (gltf) => {
    const model = gltf.scene;
    model.scale.copy(MODEL_SCALE);
    model.rotation.y = THREE.MathUtils.degToRad(MODEL_ROTATION_Y_DEG);
    anchorGroup.add(model);
  });
};