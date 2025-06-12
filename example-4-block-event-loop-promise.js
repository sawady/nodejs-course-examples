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

// with Promise syntax
// Non-blocking operation
const operation1 = (file) => {
  console.log("Creating a promise operation...");
  return new Promise((resolve) => {
    const startTime = Date.now();
    console.log("Performing a blocking operation inside promise...");
    const data = fs.readFileSync(file, "utf8"); // Simulate a short blocking operation
    const n = countValues(data);
    const elapsed = Date.now() - startTime;
    console.log(`Operation completed. Duration: ${elapsed} ms`);
    resolve(n);
  });
};

// with async/await syntax
const operation2 = async (file) => {
  const startTime = Date.now();
  console.log("Performing a blocking operation inside async function...");
  const data = fs.readFileSync(file, "utf8"); // Simulate a short blocking operation
  const n = countValues(data);
  const elapsed = Date.now() - startTime;
  console.log(`Operation completed. Duration: ${elapsed} ms`);
  return n;
};

// Example usage
function main() {
  console.log("Starting...");
  for (let i = 0; i < 10; i++) {
    operation1("1mb.csv").then((n) => {
      console.log(`Promise operation #${i} completed. Count: ${n}`);
    });
  }
  console.log("Continuing after non-blocking operation...");
}

main();
