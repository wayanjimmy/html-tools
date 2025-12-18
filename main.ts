import { serveDir } from "jsr:@std/http/file-server";

Deno.serve(async (req: Request) => {
  const pathname = new URL(req.url).pathname;

  // 1. Handle specific API or dynamic routes first
  if (pathname === "/api/health") {
    return new Response("OK");
  }

  // 2. Fallback: Try to serve from the "public" directory
  const response = await serveDir(req, {
    fsRoot: "public",
    showIndex: true,
  });

  // 3. If serveDir returns a 404, you can return a custom 404 page
  if (response.status === 404) {
    return new Response("Custom 404: Page Not Found", { status: 404 });
  }

  return response;
});
