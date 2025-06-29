import { CoinGeckoClient } from "../src/api/CoinGeckoClient";
import { JsonPlaceholderClient } from "../src/api/JsonPlaceholderClient";
import { FlowLogger } from "../src/api/FlowLogger";

describe("Full crypto market research and portfolio simulation flow", () => {
  const coinGecko = new CoinGeckoClient();
  const jsonClient = new JsonPlaceholderClient();

  afterAll(() => {
    FlowLogger.report();
  });

  test("research trending coins and market chart", async () => {
    // 1. Get trending coins
    const trending = await coinGecko.getTrending();
    expect(trending.coins.length).toBeGreaterThan(0);
    FlowLogger.log("/search/trending", 200, trending.coins.length);

    // 2. Get BTC market chart (simulate trend analysis)
    const chartData = await coinGecko.getMarketChart("bitcoin", "usd", 7);
    const prices = chartData.prices.map((p: [number, number]) => p[1]);
    const averagePrice = prices.reduce((a: number, b: number) => a + b, 0) / prices.length;
    const lastPrice = prices[prices.length - 1];
    const percentChange = ((lastPrice - averagePrice) / averagePrice) * 100;

    console.log(`BTC 7-day average: $${averagePrice.toFixed(2)}, last price: $${lastPrice.toFixed(2)}, change: ${percentChange.toFixed(2)}%`);
    FlowLogger.log("/coins/bitcoin/market_chart", 200, prices.length);
  });

  test("simulate portfolio: buy, calculate PnL, store portfolio", async () => {
    // 3. Fetch current BTC price
    const btcPrice = await coinGecko.getCurrentPrice("bitcoin", "usd");
    FlowLogger.log("/simple/price", 200, btcPrice);

    // 4. Simulate buy: buy 0.5 BTC
    const buyAmount = 0.5;
    const portfolio = {
      userId: 1,
      title: "My crypto portfolio",
      body: JSON.stringify({
        holdings: [{
          symbol: "BTC",
          amount: buyAmount,
          buyPrice: btcPrice
        }]
      })
    };
    const createdPortfolio = await jsonClient.createPost(portfolio);
    
    expect(createdPortfolio.id).toBeDefined();
    FlowLogger.log("/posts (portfolio)", 201, createdPortfolio.id);

    // 5. Simulate market move (e.g. BTC +5%)
    const simulatedNewPrice = btcPrice * 1.05;

    // 6. Calculate potential PnL
    const pnl = (simulatedNewPrice - btcPrice) * buyAmount;
    console.log(`If BTC rises by 5%: Bought at $${btcPrice}, new price $${simulatedNewPrice.toFixed(2)}, potential PnL: $${pnl.toFixed(2)}`);

    // 7. Store final simulated sell result
    const sellRecord = await jsonClient.createPost({
      userId: 1,
      title: "Sell BTC",
      body: JSON.stringify({
        action: "sell",
        symbol: "BTC",
        amount: buyAmount,
        sellPrice: simulatedNewPrice,
        pnl
      })
    });    
    expect(sellRecord.id).toBeDefined();
    FlowLogger.log("/posts (sell)", 201, sellRecord.id);
  });
});
