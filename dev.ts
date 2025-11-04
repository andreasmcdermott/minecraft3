import { serve } from "bun";
import index from './src/index.html';

const server = serve({
  port: Number(process.env.PORT || 7777),
  routes: {
    "/": index,
    "/main.ts": async () => {
      try {
        await Bun.build({ entrypoints: ["./src/main.ts"], outdir: "./dist" });
        const stream = Bun.file("./dist/main.js").stream();
        return new Response(stream, {
          headers: {
            "Content-Type": "application/javascript",
          },
        });
      } catch (e) {
        console.error('Bundle failed', e);
        return new Response("500 Internal Server Error", { status: 500 });
      }
    }
  }
});

console.log(`Dev server running at ${server.url}`);
