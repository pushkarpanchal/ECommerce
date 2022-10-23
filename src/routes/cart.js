const express = require("express");
const routes = express.Router();
let mongoose = require("mongoose");
const Cart = require("../models/Cart");
const { body, check, params, validationResult } = require("express-validator");
const auth = require("../midleware/auth");

let Schema = mongoose.Types,
  ObjectId = Schema.ObjectId;
routes.post(
  "/add-to-cart",
  auth,
  [
    [
      check("productId", "Product id is require").not().isEmpty(),
      check("quantity", "Quantity is require").not().isEmpty(),
      check("price", "Price is require").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { productId, quantity, price } = req.body;
    const userId = req.user._id;

    const itemAvail = await Cart.findOne({
      productId: ObjectId(productId),
      userId: ObjectId(userId),
    });
    if (itemAvail) {
      const updatedquatity = itemAvail.quantity + quantity;
      if (updatedquatity === 0 || quantity === 0) {
        const cartData = await Cart.findOne({
          productId: ObjectId(productId),
          userId: ObjectId(userId),
        });
        if (cartData) {
          const removeData = removeItemFromCart(cartData._id);
          res.json(removeData);
        }
      } else {
        itemAvail.quantity += quantity;
        itemAvail.totalPrice += price * quantity;
        const updatedCart = await Cart.findByIdAndUpdate(
          itemAvail._id,
          itemAvail,
          { new: true }
        );
        res.json(updatedCart);
      }
    } else {
      try {
        let addToCart = new Cart({
          productId: ObjectId(productId),
          quantity,
          price,
          userId: ObjectId(userId),
          totalPrice: price * quantity,
        });

        const cartData = await addToCart.save();

        res.json(cartData);
      } catch (error) {
        console.error("error", error.message);
        res.status(500).send({ msg: "Server errors" });
      }
    }
  }
);

routes.get("/cart-items", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const cartData = await Cart.aggregate([
      { $match: { userId: ObjectId(req.user._id) } },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "productData",
        },
      },
      {
        $unwind: {
          path: "$productData",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);
    res.json(cartData);
  } catch (error) {
    console.error("error", error.message);
    res.status(500).send({ msg: "Server errors" });
  }
});

// routes.delete("/remove-cart-item/:id", auth, async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   try {
//     const cartData = await Cart.findById({ _id: ObjectId(req.params.id) });
//     if (cartData) {
//       removeItemFromCart(cartData._id);
//     } else {
//       res.status(500).send({ msg: "Item not found." });
//     }
//     res.json(cartData);
//   } catch (error) {
//     console.error("error", error.message);
//     res.status(500).send({ msg: "Server errors" });
//   }
// });

const removeItemFromCart = async (itemId) => {
  const removed = await Cart.deleteOne({ _id: itemId });
  return removed;
};

module.exports = routes;
