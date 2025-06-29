import { ReqResClient } from "../../src/api/ReqResClient";
import { GetRequest } from "../../src/api/httpRequests";

describe("Get User Edge Cases", () => {
  const reqResClient = new ReqResClient();

  test("get user by id=2", async () => {
    const scenario = {
      client: reqResClient,
      expectedStatus: 200,
      expectedResponse: {
        data: {
          id: 2,
          email: expect.any(String),
          first_name: expect.any(String),
          last_name: expect.any(String),
          avatar: expect.any(String)
        }
      }
    };
    await new GetRequest(scenario, "/users/2").execute();
  });

  test("get non-existing user by id=9999", async () => {
    const scenario = {
      client: reqResClient,
      expectedStatus: 404,
      expectedResponse: {}
    };
    await new GetRequest(scenario, "/users/9999").execute();
  });

  test("get user by id=0 (edge case low)", async () => {
    const scenario = {
      client: reqResClient,
      expectedStatus: 404,
      expectedResponse: {}
    };
    await new GetRequest(scenario, "/users/0").execute();
  });

  test("get user by id=-1 (negative id)", async () => {
    const scenario = {
      client: reqResClient,
      expectedStatus: 404,
      expectedResponse: {}
    };
    await new GetRequest(scenario, "/users/-1").execute();
  });

  test("get user by very high id (9999999)", async () => {
    const scenario = {
      client: reqResClient,
      expectedStatus: 404,
      expectedResponse: {}
    };
    await new GetRequest(scenario, "/users/9999999").execute();
  });
});
