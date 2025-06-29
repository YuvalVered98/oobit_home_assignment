import { ReqResClient } from "../src/api/ReqResClient";
import { RequestHandler } from "../src/api/httpRequests";

const MAX_DURATION_MS = 500;
const MAX_DURATION_MS_GET = 300;
const PARALLEL_REQUESTS = 5;

describe("Performance Tests", () => {
  const reqResClient = new ReqResClient();

  test(`register user under ${MAX_DURATION_MS}ms`, async () => {
    const scenario = {
      client: reqResClient,
      method: "POST",
      body: { email: "eve.holt@reqres.in", password: "pistol" },
      expectedStatus: 200,
      maxDurationMs: MAX_DURATION_MS
    };
    await RequestHandler.executePerformance(scenario, "/register");
  });

  test(`login user under ${MAX_DURATION_MS}ms`, async () => {
    const scenario = {
      client: reqResClient,
      method: "POST",
      body: { email: "eve.holt@reqres.in", password: "pistol" },
      expectedStatus: 200,
      maxDurationMs: MAX_DURATION_MS
    };
    await RequestHandler.executePerformance(scenario, "/login");
  });

  test(`get user by id=2 under ${MAX_DURATION_MS_GET}ms`, async () => {
    const scenario = {
      client: reqResClient,
      method: "GET",
      expectedStatus: 200,
      maxDurationMs: MAX_DURATION_MS_GET
    };
    await RequestHandler.executePerformance(scenario, "/users/2");
  });

  test(`delete user by id=2 under ${MAX_DURATION_MS_GET}ms`, async () => {
    const scenario = {
      client: reqResClient,
      method: "DELETE",
      expectedStatus: 204,
      maxDurationMs: MAX_DURATION_MS_GET
    };
    await RequestHandler.executePerformance(scenario, "/users/2");
  });

  test(`parallel requests (${PARALLEL_REQUESTS}) to /users/2 and compute average time`, async () => {
    const scenario = {
      client: reqResClient,
      method: "GET",
      expectedStatus: 200,
      maxDurationMs: MAX_DURATION_MS_GET
    };
    
    const promises = Array.from({ length: PARALLEL_REQUESTS }, () =>
      RequestHandler.executePerformance(scenario, "/users/2")
    );

    const startTime = Date.now();
    await Promise.all(promises);
    const totalTime = Date.now() - startTime;
    const avgTime = totalTime / PARALLEL_REQUESTS;

    console.log(`Average time per request: ${avgTime.toFixed(2)}ms`);
  });
});
