import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import neo4j from "neo4j-driver";
import verbRoutes from "./routes/verbRoutes.js";
import lookupRoutes from "./routes/lookupRoutes.js";
import rootRoutes from "./routes/rootRoutes.js";
import "./sync.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Neo4j Connection
const neo4jDriver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
);

neo4jDriver
  .getServerInfo()
  .then(() => console.log("✅ Connected to Neo4j"))
  .catch((err) => console.error("❌ Neo4j connection error:", err));

export { neo4jDriver }; // Exporting the driver to use in other files

app.listen(3001, () => {
  console.log("🚀 Server is running on port 3001");
});

app.use("server/api/verbs", verbRoutes);
app.use("server/api/lookups", lookupRoutes);
app.use("server/api/roots", rootRoutes);
