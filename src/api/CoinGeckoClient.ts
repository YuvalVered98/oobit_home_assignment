import { BaseApiClient } from "./BaseApiClient";

export class CoinGeckoClient extends BaseApiClient {
  constructor() {
    super("https://api.coingecko.com/api/v3");
  }

  async getMarketChart(coinId: string, vsCurrency: string, days: number) {
    const response = await this.get(`/coins/${coinId}/market_chart?vs_currency=${vsCurrency}&days=${days}`);
    if (!response.data || !response.data.prices) {
      throw new Error(`No market chart data for ${coinId}`);
    }
    return response.data;
  }

  async getTrending() {
    const response = await this.get("/search/trending");
    if (!response.data || !Array.isArray(response.data.coins)) {
      throw new Error("Invalid trending data");
    }
    return response.data;
  }

  public async getCurrentPrice(coinId: string, currency: string): Promise<number> {
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=${currency}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch price: ${response.status}`);
    }
    const data = await response.json();
    if (!data[coinId] || !data[coinId][currency]) {
      throw new Error(`No price data for ${coinId}/${currency}`);
    }
    return data[coinId][currency];
  }

  async getCoinDetails(coinId: string) {
    const response = await this.get(`/coins/${coinId}`);
    if (!response.data || !response.data.id) {
      throw new Error(`No details found for coin ${coinId}`);
    }
    return response.data;
  }
}
