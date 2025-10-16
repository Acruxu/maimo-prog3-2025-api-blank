import express from "express";
import mongoose from "mongoose";
import Category from "../models/category.js";

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const { name, slug } = req.body;
    const category = new Category({ name, slug });
    await category.save();

    return res.status(201).send({
      message: "Category creada correctamente",
      category,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Error en category",
      error,
    });
  }
});


router.get("/", async (_req, res) => {
  try {
    const categories = await Category.find().select("_id name slug");
    return res.status(200).send({
      message: "Todas las categories",
      categories,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Error en categories",
      error,
    });
  }
});


router.get("/:key/products", async (req, res) => {
  const { key } = req.params;

  try {

    const isId = mongoose.Types.ObjectId.isValid(key);

    const category = isId
      ? await Category.findById(key)
      : await Category.findOne({ slug: key });

    if (!category) {
      return res.status(404).send({
        message: "Category not found",
      });
    }


    const Product = (await import("../models/products.js")).default;

    const products = await Product.find({ categories: category._id })
      .select("_id name categories")
      .populate("categories", "name slug");

    return res.status(200).send({
      message: "Producto por categria",
      category: {
        _id: category._id,
        name: category.name,
        slug: category.slug,
      },
      products,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Error en category",
      error,
    });
  }
});

export default router;
