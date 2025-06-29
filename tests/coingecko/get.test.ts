import { CoinGeckoClient } from "../../src/api/CoinGeckoClient";
import { RequestHandler } from "../../src/api/httpRequests";

describe("CoinGecko GET Edge Cases", () => {
  const client = new CoinGeckoClient();

  test("get details for bitcoin coin", async () => {
    const scenario = {
      client,
      expectedStatus: 200,
      expectedResponse: expect.objectContaining({
        id: "bitcoin",
        symbol: "btc",
        market_data: expect.any(Object)
      })
    };
    await RequestHandler.executeGet(scenario, "/coins/bitcoin");
  });

  test("get details for non-existing coin", async () => {
    const scenario = {
      client,
      expectedStatus: 404,
      expectedResponse: expect.any(Object)
    };
    await RequestHandler.executeGet(scenario, "/coins/fakecoin123");
  });

  test("get trending coins", async () => {
    const scenario = {
      client,
      expectedStatus: 200,
      expectedResponse: expect.objectContaining({
        coins: expect.any(Array)
      })
    };
    await RequestHandler.executeGet(scenario, "/search/trending");
  });

  test("get market chart for bitcoin", async () => {
    const scenario = {
      client,
      expectedStatus: 200,
      expectedResponse: expect.objectContaining({
        prices: expect.any(Array)
      })
    };
    await RequestHandler.executeGet(scenario, "/coins/bitcoin/market_chart?vs_currency=usd&days=7");
  });

  test("get market chart for non-existing coin", async () => {
  const scenario = {
    client,
    expectedStatus: 404,
    expectedResponse: expect.any(Object)
  };
  await RequestHandler.executeGet(scenario, "/coins/fakecoin123/market_chart?vs_currency=usd&days=7");
});

  test("get current price of bitcoin in usd", async () => {
    const scenario = {
      client,
      expectedStatus: 200,
      expectedResponse: expect.objectContaining({
        bitcoin: expect.objectContaining({
          usd: expect.any(Number)
        })
      })
    };
    await RequestHandler.executeGet(scenario, "/simple/price?ids=bitcoin&vs_currencies=usd");
  });

  test("get current price for non-existing coin", async () => {
    const scenario = {
      client,
      expectedStatus: 200,
      expectedResponse: expect.not.objectContaining({
        fakecoin: expect.anything()
      })
    };
    await RequestHandler.executeGet(scenario, "/simple/price?ids=fakecoin123&vs_currencies=usd");
  });

  test("get current price of bitcoin in non-existing currency", async () => {
    const scenario = {
      client,
      expectedStatus: 200,
      expectedResponse: expect.objectContaining({
        bitcoin: {}
      })
    };
    await RequestHandler.executeGet(scenario, "/simple/price?ids=bitcoin&vs_currencies=moon");
  });

  test("get market chart with negative days", async () => {
    const scenario = {
      client,
      expectedStatus: 400,
      expectedResponse: expect.any(Object)
    };
    await RequestHandler.executeGet(scenario, "/coins/bitcoin/market_chart?vs_currency=usd&days=-5");
  });

  test("get market chart with zero days", async () => {
    const scenario = {
      client,
      expectedStatus: 400,
      expectedResponse: expect.any(Object)
    };
    await RequestHandler.executeGet(scenario, "/coins/bitcoin/market_chart?vs_currency=usd&days=0");
  });
});

