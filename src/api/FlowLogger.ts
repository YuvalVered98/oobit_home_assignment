import fs from "fs";

export class FlowLogger {
  private static logs: { endpoint: string, status: number, duration: number }[] = [];

  static log(endpoint: string, status: number, duration: number) {
    this.logs.push({ endpoint, status, duration });
  }

  static report() {
    console.log("==== 🌟 FLOW SUMMARY REPORT 🌟 ====");
    for (const log of this.logs) {
      console.log(`${log.endpoint} -> status: ${log.status}, time: ${log.duration.toFixed(2)}ms`);
    }
    console.log("==== ✅ END OF SUMMARY ====");

    fs.writeFileSync("flow-summary.json", JSON.stringify(this.logs, null, 2));
  }
}
