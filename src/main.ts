import * as T from "three";
import { World } from "./world";
import { Player } from "./player";
import { Context } from "./types";

function resize(ctx: Context) {
  if (window.innerWidth !== ctx.renderer.domElement.clientWidth || window.innerHeight !== ctx.renderer.domElement.clientHeight) {
    ctx.renderer.setSize(window.innerWidth, window.innerHeight);
    ctx.camera.aspect = window.innerWidth / window.innerHeight;
    ctx.camera.updateProjectionMatrix();
  }
}

function setup() {
  const ctx = {
    scene: new T.Scene(),
    camera: new T.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000),
    renderer: new T.WebGLRenderer({ antialias: true })
  };

  document.body.appendChild(ctx.renderer.domElement);

  return ctx;
}

function main() {
  const ctx = setup();

  const world = new World(ctx);
  world.create();

  const player = new Player(ctx);

  ctx.camera.position.z = 5;

  let lastTime = 0;
  function update(time: number) {
    const dt = time - (lastTime || time);
    lastTime = time;

    world.update(dt);
    player.update(dt);

    resize(ctx);
    ctx.renderer.render(ctx.scene, ctx.camera);
  }

  ctx.renderer.setAnimationLoop(update);
}

main();