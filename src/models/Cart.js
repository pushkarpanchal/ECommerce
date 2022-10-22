const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
  productId: {
    type: mongoose.Types.ObjectId,
  },
  userId: {
    type: mongoose.Types.ObjectId,
  },
  quantity: {
    type: Number,
  },
  price: {
    type: Number,
  },
  totalPrice: {
    type: Number,
  },
});

module.exports = mongoose.model("cart", CartSchema);
