// Simulate a blocking operation
function blockEventLoop() {
  console.log("Blocking the event loop...");
  const startTime = Date.now();
  while (Date.now() - startTime < 5000) {
    // Simulate a blocking operation
    // This loop will block the event loop for 1 second
    // In a real-world scenario, this could be a synchronous file read or CPU-intensive computation
    // fs.readFileSync("large-file.txt");
  }
  console.log("Event loop unblocked.");
}

// Non-blocking operation
function nonBlockingOperation() {
  console.log("Performing a non-blocking operation...");
  for (let i = 0; i < 700; i++) {
    const startLatencyTime = Date.now();
    setTimeout(() => {
      const startTime = Date.now();
      while (Date.now() - startTime < 10) {}
      const endLatencyTime = Date.now() - startLatencyTime;
      console.log(
        `Non-blocking operation #${i} completed at ${new Date().toISOString()}. Duration: ${endLatencyTime} ms`
      );
    }, Math.random() * 1000);
  }
}

// Example usage
console.log("Starting...");
nonBlockingOperation();
blockEventLoop();
console.log("Continuing after blocking operation...");
