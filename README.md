
# Oobit QA Home Assignment - Modular API Automation Framework

## 🚀 Overview

This project implements a **modular, scenario-driven test automation framework** for REST APIs.
It was built according to the requirements in the Oobit QA Automation Home Assignment.

The framework is designed to:
- Support multiple REST APIs easily (ReqRes, JSONPlaceholder)
- Handle CRUD flows and performance
- Be easily extendable by adding new scenarios
- Provide summary reports after execution


---

## ⚙️ Technologies
- Node.js + Typescript
- Jest for test running
- Axios as HTTP client


---

## 📁 Project Structure
```
/src
  /api
    ReqResClient.ts
    JsonPlaceholderClient.ts
    httpRequests.ts
    types.ts
    FlowLogger.ts
/tests
  registerAndLogin.test.ts
  update.test.ts
  delete.test.ts
  get.test.ts
  performance.test.ts
  userFlow.test.ts
```


---

## 🏗 Architecture

### 🔹 Layer 1 - API Clients
Encapsulates API-specific logic (baseUrl, axios instance, headers).
- `ReqResClient.ts`
- `JsonPlaceholderClient.ts`

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

## 🚀 How to run

```
npm install
npm test
```

You’ll see a summary like:
```
==== 🌟 FLOW SUMMARY REPORT 🌟 ====
/register -> status: 200, time: 120.22ms
/login -> status: 200, time: 85.31ms
...
==== ✅ END OF SUMMARY ====
```


---

## ✍️ How to extend
- To add more APIs: just create a new `XXXClient.ts`.
- To add new flows: write a new `.test.ts` file with your scenarios.
- The framework will handle the rest.


---

## 🏆 Author
Yuval Vered
