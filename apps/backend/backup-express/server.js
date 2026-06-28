const express = require("express");
const cors = require("cors");
const crypto = require("crypto");

const app = express();

app.use(cors());
app.use(express.json());

let keys = [];

function generateKey(name) {
  const random = crypto.randomBytes(16).toString("hex");
  return `kvrat_${name.toLowerCase().replace(/\s+/g, "_")}_${random}`;
}

app.post("/generate-key", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "name required" });
  }

  const newKey = {
    name,
    key: generateKey(name),
    createdAt: new Date().toISOString(),
  };

  keys.unshift(newKey);

  res.json(newKey);
});

app.get("/keys", (req, res) => {
  res.json(keys);
});

app.delete("/keys/:key", (req, res) => {
  keys = keys.filter(k => k.key !== req.params.key);
  res.json({ success: true });
});

app.listen(3001, () => {
  console.log("Backend running on http://localhost:3001");
});
