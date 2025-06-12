import fs from "fs";

// Example 3: Blocking the Event Loop with Many Synchronous Operations

// Non-blocking operation
function nonBlockingOperations() {
  console.log("Performing a non-blocking operations...");
  for (let i = 0; i < 5000; i++) {
    const startTime = Date.now();
    setImmediate(() => {
      fs.readFileSync("1mb.csv", "utf-8"); // Simulate a short blocking operation
      const elapsed = Date.now() - startTime;
      console.log(
        `Non-blocking operation #${i} completed. Duration: ${elapsed} ms`
      );
    });
  }
}

// Example usage
console.log("Starting...");
nonBlockingOperations();
console.log("Continuing after non-blocking traffic...");
