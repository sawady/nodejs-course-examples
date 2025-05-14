import { Pool } from "pg";
import redis from "redis";
import express from "express";

// PostgreSQL connection configuration
// These details match your docker-compose.yaml
const pgPool = new Pool({
  user: "postgres", // From POSTGRES_USER
  host: "localhost", // Docker port mapping
  database: "nodejs_course", // From POSTGRES_DB
  password: "postgres", // From POSTGRES_PASSWORD
  port: 5432, // Docker port mapping
});

// Redis client configuration
// For redis@4.x.x and later
const redisClient = redis.createClient({
  url: "redis://localhost:6379", // Docker port mapping
});

// Global error listener for Redis client (recommended)
redisClient.on("error", (err) => console.error("Redis Client Error:", err));

async function queryPostgres() {
  let client;
  try {
    client = await pgPool.connect();
    console.log("Successfully connected to PostgreSQL!");

    // Example query: Get the current time from PostgreSQL
    const res = await client.query("SELECT NOW()");
    console.log("PostgreSQL current time:", res.rows[0].now);
  } catch (err) {
    console.error("Error connecting or querying PostgreSQL:", err.stack);
  } finally {
    if (client) {
      client.release(); // Release the client back to the pool
      console.log("PostgreSQL client released.");
    }
  }
}

async function interactWithRedis() {
  try {
    // Example Redis commands: SET a key, then GET it
    const setResult = await redisClient.set(
      "mykey",
      "Hello from Node.js and Redis!"
    );
    console.log(`Redis SET 'mykey' result: ${setResult}`);

    const value = await redisClient.get("mykey");
    console.log(`Redis GET 'mykey' value: ${value}`);
  } catch (err) {
    console.error("Error connecting or interacting with Redis:", err.stack);
  }
}

const app = express();
const port = 3000;

app.get("/health", async (req, res) => {
  console.log("Received request on /hello");
  try {
    await queryPostgres();
    await interactWithRedis();
    res.send(`Hello with PostgreSQL and Redis!`);
  } catch (error) {
    console.error("Error handling /health request:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Start the PostgreSQL connection pool
await redisClient.connect();
console.log("Successfully connected to Redis!");

// Start the Express server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
