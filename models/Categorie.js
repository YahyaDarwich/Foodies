const mongoose = require("mongoose");

const CategorieSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    collection: "categories",
  }
);

const Model = mongoose.model("Category", CategorieSchema);
module.exports = Model;
