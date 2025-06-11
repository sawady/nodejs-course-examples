import fs from "fs";

// with Promise syntax
// Non-blocking operation
// const nonBlockingOperation = () => {
//   const startTime = Date.now();
//   return new Promise((resolve) => {
//     console.log("Performing a blocking operation...");
//     const data = fs.readFileSync("1mb.csv", "utf8"); // Simulate a short blocking operation

//     // Split the file into lines
//     const lines = data.split("\n");

//     // Iterate over each line to access individual rows
//     lines.forEach((line) => {
//       // Split each line by comma to access individual values
//       const values = line.split(",");
//       // console.log(values);
//     });

//     const elapsed = Date.now() - startTime;
//     console.log(`Operation completed. Duration: ${elapsed} ms`);
//     resolve(lines);
//   });
// };

// with async/await syntax
// const nonBlockingOperation = async () => {
//   const startTime = Date.now();
//   console.log("Performing a blocking operation...");
//   const data = fs.readFileSync("1mb.csv", "utf8"); // Simulate a short blocking operation

//   // Split the file into lines
//   const lines = data.split("\n");

//   // Iterate over each line to access individual rows
//   lines.forEach((line) => {
//     // Split each line by comma to access individual values
//     const values = line.split(",");
//     // console.log(values);
//   });

//   const elapsed = Date.now() - startTime;
//   console.log(`Operation completed. Duration: ${elapsed} ms`);
//   return lines;
// };

// Example usage
function main() {
  console.log("Starting...");
  for (let i = 0; i < 1; i++) {
    nonBlockingOperation();
  }
  console.log("Continuing after non-blocking operation...");
}

main();
