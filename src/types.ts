import * as T from "three";

export type Context = {
  scene: T.Scene;
  camera: T.PerspectiveCamera;
  renderer: T.WebGLRenderer;
}