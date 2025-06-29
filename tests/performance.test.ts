import { ReqResClient } from "../src/api/ReqResClient";
import { PerformanceRequest } from "../src/api/httpRequests";

describe("Performance Tests", () => {
  const reqResClient = new ReqResClient();

  test("register user under 500ms", async () => {
    const scenario = {
      client: reqResClient,
      method: "POST",
      body: { email: "eve.holt@reqres.in", password: "pistol" },
      expectedStatus: 200,
      maxDurationMs: 500
    };
    await new PerformanceRequest(scenario, "/register").execute();
  });

  test("login user under 500ms", async () => {
    const scenario = {
      client: reqResClient,
      method: "POST",
      body: { email: "eve.holt@reqres.in", password: "pistol" },
      expectedStatus: 200,
      maxDurationMs: 500
    };
    await new PerformanceRequest(scenario, "/login").execute();
  });

  test("get user by id=2 under 300ms", async () => {
    const scenario = {
      client: reqResClient,
      method: "GET",
      expectedStatus: 200,
      maxDurationMs: 300
    };
    await new PerformanceRequest(scenario, "/users/2").execute();
  });

  test("delete user by id=2 under 300ms", async () => {
    const scenario = {
      client: reqResClient,
      method: "DELETE",
      expectedStatus: 204,
      maxDurationMs: 300
    };
    await new PerformanceRequest(scenario, "/users/2").execute();
  });
});
