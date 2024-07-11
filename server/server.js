// server/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// MongoDB 연결 문자열 설정
const mongoURI = "mongodb://localhost:27017";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const Schema = mongoose.Schema;

const DataSchema = new Schema({
  title: String,
  content: String,
});

const Data = mongoose.model("Data", DataSchema);

app.post("/submit", async (req, res) => {
  const { title, content } = req.body;
  const newData = new Data({ title, content });
  try {
    await newData.save();
    res.status(200).send("Data saved successfully");
  } catch (error) {
    res.status(500).send("Failed to save data");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
