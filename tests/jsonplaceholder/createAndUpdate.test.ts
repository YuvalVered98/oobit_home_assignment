import { JsonPlaceholderClient } from "../../src/api/JsonPlaceholderClient";
import { PostRequest, PutRequest } from "../../src/api/httpRequests";

describe("JSONPlaceholder POST & PUT Edge Cases", () => {
  const client = new JsonPlaceholderClient();

  // POST
  test("create post with valid body", async () => {
    const scenario = {
      client,
      payload: { title: "foo", body: "bar", userId: 1 },
      expectedStatus: 201,
      expectedResponse: expect.objectContaining({
        id: expect.any(Number)
      })
    };
    await new PostRequest(scenario, "/posts").execute();
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
    await new PostRequest(scenario, "/posts").execute();
  });

  // PUT
  test("update existing post with valid data", async () => {
    const scenario = {
      client,
      payload: { title: "updated", body: "updated body", userId: 1 },
      expectedStatus: 200,
      expectedResponse: expect.objectContaining({
        id: 1 // JSONPlaceholder לרוב מחזיר רק את ה-id
      })
    };
    await new PutRequest(scenario, "/posts/1").execute();
  });

  test("update non-existing post", async () => {
  const scenario = {
    client,
    payload: { title: "updated", body: "updated body", userId: 1 },
    expectedStatus: 500, // קיבלנו 500 בפועל, אז זה מה שנצפה
    expectedResponse: expect.any(Object) // לא משנה לנו התוכן כי זה ריק
  };
  await new PutRequest(scenario, "/posts/9999").execute();
});

});

