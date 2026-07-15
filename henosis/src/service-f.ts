import { defineComponent, input, output, value } from "@henosis/core";
import { worker } from "@henosis/platform-cloudflare";
import serviceA from "@henosis/service-a";

export default defineComponent({
  name: "service-f",
  inputs: {
    backendUrl: input.required(serviceA.outputs.api),
  },
  outputs: {
    url: output.observed(value.url()),
    workerName: output.observed(value.string()),
    deploymentId: output.observed(value.string()),
    versionId: output.observed(value.string()),
  },
  build(context, inputs) {
    const emitted = context.emit(worker.create("service-f", {
      source: { entry: "src/index.js", assets: "public" },
      vars: { BACKEND_URL: inputs.backendUrl.value },
    }));

    return {
      url: emitted.outputs.url,
      workerName: emitted.outputs.workerName,
      deploymentId: emitted.outputs.deploymentId,
      versionId: emitted.outputs.versionId,
    };
  },
});
