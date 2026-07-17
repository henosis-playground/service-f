import a from "@henosis/service-a";
import { defineComponent, output, value } from "@henosis/core";
import { worker } from "@henosis/platform-cloudflare";

export default defineComponent({
  name: "service-f",
  outputs: {
    url: output.observed(value.url()),
  },
  build(ctx) {
    const deployed = ctx.emit(worker.create("service-f-demo-live", {
      source: {
        entry: "src/index.js",
        assets: "public",
      },
      vars: { BACKEND_URL: a.outputs.api.value },
    }));

    return { url: deployed.outputs.url };
  },
});
