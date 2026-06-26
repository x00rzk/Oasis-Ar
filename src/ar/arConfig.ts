import * as THREE from "three";

// MindAR target and model paths
export const AR_TARGET_SRC = "/targets/card.mind";
export const MODEL_SRC = "/models/flowy.glb";

// MindAR tracking configuration
export const MINDAR_CONFIG = {
  filterMinCF: 0.0001,
  filterBeta: 0.001,
  missTolerance: 5,
  warmupTolerance: 5,
} as const;

// Anchor index for the image target
export const ANCHOR_INDEX = 0;

// Lighting
export const AMBIENT_LIGHT_COLOR = 0xffffff;
export const AMBIENT_LIGHT_INTENSITY = 0.5;

export const DIRECTIONAL_LIGHT_COLOR = 0xffffff;
export const DIRECTIONAL_LIGHT_INTENSITY = 1.5;
export const DIRECTIONAL_LIGHT_POSITION = new THREE.Vector3(0, 1, 1);

// Model transform
export const MODEL_SCALE = new THREE.Vector3(2, 2, 2);
export const MODEL_ROTATION_Y_DEG = -90;