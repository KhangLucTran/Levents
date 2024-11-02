const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  addressLine: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  region: {
    type: String,
    trim: true,
  },
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
