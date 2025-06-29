import { FlowLogger } from "./FlowLogger";

import fs from 'fs';


console.log = (message, ...optionalParams) => {
  fs.appendFileSync('log.txt', `${message} ${optionalParams.join(' ')}\n`);
};


export class PostRequest {
  constructor(private scenario: any, private endpoint: string) {}

  async execute(): Promise<void> {
    console.log(`POST to: ${this.scenario.client.baseUrl}${this.endpoint}`);
    const start = performance.now();
    const response = await this.scenario.client.post(this.endpoint, this.scenario.body);
    const duration = performance.now() - start;

    console.log(`Received status: ${response.status}`);
    console.log(`Response JSON:`, response.data);

    FlowLogger.log(this.endpoint, response.status, duration);

    expect(response.status).toBe(this.scenario.expectedStatus);
    expect(response.data).toMatchObject(this.scenario.expectedResponse);
    
    console.log(`----------------------------------`);
  }
}

export class GetRequest {
  constructor(private scenario: any, private endpoint: string) {}

  async execute(): Promise<void> {
    console.log(`GET from: ${this.scenario.client.baseUrl}${this.endpoint}`);
    const start = performance.now();
    const response = await this.scenario.client.get(this.endpoint, this.scenario.query);
    const duration = performance.now() - start;

    console.log(`Received status: ${response.status}`);
    console.log(`Response JSON:`, response.data);

    FlowLogger.log(this.endpoint, response.status, duration);

    expect(response.status).toBe(this.scenario.expectedStatus);
    expect(response.data).toMatchObject(this.scenario.expectedResponse);
    console.log(`----------------------------------`);
  }
}

export class PutRequest {
  constructor(private scenario: any, private endpoint: string) {}

  async execute(): Promise<void> {
    console.log(`PUT to: ${this.scenario.client.baseUrl}${this.endpoint}`);
    const start = performance.now();
    const response = await this.scenario.client.put(this.endpoint, this.scenario.body);
    const duration = performance.now() - start;

    console.log(`Received status: ${response.status}`);
    console.log(`Response JSON:`, response.data);

    FlowLogger.log(this.endpoint, response.status, duration);

    expect(response.status).toBe(this.scenario.expectedStatus);
    expect(response.data).toMatchObject(this.scenario.expectedResponse);
    console.log(`----------------------------------`);
  }
}

export class DeleteRequest {
  constructor(private scenario: any, private endpoint: string) {}

  async execute(): Promise<void> {
    console.log(`DELETE to: ${this.scenario.client.baseUrl}${this.endpoint}`);
    const start = performance.now();
    const response = await this.scenario.client.delete(this.endpoint, this.scenario.body);
    const duration = performance.now() - start;

    console.log(`Received status: ${response.status}`);
    console.log(`Response JSON:`, response.data);

    FlowLogger.log(this.endpoint, response.status, duration);

    expect(response.status).toBe(this.scenario.expectedStatus);
    expect(response.data).toMatchObject(this.scenario.expectedResponse);
    console.log(`----------------------------------`);
  }
}

export class PerformanceRequest {
  constructor(private scenario: any, private endpoint: string) {}

  async execute(): Promise<void> {
    console.log(`PERF test to: ${this.scenario.client.baseUrl}${this.endpoint}`);
    const start = performance.now();
    const response = await this.scenario.client[this.scenario.method.toLowerCase()](
      this.endpoint,
      this.scenario.body
    );
    const duration = performance.now() - start;

    console.log(`Status: ${response.status} took ${duration.toFixed(2)}ms`);

    FlowLogger.log(this.endpoint, response.status, duration);

    expect(response.status).toBe(this.scenario.expectedStatus);
    expect(duration).toBeLessThan(this.scenario.maxDurationMs);
    console.log(`----------------------------------`);
  }
}
