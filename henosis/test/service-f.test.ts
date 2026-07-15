import { describe, expect, it } from "vitest";
import { FakeHost } from "@henosis/core/testing";
import serviceF from "../src/service-f.js";

describe("service-f component", () => {
  it("consumes service-a's API output and emits its Worker", () => {
    const result = new FakeHost(serviceF)
      .available("backendUrl", "https://api.service-a.svc.cluster.local/api/v3/healthz")
      .run();

    expect(result).toMatchObject({
      status: "complete",
      observedOutputs: {
        url: { resource: "cloudflare/worker@1/service-f", output: "url" },
        workerName: { resource: "cloudflare/worker@1/service-f", output: "workerName" },
      },
      reads: ["backendUrl"],
    });
    expect(result.resources).toHaveLength(1);
    expect(result.resources[0]?.body).toMatchObject({
      source: { entry: "src/index.js", assets: "public" },
      vars: { BACKEND_URL: "https://api.service-a.svc.cluster.local/api/v3/healthz" },
    });
  });
});
