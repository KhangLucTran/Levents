const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  addressLine: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  region: {
    type: String,
    required: true,
    trim: true,
  },
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
