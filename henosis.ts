import { defineWorker, input } from "@henosis/platform-cloudflare";

export default defineWorker({
  inputs: {
    BACKEND_URL: input.url("service-e", "url"),
  },
});
