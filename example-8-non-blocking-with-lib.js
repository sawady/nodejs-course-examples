import fs from "fs";
import csv from "csv-parser";
import pLimit from "p-limit";

const limit = pLimit(20); // Limit concurrency to 20 at a time

async function countRowsStream(file) {
  return new Promise((resolve, reject) => {
    let count = 0;
    fs.createReadStream(file, { encoding: "utf8" })
      .on("data", (chunk) => {
        for (let i = 0; i < chunk.length; ++i) {
          if (chunk[i] === "\n") {
            count++;
          }
        }
      })
      .on("end", () => resolve(count))
      .on("error", reject);
  });
}

async function main() {
  const startTime = Date.now();
  console.log("Starting...");
  const promises = [];
  for (let i = 0; i < 1000; i++) {
    promises.push(limit(() => countRowsStream("10mb.csv")));
  }
  console.log("Running Promise.all with limited concurrency...");
  const results = await Promise.all(promises);
  console.log(
    `All operations completed. Sum: ${results.reduce((a, b) => a + b, 0)}`
  );
  const elapsed = Date.now() - startTime;
  console.log(`Total elapsed time: ${elapsed} ms`);
}

main();
