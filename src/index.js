export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/config.js") {
      return new Response(`window.HENOSIS_BACKEND_URL=${JSON.stringify(env.BACKEND_URL)};`, { headers: { "content-type": "application/javascript", "cache-control": "no-store" } });
    }
    return env.ASSETS.fetch(request);
  },
};
