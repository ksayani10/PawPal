const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    excerpt: { type: String, default: "" },
    content: { type: String, required: true },
    tags: [{ type: String }],
    author: { type: String, default: "Admin" },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    coverImageUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);
