const mongoose = require("mongoose");

const imgSchema = new mongoose.Schema({
  file: String
});

const ImgModel = mongoose.model("img", imgSchema);

module.exports = ImgModel;
