import fs from "fs";

function countRows(data) {
  // Split the file into lines
  const lines = data.split("\n");

  // Count lines
  return lines.length;
}

// with Promise syntax
// Non-blocking operation
const readAndcountRows1 = (file) => {
  console.log("Creating a promise operation...");
  return new Promise((resolve) => {
    const startTime = Date.now();
    console.log("Performing a blocking operation inside promise...");
    const data = fs.readFileSync(file, "utf8"); // Simulate a short blocking operation
    const n = countRows(data);
    const elapsed = Date.now() - startTime;
    console.log(`Operation completed. Duration: ${elapsed} ms`);
    resolve(n);
  });
};

// with async/await syntax
const readAndCountRows2 = async (file) => {
  const startTime = Date.now();
  console.log("Performing a blocking operation inside async function...");
  const data = fs.readFileSync(file, "utf8"); // Simulate a short blocking operation
  const n = countRows(data);
  const elapsed = Date.now() - startTime;
  console.log(`Operation completed. Duration: ${elapsed} ms`);
  return n;
};

function main() {
  console.log("Starting...");
  for (let i = 0; i < 10; i++) {
    readAndcountRows1("1mb.csv");
  }
  console.log("Continuing after for loop...");
}

main();
