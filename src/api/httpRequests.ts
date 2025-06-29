import { FlowLogger } from "./FlowLogger";
import fs from 'fs';

console.log = (message, ...optionalParams) => {
  fs.appendFileSync('log.txt', `${message} ${optionalParams.join(' ')}\n`);
};

export class RequestHandler {
  static async executePost(scenario: any, endpoint: string): Promise<void> {
    console.log(`POST to: ${scenario.client.baseUrl}${endpoint}`);
    const start = performance.now();
    const response = await scenario.client.post(endpoint, scenario.body);
    const duration = performance.now() - start;

    console.log(`Received status: ${response.status}`);
    console.log(`Response JSON:`, response.data);

    FlowLogger.log(endpoint, response.status, duration);

    expect(response.status).toBe(scenario.expectedStatus);
    expect(response.data).toMatchObject(scenario.expectedResponse);
    console.log(`----------------------------------`);
  }

  static async executeGet(scenario: any, endpoint: string): Promise<void> {
    console.log(`GET from: ${scenario.client.baseUrl}${endpoint}`);
    const start = performance.now();
    const response = await scenario.client.get(endpoint, scenario.query);
    const duration = performance.now() - start;

    console.log(`Received status: ${response.status}`);
    console.log(`Response JSON:`, response.data);

    FlowLogger.log(endpoint, response.status, duration);

    expect(response.status).toBe(scenario.expectedStatus);
    expect(response.data).toMatchObject(scenario.expectedResponse);
    console.log(`----------------------------------`);
  }

  static async executePut(scenario: any, endpoint: string): Promise<void> {
    console.log(`PUT to: ${scenario.client.baseUrl}${endpoint}`);
    const start = performance.now();
    const response = await scenario.client.put(endpoint, scenario.body);
    const duration = performance.now() - start;

    console.log(`Received status: ${response.status}`);
    console.log(`Response JSON:`, response.data);

    FlowLogger.log(endpoint, response.status, duration);

    expect(response.status).toBe(scenario.expectedStatus);
    expect(response.data).toMatchObject(scenario.expectedResponse);
    console.log(`----------------------------------`);
  }

  static async executeDelete(scenario: any, endpoint: string): Promise<void> {
    console.log(`DELETE to: ${scenario.client.baseUrl}${endpoint}`);
    const start = performance.now();
    const response = await scenario.client.delete(endpoint, scenario.body);
    const duration = performance.now() - start;

    console.log(`Received status: ${response.status}`);
    console.log(`Response JSON:`, response.data);

    FlowLogger.log(endpoint, response.status, duration);

    expect(response.status).toBe(scenario.expectedStatus);
    expect(response.data).toMatchObject(scenario.expectedResponse);
    console.log(`----------------------------------`);
  }

  static async executePerformance(scenario: any, endpoint: string): Promise<void> {
    console.log(`PERF test to: ${scenario.client.baseUrl}${endpoint}`);
    const start = performance.now();
    const response = await scenario.client[scenario.method.toLowerCase()](
      endpoint,
      scenario.body
    );
    const duration = performance.now() - start;

    console.log(`Status: ${response.status} took ${duration.toFixed(2)}ms`);

    FlowLogger.log(endpoint, response.status, duration);

    expect(response.status).toBe(scenario.expectedStatus);
    expect(duration).toBeLessThan(scenario.maxDurationMs);
    console.log(`----------------------------------`);
  }
}
