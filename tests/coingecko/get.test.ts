import { CoinGeckoClient } from "../../src/api/CoinGeckoClient";
import { GetRequest } from "../../src/api/httpRequests";

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
    await new GetRequest(scenario, "/coins/bitcoin").execute();
  });

  test("get details for non-existing coin", async () => {
    const scenario = {
      client,
      expectedStatus: 404,
      expectedResponse: expect.any(Object)
    };
    await new GetRequest(scenario, "/coins/fakecoin123").execute();
  });

  test("get trending coins", async () => {
    const scenario = {
      client,
      expectedStatus: 200,
      expectedResponse: expect.objectContaining({
        coins: expect.any(Array)
      })
    };
    await new GetRequest(scenario, "/search/trending").execute();
  });

  test("get market chart for bitcoin", async () => {
    const scenario = {
      client,
      expectedStatus: 200,
      expectedResponse: expect.objectContaining({
        prices: expect.any(Array)
      })
    };
    await new GetRequest(scenario, "/coins/bitcoin/market_chart?vs_currency=usd&days=7").execute();
  });

  test("get market chart for non-existing coin", async () => {
  const scenario = {
    client,
    expectedStatus: 404,
    expectedResponse: expect.any(Object)
  };
  await new GetRequest(scenario, "/coins/fakecoin123/market_chart?vs_currency=usd&days=7").execute();
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
    await new GetRequest(scenario, "/simple/price?ids=bitcoin&vs_currencies=usd").execute();
  });

  test("get current price for non-existing coin", async () => {
    const scenario = {
      client,
      expectedStatus: 200,
      expectedResponse: expect.not.objectContaining({
        fakecoin: expect.anything()
      })
    };
    await new GetRequest(scenario, "/simple/price?ids=fakecoin&vs_currencies=usd").execute();
  });

  test("get current price of bitcoin in non-existing currency", async () => {
    const scenario = {
      client,
      expectedStatus: 200,
      expectedResponse: expect.objectContaining({
        bitcoin: {}
      })
    };
    await new GetRequest(scenario, "/simple/price?ids=bitcoin&vs_currencies=moon").execute();
  });

  test("get market chart with negative days", async () => {
    const scenario = {
      client,
      expectedStatus: 400,
      expectedResponse: expect.any(Object)
    };
    await new GetRequest(scenario, "/coins/bitcoin/market_chart?vs_currency=usd&days=-5").execute();
  });

  test("get market chart with zero days", async () => {
    const scenario = {
      client,
      expectedStatus: 400,
      expectedResponse: expect.any(Object)
    };
    await new GetRequest(scenario, "/coins/bitcoin/market_chart?vs_currency=usd&days=0").execute();
  });
});

