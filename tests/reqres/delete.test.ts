import { ReqResClient } from "../../src/api/ReqResClient";
import { DeleteRequest } from "../../src/api/httpRequests";

describe("Delete User Edge Cases", () => {
  const reqResClient = new ReqResClient();

  test("delete user by id=2", async () => {
    const scenario = {
      client: reqResClient,
      body: {},
      expectedStatus: 204,
      expectedResponse: {}
    };
    await new DeleteRequest(scenario, "/users/2").execute();
  });

  test("delete user with non-existing id (9999)", async () => {
    const scenario = {
      client: reqResClient,
      body: {},
      expectedStatus: 204,
      expectedResponse: {}
    };
    await new DeleteRequest(scenario, "/users/9999").execute();
  });

  test("delete user with id=0", async () => {
    const scenario = {
      client: reqResClient,
      body: {},
      expectedStatus: 204,
      expectedResponse: {}
    };
    await new DeleteRequest(scenario, "/users/0").execute();
  });

  test("delete user with negative id (-1)", async () => {
    const scenario = {
      client: reqResClient,
      body: {},
      expectedStatus: 204,
      expectedResponse: {}
    };
    await new DeleteRequest(scenario, "/users/-1").execute();
  });

  test("delete user with very large id (9999999)", async () => {
    const scenario = {
      client: reqResClient,
      body: {},
      expectedStatus: 204,
      expectedResponse: {}
    };
    await new DeleteRequest(scenario, "/users/9999999").execute();
  });

  test("delete user with string id ('abc')", async () => {
    const scenario = {
      client: reqResClient,
      body: {},
      expectedStatus: 204,
      expectedResponse: {}
    };
    await new DeleteRequest(scenario, "/users/abc").execute();
  });

  test("delete user with special characters id ('!@#')", async () => {
    const scenario = {
      client: reqResClient,
      body: {},
      expectedStatus: 204,
      expectedResponse: {}
    };
    await new DeleteRequest(scenario, "/users/!@#").execute();
  });
});
