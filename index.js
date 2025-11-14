import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ====== KẾT NỐI MONGODB ATLAS ======
const uri =
  "mongodb+srv://thuanvan557_db_user:thuan1234@cluster0.iorpy3q.mongodb.net/fruit_graph?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// ====== ROUTES API ======

// Lấy tất cả nodes (đầy đủ trái cây, thuộc tính, giai đoạn...)
app.get("/api/nodes", async (req, res) => {
  try {
    const db = client.db("fruit_graph");
    const data = await db.collection("nodes").find({}).toArray();
    res.json(data);
  } catch (err) {
    console.error("Error /api/nodes:", err);
    res.status(500).json({ error: err.toString() });
  }
});

// Tạm thời cho /api/products dùng chung với nodes
// (để chatbot người ta gọi /api/products vẫn chạy được)
app.get("/api/products", async (req, res) => {
  try {
    const db = client.db("fruit_graph");
    const data = await db.collection("nodes").find({}).toArray();
    res.json(data);
  } catch (err) {
    console.error("Error /api/products:", err);
    res.status(500).json({ error: err.toString() });
  }
});

// Quan hệ (edges) nếu cần
app.get("/api/rels", async (req, res) => {
  try {
    const db = client.db("fruit_graph");
    const data = await db.collection("rels").find({}).toArray();
    res.json(data);
  } catch (err) {
    console.error("Error /api/rels:", err);
    res.status(500).json({ error: err.toString() });
  }
});

// ====== START SERVER ======
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("API running on port " + port);
});

