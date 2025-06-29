import { PostRequest, GetRequest, PutRequest, DeleteRequest } from "../src/api/httpRequests";
import { ReqResClient } from "../src/api/ReqResClient";
import { JsonPlaceholderClient } from "../src/api/JsonPlaceholderClient";

import { FlowLogger } from "../src/api/FlowLogger";

afterAll(() => {
  FlowLogger.report();
});

describe("Full user lifecycle flow including content creation", () => {
  const reqResClient = new ReqResClient();
  const jsonClient = new JsonPlaceholderClient();

  test("register, login, update, create post, add comment, delete user", async () => {
    // register
    const registerScenario = {
      body: { email: "eve.holt@reqres.in", password: "pistol" },
      expectedStatus: 200,
      expectedResponse: { id: expect.any(Number), token: expect.any(String) },
      client: reqResClient
    };
    await new PostRequest(registerScenario, "/register").execute();

    // login
    const loginScenario = {
      body: { email: "eve.holt@reqres.in", password: "pistol" },
      expectedStatus: 200,
      expectedResponse: { token: expect.any(String) },
      client: reqResClient
    };
    await new PostRequest(loginScenario, "/login").execute();

    // update user
    const updateScenario = {
      body: { name: "neo", job: "chosen one" },
      expectedStatus: 200,
      expectedResponse: { name: "neo", job: "chosen one", updatedAt: expect.any(String) },
      client: reqResClient
    };
    await new PutRequest(updateScenario, "/users/2").execute();

    // create post
    const postScenario = {
      body: { userId: 1, title: "Hello from userFlow", body: "Testing integrated flow" },
      expectedStatus: 201,
      expectedResponse: { id: expect.any(Number) },
      client: jsonClient
    };
    await new PostRequest(postScenario, "/posts").execute();

    // add comment
    const commentScenario = {
      body: { postId: 1, name: "Flow Tester", email: "flow@test.com", body: "Nice integration!" },
      expectedStatus: 201,
      expectedResponse: { id: expect.any(Number) },
      client: jsonClient
    };
    await new PostRequest(commentScenario, "/comments").execute();

    // delete user
    const deleteScenario = {
      body: {},
      expectedStatus: 204,
      expectedResponse: {},
      client: reqResClient
    };
    await new DeleteRequest(deleteScenario, "/users/2").execute();
  });
});
