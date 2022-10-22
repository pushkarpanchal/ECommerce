const express = require("express");
const routes = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "client/public/products");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });
const { body, check, validationResult } = require("express-validator");

const Product = require("../models/Product");

routes.post(
  "/add-product",
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

    const { title, roll, price, type, descrption } = req.body;

    try {
      console.log("req", req.file);
      let product = new Product({
        title,
        roll,
        type,
        price,
        descrption,
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
  try {
    const productData = await Product.find({});
    res.json(productData);
  } catch (error) {
    console.error("error", error.message);
    res.status(500).send({ msg: "Server errors" });
  }
});

module.exports = routes;
