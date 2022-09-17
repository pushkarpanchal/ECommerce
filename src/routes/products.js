const express = require("express");
const routes = express.Router();
const { body, check, validationResult } = require("express-validator");

const Product = require("../models/Product");

routes.post(
  "/add-product",
  [
    [
      check("title", "Time is require").not().isEmpty(),
      check("price", "Price is require").not().isEmpty(),
      check("roll", "roll is require").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, roll, price, type, descrption } = req.body;

    try {
      console.log("req", req.user);
      let product = new Product({
        title,
        roll,
        type,
        price,
        descrption,
      });

      const productData = await product.save();

      res.json(productData);
    } catch (error) {
      console.error("error", error.message);
      res.status(500).send({ msg: "Server errors" });
    }
  }
);

module.exports = routes;
