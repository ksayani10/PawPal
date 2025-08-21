

// // models/Article.js
// const mongoose = require("mongoose");

// const articleSchema = new mongoose.Schema(
//   {
//     code: { type: String, index: true }, // e.g. #86eec0
//     title: { type: String, required: true, trim: true },
//     category: { type: String, trim: true }, // Training, Health, Adoption…
//     status: {
//       type: String,
//       enum: ["Draft", "Pending", "Published"],
//       default: "Draft",
//       index: true
//     },
//     author: { type: String, trim: true },
//     genderTarget: { type: String },
//     ageTarget: { type: Number },
//     imageUrl: { type: String }, // either uploaded (/uploads/xyz.jpg) or direct URL
//     excerpt: { type: String, trim: true }, // optional short summary for list cards
//     body: { type: String }, // markdown or rich text
//     tags: { type: [String], default: [] }
//   },
//   { timestamps: true }
// );

// // Useful text index for q-search
// articleSchema.index({ title: "text", excerpt: "text", body: "text", category: "text", author: "text", tags: 1 });

// module.exports = mongoose.model("Article", articleSchema);

// const mongoose = require("mongoose");

// const articleSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     body: { type: String, required: true },
//     status: { type: String, enum: ["draft", "published"], default: "published" },
//     authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Article", articleSchema);

const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: String, required: true },
    status: { type: String, enum: ["Draft", "Published"], default: "Draft" },
    content: { type: String, required: true },
    image: { type: String }, // store uploaded image path or URL
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);
