import { CoinGeckoClient } from "../../src/api/CoinGeckoClient";
import { FlowLogger } from "../../src/api/FlowLogger";
import { RequestHandler } from "../../src/api/httpRequests";

describe("Advanced CoinGecko Market Research Flow Edge Cases", () => {
  const client = new CoinGeckoClient();

  afterAll(() => {
    FlowLogger.report();
  });

  test("get trending then validate first coin details exists", async () => {
    const trending = await client.getTrending();
    expect(trending.coins.length).toBeGreaterThan(0);

    const firstCoinId = trending.coins[0].item.id;
    const details = await client.getCoinDetails(firstCoinId);
    expect(details.id).toBe(firstCoinId);

    FlowLogger.log("/coins/" + firstCoinId, 200, details.market_data.current_price.usd);

  });

  test("fetch current prices for multiple coins & currencies", async () => {
    const scenario = {
      client,
      expectedStatus: 200,
      expectedResponse: expect.objectContaining({
        bitcoin: expect.objectContaining({
          usd: expect.any(Number),
          eur: expect.any(Number)
        }),
        ethereum: expect.objectContaining({
          usd: expect.any(Number),
          eur: expect.any(Number)
        })
      })
    };
    await RequestHandler.executeGet(scenario, "/simple/price?ids=bitcoin,ethereum&vs_currencies=usd,eur");
  });

  test("get market chart with long timespan", async () => {
    const scenario = {
      client,
      expectedStatus: 200,
      expectedResponse: expect.objectContaining({
        prices: expect.any(Array)
      })
    };
    await RequestHandler.executeGet(scenario, "/coins/bitcoin/market_chart?vs_currency=usd&days=365");
  });
});
