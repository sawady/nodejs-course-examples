// Simulate a blocking operation
const blockEventLoop = () =>
  new Promise((resolve) => {
    console.log("Blocking the event loop...");
    const startTime = Date.now();
    while (Date.now() - startTime < 5000) {
      // Simulate a blocking operation
      // This loop will block the event loop for 1 second
      // In a real-world scenario, this could be a synchronous file read or CPU-intensive computation
      // fs.readFileSync("large-file.txt");
    }
    console.log("Event loop unblocked.");
    resolve();
  });

// Non-blocking operation
const nonBlockingOperation = () =>
  new Promise((resolve) => {
    console.log("Performing a non-blocking operation...");
    setTimeout(() => {
      console.log("Non-blocking operation completed.");
      resolve();
    }, 1000);
  });

// Example usage
function main() {
  console.log("Starting...");
  nonBlockingOperation();
  blockEventLoop();
  console.log("Continuing after blocking operation...");
}

main();
