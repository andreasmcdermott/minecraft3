import * as T from "three";
import { Context } from "./types";

export class World {
  constructor(private ctx: Context) {
  }

  light: T.DirectionalLight | null = null;
  box: T.Mesh | null = null;
  ambient: T.AmbientLight | null = null;
  fog: T.Fog | null = null;

  create() {
    this.ambient = new T.AmbientLight(0x999999, 0.5);
    this.ctx.scene.add(this.ambient);

    this.light = new T.DirectionalLight(0xffffff, 3);
    this.light.position.set(-1, 2, 4);
    this.ctx.scene.add(this.light);

    this.fog = new T.Fog(0x999999, 1, 100);
    this.ctx.scene.fog = this.fog;

    const boxGeometry = new T.BoxGeometry(1, 1, 1);
    const boxMaterial = new T.MeshPhongMaterial({ color: 0x0ffff0 });
    this.box = new T.Mesh(boxGeometry, boxMaterial);
    this.ctx.scene.add(this.box);
  }

  dispose() {
    if (this.ambient) {
      this.ctx.scene.remove(this.ambient);
      this.ambient.dispose();
      this.ambient = null;
    }

    if (this.light) {
      this.ctx.scene.remove(this.light);
      this.light.dispose();
      this.light = null;
    }

    if (this.fog) {
      this.ctx.scene.fog = null;
      this.fog = null;
    }

    if (this.box) {
      this.ctx.scene.remove(this.box);
      this.box.geometry.dispose();
      (this.box.material as T.MeshPhongMaterial).dispose();
      this.box = null;
    }
  }

  update(dt: number) {
    if (this.box) {
      this.box.rotation.x += 0.001 * dt;
      this.box.rotation.y += 0.001 * dt;
    }
  }
}