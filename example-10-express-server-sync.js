import express from "express";
import fs from "fs";

const app = express();
const port = 3000;

function countRows(data) {
  const matches = data.match(/\n/g);
  return matches?.length || 0;
}

const countCsvValuesSync = (file) => {
  const data = fs.readFileSync(file, "utf8");
  return countRows(data);
};

// Express route
app.get("/count-values/:file", async (req, res) => {
  const startTime = Date.now();
  try {
    const total = countCsvValuesSync(`${req.params.file}.csv`);

    const elapsed = Date.now() - startTime;

    res.json({
      totalValues: total,
      elapsedMs: elapsed,
    });
  } catch (err) {
    console.error("Error counting values:", err);
    res.status(500).json({ error: "Failed to process files" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
