<<<<<<< HEAD

# Oobit QA Home Assignment - Modular API Automation Framework

## Overview

This project implements a **modular, scenario-driven test automation framework** for REST APIs.
It was built according to the requirements in the Oobit QA Automation Home Assignment.

The framework is designed to:
- Support multiple REST APIs easily (ReqRes, JSONPlaceholder)
- Handle flows and performance
- Be easily extendable by adding new scenarios
- Provide summary reports after execution


---

## Technologies
- Node.js + Typescript
- Jest for test running

---

## Project Structure
```
/src
  /api
    BaseApiClient.ts
    JsonPlaceholderClient.ts
    httpRequests.ts
    types.ts
    FlowLogger.ts
    CoinGeckoClient.ts
    ReqResClient.ts
/tests
  /coingecko
    get.test.ts
    edgeCases.test.ts
  /jsonplaceholder
    get.test.ts
    delete.test.ts
    createAndUpdate.test.ts
  /reqres
    registerAndLogin.test.ts
    update.test.ts
    delete.test.ts
    get.test.ts
  performance.test.ts
  userFlow.test.ts
  marketResearchFlow.test.ts

```
## Architecture

### 🔹 Layer 1 - API Clients
Encapsulates API-specific logic (baseUrl, headers).
- `ReqResClient.ts`
- `JsonPlaceholderClient.ts`
- `CoinGeckoClient.ts`
- `BaseApiClient.ts`

### 🔹 Layer 2 - Generic HTTP Request Classes
Reusable `PostRequest`, `GetRequest`, `PutRequest`, `DeleteRequest`, `PerformanceRequest` 
that take a scenario object + endpoint, and call the API client.

### 🔹 Layer 3 - Scenario-Driven Tests
Each test provides a `scenario` object (body, expectedStatus, expectedResponse).
Flows like:
```typescript
await new PostRequest(scenario, "/register").execute();
```

### 🔹 Layer 4 - Reporting Layer
- `FlowLogger.ts` records each request (endpoint, status, duration).
- Prints a summary report after all tests complete.

---

## 🧪 What we cover (according to the assignment)

✅ **Multiple APIs:** supports `https://reqres.in` and `https://jsonplaceholder.typicode.com`

✅ **Full user lifecycle:** register, login, update, delete, get

✅ **Edge cases:** missing password, invalid email, huge user ids, special chars

✅ **Performance tests:** ensure endpoints respond under thresholds

✅ **Scenario-driven:** add new flows by adding scenario objects

✅ **Reporting:** afterAll() prints a full summary of flows, status codes and durations

---

## ✍️ How to extend
- To add more APIs: just create a new `XXXClient.ts`.
- To add new flows: write a new `.test.ts` file with your scenarios.
- The framework will handle the rest.

---

## 🏆 Author
Yuval Vered
=======
>>>>>>> 643562933ae2293d470efd8e4989290100368b74
