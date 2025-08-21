// const mongoose = require("mongoose");

// const articleSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true, trim: true },
//     excerpt: { type: String, default: "" },
//     content: { type: String, required: true },
//     tags: [{ type: String }],
//     author: { type: String, default: "Admin" },
//     status: { type: String, enum: ["draft", "published"], default: "draft" },
//     coverImageUrl: { type: String, default: "" },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Article", articleSchema);

// const mongoose = require("mongoose");

// const articleSchema = new mongoose.Schema(
//   {
//     code: { type: String, index: true },                // e.g. #86eec0 (short id)
//     title: { type: String, required: true, trim: true },// article title
//     category: { type: String, trim: true },             // Training, Health, Adoption…
//     status: { type: String, enum: ["Draft", "Pending", "Published"], default: "Draft" },
//     author: { type: String, trim: true },
//     genderTarget: { type: String },                      // optional (keep shape similar to pets)
//     ageTarget: { type: Number },                         // optional
//     imageUrl: { type: String },                          // /uploads/xyz.jpg
//     body: { type: String },                              // article content (rich text ok)
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Article", articleSchema);

// models/Article.js
const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    code: { type: String, index: true }, // e.g. #86eec0
    title: { type: String, required: true, trim: true },
    category: { type: String, trim: true }, // Training, Health, Adoption…
    status: {
      type: String,
      enum: ["Draft", "Pending", "Published"],
      default: "Draft",
      index: true
    },
    author: { type: String, trim: true },
    genderTarget: { type: String },
    ageTarget: { type: Number },
    imageUrl: { type: String }, // either uploaded (/uploads/xyz.jpg) or direct URL
    excerpt: { type: String, trim: true }, // optional short summary for list cards
    body: { type: String }, // markdown or rich text
    tags: { type: [String], default: [] }
  },
  { timestamps: true }
);

// Useful text index for q-search
articleSchema.index({ title: "text", excerpt: "text", body: "text", category: "text", author: "text", tags: 1 });

module.exports = mongoose.model("Article", articleSchema);
