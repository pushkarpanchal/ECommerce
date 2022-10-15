const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  roll: {
    type: String,
    required: false,
  },
  productImage: {
    type: Object,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: false,
  },
  categories: {
    type: Array,
    default: ["nosell"],
  },
});

module.exports = mongoose.model("product", ProductSchema);
