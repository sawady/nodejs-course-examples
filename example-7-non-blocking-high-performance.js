import { promises as fs } from "fs";
import pLimit from "p-limit";

const limit = pLimit(20); // Limit concurrency to 64 at a time

function countValues(data) {
  const matches = data.match(/[,\n]/g);
  return (matches?.length || 0) + 1;
}

const operation = async (file) => {
  const startTime = Date.now();
  const data = await fs.readFile(file, "utf8");
  const n = countValues(data);
  const elapsed = Date.now() - startTime;
  console.log(`Read ${n} values in ${elapsed} ms`);
  return n;
};

async function main() {
  const startTime = Date.now();
  console.log("Starting...");
  const promises = [];
  for (let i = 0; i < 1000; i++) {
    promises.push(limit(() => operation("1mb.csv")));
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
