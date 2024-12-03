import express from "express";
import connectDB from "./db/index.js";
import Category from "./models/Category.js";
import Product from "./models/Product.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

connectDB();

app.post("/categories", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !price || !category) {
      return res
        .status(400)
        .json({ message: "All fields (name, price, category) are required" });
    }

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

app.post("/products", async (req, res) => {
  try {
    const { name, price, category } = req.body;

    if (!name || !price || !category) {
      return res
        .status(400)
        .json({ message: "Missing required fields: name, price, or category" });
    }

    const foundCategory = await Category.findOne({ name: category });

    if (!foundCategory) {
      return res.status(400).json({ message: "Category not found" });
    }

    const newProduct = new Product({
      name,
      price,
      category: foundCategory._id,
    });
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Failed to create product" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
