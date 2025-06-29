import { JsonPlaceholderClient } from "../../src/api/JsonPlaceholderClient";
import { RequestHandler } from "../../src/api/httpRequests";

describe("JSONPlaceholder POST & PUT Edge Cases", () => {
  const client = new JsonPlaceholderClient();

  test("create post with valid body", async () => {
    const scenario = {
      client,
      payload: { title: "foo", body: "bar", userId: 1 },
      expectedStatus: 201,
      expectedResponse: expect.objectContaining({
        id: expect.any(Number)
      })
    };
    await RequestHandler.executePost(scenario, "/posts");
  });

  test("create post with empty body", async () => {
    const scenario = {
      client,
      payload: {},
      expectedStatus: 201,
      expectedResponse: expect.objectContaining({
        id: expect.any(Number)
      })
    };
    await RequestHandler.executePost(scenario, "/posts");
  });

  test("update existing post with valid data", async () => {
    const scenario = {
      client,
      payload: { title: "updated", body: "updated body", userId: 1 },
      expectedStatus: 200,
      expectedResponse: expect.objectContaining({
        id: 1
      })
    };
    await RequestHandler.executePut(scenario, "/posts/1");
  });

  test("update non-existing post", async () => {
  const scenario = {
    client,
    payload: { title: "updated", body: "updated body", userId: 1 },
    expectedStatus: 500,
    expectedResponse: expect.any(Object)
  };
  await RequestHandler.executePut(scenario, "/posts/9999");
});

});

