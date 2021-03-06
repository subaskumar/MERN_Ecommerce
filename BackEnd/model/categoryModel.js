const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categoryImage: { 
        type: String 
    },
    parentId: {
        type: String,
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);