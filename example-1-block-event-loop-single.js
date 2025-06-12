// Example 1: Blocking the Event Loop with a Synchronous Operation

// Simulate a blocking operation
function blockEventLoop() {
  console.log("Blocking the event loop...");
  const startTime = Date.now();
  while (Date.now() - startTime < 5000) {
    // Simulate a blocking operation
    // This loop will block the event loop for 5 seconds
    // In a real-world scenario, this could be a synchronous file read or CPU-intensive computation
    // fs.readFileSync("large-file.txt");
  }
  console.log("Event loop unblocked.");
}

// Non-blocking operation
function nonBlockingOperation() {
  console.log("Performing a non-blocking operation...");
  const startTime = Date.now();
  setTimeout(() => {
    const elapsed = Date.now() - startTime;
    console.log(`Non-blocking operation completed. Duration: ${elapsed} ms`);
  }, 1000);
}

// Example usage
console.log("Starting...");
nonBlockingOperation();
blockEventLoop();
console.log("Continuing after blocking operation...");
