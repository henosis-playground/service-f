import {
  declareOutputs,
  defineWorker,
  h,
  workerOutputs,
} from "@henosis/platform-cloudflare";

const serviceA = declareOutputs(
  "service-a",
  h.object({
    api: h.url(),
  }),
);

export default defineWorker({
  outputs: workerOutputs,
  vars: {
    BACKEND_URL: serviceA.api,
  },
});
