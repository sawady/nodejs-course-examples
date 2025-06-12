import fs from "fs";

function countRows(data) {
  // Split the file into lines
  const lines = data.split("\n");

  // Count lines
  return lines.length;
}

// with async/await syntax
const readAndCountRows = async (file) => {
  const startTime = Date.now();
  console.log("Performing a blocking operation inside async function...");
  const data = fs.readFileSync(file, "utf8"); // Simulate a short blocking operation
  const n = countRows(data);
  const elapsed = Date.now() - startTime;
  console.log(`Operation completed. Duration: ${elapsed} ms`);
  return n;
};

// Example usage
async function main() {
  console.log("Starting...");
  const promises = [];
  for (let i = 0; i < 10; i++) {
    promises.push(readAndCountRows("10mb.csv"));
  }
  console.log("Go promise all...");
  const results = await Promise.all(promises);
  console.log(`Promise all completed. Results: ${results}`);
}

main();
