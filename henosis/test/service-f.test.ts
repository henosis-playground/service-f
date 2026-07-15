import { describe, expect, it } from "vitest";
import { FakeHost } from "@henosis/core/testing";
import serviceF from "../src/service-f.js";

describe("service-f component", () => {
  it("consumes service-a's API output and emits its Worker", () => {
    const result = new FakeHost(serviceF)
      .available("workerArtifact", "sha256:1111111111111111111111111111111111111111111111111111111111111111")
      .available("assetsArtifact", "sha256:2222222222222222222222222222222222222222222222222222222222222222")
      .available("backendUrl", "https://api.service-a.svc.cluster.local/api/v3/healthz")
      .run();

    expect(result).toMatchObject({
      status: "complete",
      observedOutputs: {
        url: { resource: "cloudflare/worker@1/service-f", output: "url" },
        workerName: { resource: "cloudflare/worker@1/service-f", output: "workerName" },
      },
      reads: ["assetsArtifact", "backendUrl", "workerArtifact"],
    });
    expect(result.resources).toHaveLength(1);
    expect(result.resources[0]?.body).toMatchObject({
      source: {
        entry: {
          kind: "cloudflare-worker",
          digest: "sha256:1111111111111111111111111111111111111111111111111111111111111111",
        },
        assets: {
          kind: "static-assets",
          digest: "sha256:2222222222222222222222222222222222222222222222222222222222222222",
        },
      },
      vars: { BACKEND_URL: "https://api.service-a.svc.cluster.local/api/v3/healthz" },
    });
  });
});
