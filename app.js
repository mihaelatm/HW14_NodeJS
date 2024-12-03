import express from "express";
import connectDB from "./db/index.js";
import Category from "./models/Category.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

connectDB();

app.post("/categories", async (req, res) => {
  try {
    const { name } = req.body;

    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = new Category({ name });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Failed to create category" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
