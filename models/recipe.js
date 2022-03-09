const { Schema, model } = require("mongoose");

const ModelSchema = new Schema(
  {
    userFirstName: {
      type: String,
      required: true,
    },
    userLastName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    ingredient: [
      {
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        unit: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    image: { type: Schema.Types.ObjectId, ref: "File" },
  },
  {
    collection: "recipes",
    timestamps: true,
  }
);

ModelSchema.pre(["find", "findOne"], function () {
  this.populate(["category","image"]);
});

ModelSchema.virtual("userName").get(function () {
  return this.userFirstName + " " + this.userLastName;
});

const Model = model("Recipe", ModelSchema);
module.exports = Model;
