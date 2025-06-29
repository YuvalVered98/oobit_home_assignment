import { JsonPlaceholderClient } from "../../src/api/JsonPlaceholderClient";
import { DeleteRequest } from "../../src/api/httpRequests";

describe("JSONPlaceholder DELETE Edge Cases", () => {
  const client = new JsonPlaceholderClient();

  test("delete existing post id=1", async () => {
    const scenario = {
      client,
      expectedStatus: 200,
      expectedResponse: {}
    };
    await new DeleteRequest(scenario, "/posts/1").execute();
  });

  test("delete non-existing post id=9999", async () => {
    const scenario = {
      client,
      expectedStatus: 200,
      expectedResponse: {}
    };
    await new DeleteRequest(scenario, "/posts/9999").execute();
  });
});
