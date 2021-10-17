const Mongoose = require("mongoose");

const planSchema = new Mongoose.Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  delivery: {
    type: Boolean,
    required: true,
  },
  meals: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
