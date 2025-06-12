import { promises as fs } from "fs";

function countRows(data) {
  const matches = data.match(/\n/g);
  return matches?.length || 0;
}

// with async/await syntax
const readAndCountRows = async (file) => {
  const startTime = Date.now();
  console.log("Performing a non blocking operation inside async function...");
  const data = await fs.readFile(file, "utf8"); // Simulate a short blocking operation
  const n = countRows(data);
  const elapsed = Date.now() - startTime;
  console.log(`Operation completed. Duration: ${elapsed} ms`);
  return n;
};

// Example usage
async function main() {
  console.log("Starting...");
  const promises = [];
  for (let i = 0; i < 1000; i++) {
    promises.push(readAndCountRows("1mb.csv"));
  }
  console.log("Go promise all...");
  const results = await Promise.all(promises);
  console.log(`Promise all completed. Results: ${results}`);
}

main();
