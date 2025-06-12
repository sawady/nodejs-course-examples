import express from "express";
import fs from "fs";

const app = express();
const port = 3000;

// Count rows in one CSV file
async function countRowsStream(file) {
  return new Promise((resolve, reject) => {
    let count = 0;
    fs.createReadStream(file, { encoding: "utf8" })
      .on("data", (chunk) => {
        for (let i = 0; i < chunk.length; ++i) {
          if (chunk[i] === "\n") {
            count++;
          }
        }
      })
      .on("end", () => resolve(count))
      .on("error", reject);
  });
}

// Express route
app.get("/count-rows/:file", async (req, res) => {
  const startTime = Date.now();
  try {
    const count = await countRowsStream(`${req.params.file}.csv`);
    const elapsed = Date.now() - startTime;

    res.json({
      rows: count,
      elapsedMs: elapsed,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Failed to count rows" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
