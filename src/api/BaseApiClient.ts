export class BaseApiClient {
  constructor(private baseUrl: string) {}

  async request(method: string, endpoint: string, body?: any) {
    const headers = { "Content-Type": "application/json",
      'x-api-key': 'reqres-free-v1' };
    const options: any = { method, headers };
    if (body) options.body = JSON.stringify(body);

    const start = performance.now();
    const response = await fetch(this.baseUrl + endpoint, options);
    const data = await response.json().catch(() => ({}));
    const duration = performance.now() - start;

    return { status: response.status, data, duration };
  }

  async get(endpoint: string) {
    return this.request("GET", endpoint);
  }

  async post(endpoint: string, body: any) {
    return this.request("POST", endpoint, body);
  }

  async put(endpoint: string, body: any) {
    return this.request("PUT", endpoint, body);
  }

  async delete(endpoint: string) {
    return this.request("DELETE", endpoint);
  }
}
