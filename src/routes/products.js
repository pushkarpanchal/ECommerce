const express = require("express");
const routes = express.Router();
const multer = require("multer");
let mongoose = require("mongoose");
let ObjectId = mongoose.Types.ObjectId;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("file1", file);
    cb(null, "client/public/products");
  },
  filename: function (req, file, cb) {
    console.log("file", file);
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });
const { body, check, validationResult } = require("express-validator");

const Product = require("../models/Product");
const auth = require("../midleware/auth");

routes.post(
  "/add-product",
  auth,
  // [
  //   [
  //     check("title", "Title is require").not().isEmpty(),
  //     check("price", "Price is require").not().isEmpty(),
  //     check("roll", "roll is require").not().isEmpty(),
  //   ],
  // ],
  upload.single("productImage"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log("req.file", req.file);
    const { title, price, description, categories, type } = req.body;

    try {
      let product = new Product({
        title,
        price,
        description,
        categories,
        type,
        productImage: req.file,
      });

      const productData = await product.save();

      res.json(productData);
    } catch (error) {
      console.error("error", error.message);
      res.status(500).send({ msg: "Server errors" });
    }
  }
);

routes.get("/prodcutslist", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let query = {};
  if (req.query.search) {
    query.title = req.query.search;
  }
  if (req.query.type) {
    query.type = req.query.type;
  }
  try {
    const productData = await Product.find(query);
    res.json(productData);
  } catch (error) {
    console.error("error", error.message);
    res.status(500).send({ msg: "Server errors" });
  }
});

routes.delete("/deleteproduct/:id", async (req, res) => {
  const errors = validationResult(req);
  console.log("req.params.id", req.params.id, errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const productData = await Product.findOneAndRemove({
      _id: ObjectId(req.params.id),
    });
    res.json(productData);
  } catch (error) {
    console.error("error", error.message);
    res.status(500).send({ msg: "Server errors" });
  }
});

module.exports = routes;
