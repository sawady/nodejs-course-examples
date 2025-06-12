import fs from "fs";

// Example 2: Blocking the Event Loop with a Synchronous File Read

// Simulate a blocking operation
function blockEventLoop() {
  console.log("Blocking the event loop...");
  const startTime = Date.now();
  const info = [];
  for (let i = 0; i < 100; i++) {
    // Synchronous file read to block the event loop
    info.push(fs.readFileSync("1mb.csv", "utf-8"));
  }
  const elapsed = Date.now() - startTime;
  console.log(`Blocking operation completed. Duration: ${elapsed} ms`);
  return info;
}

// Non-blocking operation
function nonBlockingOperation() {
  console.log("Performing a non-blocking operation...");
  const startTime = Date.now();
  setTimeout(() => {
    const elapsed = Date.now() - startTime;
    console.log(`Non-blocking operation completed. Duration: ${elapsed} ms`);
  }, 10);
}

// Example usage
console.log("Starting...");
nonBlockingOperation();
blockEventLoop();
console.log("Continuing after blocking operation...");
