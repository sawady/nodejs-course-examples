import fs from "fs";

function countValues(data) {
  let n = 0;

  // Split the file into lines
  const lines = data.split("\n");

  // Iterate over each line to access individual rows
  lines.forEach((line) => {
    // Split each line by comma to access individual values
    const values = line.split(",");
    n += values.length; // Count the number of values in each line
  });

  return n;
}

// with async/await syntax
const operation = async (file) => {
  const startTime = Date.now();
  console.log("Performing a blocking operation inside async function...");
  const data = fs.readFileSync(file, "utf8"); // Simulate a short blocking operation
  const n = countValues(data);
  const elapsed = Date.now() - startTime;
  console.log(`Operation completed. Duration: ${elapsed} ms`);
  return n;
};

// Example usage
async function main() {
  console.log("Starting...");
  const promises = [];
  for (let i = 0; i < 10; i++) {
    promises.push(operation("10mb.csv"));
  }
  console.log("Go promise all...");
  const results = await Promise.all(promises);
  console.log(`Promise all completed. Results: ${results}`);
}

main();
