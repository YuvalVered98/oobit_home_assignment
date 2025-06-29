import { JsonPlaceholderClient } from "../../src/api/JsonPlaceholderClient";
import { RequestHandler } from "../../src/api/httpRequests";

describe("JSONPlaceholder GET Edge Cases", () => {
  const client = new JsonPlaceholderClient();

  test("get existing post by id=1", async () => {
    const scenario = {
      client,
      expectedStatus: 200,
      expectedResponse: expect.objectContaining({
        id: 1,
        title: expect.any(String),
        body: expect.any(String),
        userId: expect.any(Number)
      })
    };
    await RequestHandler.executeGet(scenario, "/posts/1");
  });

  test("get non-existing post by id=9999", async () => {
    const scenario = {
      client,
      expectedStatus: 404,
      expectedResponse: {}
    };
    await RequestHandler.executeGet(scenario, "/posts/9999");
  });

  test("get comments for post id=1", async () => {
    const scenario = {
      client,
      expectedStatus: 200,
      expectedResponse: expect.any(Array)
    };
    await RequestHandler.executeGet(scenario, "/posts/1/comments");
  });

  test("get comments for non-existing post id=9999", async () => {
    const scenario = {
      client,
      expectedStatus: 200,
      expectedResponse: []
    };
    await RequestHandler.executeGet(scenario, "/posts/9999/comments");
  });
});
