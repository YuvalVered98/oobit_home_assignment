import { ReqResClient } from "../../src/api/ReqResClient";
import { RequestHandler } from "../../src/api/httpRequests";

describe("Register and Login Edge Cases", () => {
  const reqResClient = new ReqResClient();

  test("successful registration", async () => {
    const scenario = {
      client: reqResClient,
      body: { email: "eve.holt@reqres.in", password: "pistol" },
      expectedStatus: 200,
      expectedResponse: { id: expect.any(Number), token: expect.any(String) }
    };
    await RequestHandler.executePost(scenario, "/register");
  });

  test("registration with invalid email", async () => {
    const scenario = {
      client: reqResClient,
      body: { email: "aaa", password: "pistol" },
      expectedStatus: 400,
      expectedResponse: { error: expect.any(String) }
    };
    await RequestHandler.executePost(scenario, "/register");
  });

  test("registration missing password", async () => {
    const scenario = {
      client: reqResClient,
      body: { email: "eve.holt@reqres.in", password: "" },
      expectedStatus: 400,
      expectedResponse: { error: expect.any(String) }
    };
    await RequestHandler.executePost(scenario, "/register");
  });

  test("registration missing all fields", async () => {
    const scenario = {
      client: reqResClient,
      body: {},
      expectedStatus: 400,
      expectedResponse: { error: expect.any(String) }
    };
    await RequestHandler.executePost(scenario, "/register");
  });

  test("registration with special chars password", async () => {
    const scenario = {
      client: reqResClient,
      body: { email: "eve.holt@reqres.in", password: "₪$%" },
      expectedStatus: 200,
      expectedResponse: { id: expect.any(Number), token: expect.any(String) }
    };
    await RequestHandler.executePost(scenario, "/register");
  });

  test("login with valid credentials", async () => {
    const scenario = {
      client: reqResClient,
      body: { email: "eve.holt@reqres.in", password: "pistol" },
      expectedStatus: 200,
      expectedResponse: { token: expect.any(String) }
    };
    await RequestHandler.executePost(scenario, "/login");
  });

  test("login with wrong password", async () => {
    const scenario = {
      client: reqResClient,
      body: { email: "eve.holt@reqres.in", password: "wrongpass" },
      expectedStatus: 200,
      expectedResponse: { token: expect.any(String) }
    };
    await RequestHandler.executePost(scenario, "/login");
  });

  test("login with non-existing user", async () => {
    const scenario = {
      client: reqResClient,
      body: { email: "notexist@test.com", password: "pistol" },
      expectedStatus: 400,
      expectedResponse: { error: expect.any(String) }
    };
    await RequestHandler.executePost(scenario, "/login");
  });

  test("login missing password", async () => {
    const scenario = {
      client: reqResClient,
      body: { email: "eve.holt@reqres.in", password: "" },
      expectedStatus: 400,
      expectedResponse: { error: expect.any(String) }
    };
    await RequestHandler.executePost(scenario, "/login");
  });

  test("login with special chars password", async () => {
    const scenario = {
      client: reqResClient,
      body: { email: "eve.holt@reqres.in", password: "₪$%" },
      expectedStatus: 200,
      expectedResponse: { token: expect.any(String) }
    };
    await RequestHandler.executePost(scenario, "/login");
  });
});
