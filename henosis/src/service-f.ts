import { artifact, defineComponent, input, output, value } from "@henosis/core";
import { worker } from "@henosis/platform-cloudflare";
import serviceA from "@henosis/service-a";

export default defineComponent({
  name: "service-f",
  inputs: {
    workerArtifact: input.config(value.artifactDigest()),
    assetsArtifact: input.config(value.artifactDigest()),
    backendUrl: input.required(serviceA.outputs.api),
  },
  artifacts: [
    artifact.buildWorker("workerArtifact", "src/index.js"),
    artifact.buildAssets("assetsArtifact", "public"),
  ],
  outputs: {
    url: output.observed(value.url()),
    workerName: output.observed(value.string()),
    deploymentId: output.observed(value.string()),
    versionId: output.observed(value.string()),
  },
  build(context, inputs) {
    const emitted = context.emit(worker.create("service-f", {
      source: {
        entry: artifact.worker(inputs.workerArtifact.value),
        assets: artifact.assets(inputs.assetsArtifact.value),
      },
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
