import { ReqResClient } from "../../src/api/ReqResClient";
import { PutRequest } from "../../src/api/httpRequests";

describe("Update User Edge Cases", () => {
  const reqResClient = new ReqResClient();

  test("update user with valid data", async () => {
    const scenario = {
      client: reqResClient,
      body: { name: "neo", job: "chosen one" },
      expectedStatus: 200,
      expectedResponse: {
        name: "neo",
        job: "chosen one",
        updatedAt: expect.any(String)
      }
    };
    await new PutRequest(scenario, "/users/2").execute();
  });

  test("update user with empty data", async () => {
    const scenario = {
      client: reqResClient,
      body: {},
      expectedStatus: 200,
      expectedResponse: {
        updatedAt: expect.any(String)
      }
    };
    await new PutRequest(scenario, "/users/2").execute();
  });

  test("update user with very long name and job", async () => {
    const longName = "a".repeat(500);
    const longJob = "b".repeat(500);
    const scenario = {
      client: reqResClient,
      body: { name: longName, job: longJob },
      expectedStatus: 200,
      expectedResponse: {
        name: longName,
        job: longJob,
        updatedAt: expect.any(String)
      }
    };
    await new PutRequest(scenario, "/users/2").execute();
  });

  test("update non-existing user by id=9999", async () => {
    const scenario = {
      client: reqResClient,
      body: { name: "neo", job: "chosen one" },
      expectedStatus: 200,
      expectedResponse: {
        name: "neo",
        job: "chosen one",
        updatedAt: expect.any(String)
      }
    };
    await new PutRequest(scenario, "/users/9999").execute();
  });

  test("update user with id=0 (edge case low)", async () => {
    const scenario = {
      client: reqResClient,
      body: { name: "neo", job: "chosen one" },
      expectedStatus: 200,
      expectedResponse: {
        name: "neo",
        job: "chosen one",
        updatedAt: expect.any(String)
      }
    };
    await new PutRequest(scenario, "/users/0").execute();
  });

  test("update user with negative id (-1)", async () => {
    const scenario = {
      client: reqResClient,
      body: { name: "neo", job: "chosen one" },
      expectedStatus: 200,
      expectedResponse: {
        name: "neo",
        job: "chosen one",
        updatedAt: expect.any(String)
      }
    };
    await new PutRequest(scenario, "/users/-1").execute();
  });
});
