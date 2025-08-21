
// // controllers/articleController.js
// const Article = require("../models/Article");

// // tiny id helper
// const shortid = () => Math.random().toString(16).slice(2, 8);

// // escape user input for safe regex
// const escapeRegex = (s = "") => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// // GET /api/articles?q=&status=&sort=&page=&limit=
// exports.listArticles = async (req, res, next) => {
//   try {
//     const {
//       q = "",
//       status = "All",
//       sort = "createdAt-desc",
//       page = 1,
//       limit = 20
//     } = req.query;

//     // filter
//     const where = {};
//     if (q) {
//       const rx = new RegExp(escapeRegex(q), "i");
//       where.$or = [
//         { title: rx },
//         { category: rx },
//         { author: rx },
//         { excerpt: rx },
//         { body: rx },
//         { tags: { $in: q.split(",").map(s => s.trim()).filter(Boolean) } }
//       ];
//     }
//     if (status !== "All") where.status = status;

//     // sort
//     const sortMap = {
//       "title-asc": { title: 1 },
//       "title-desc": { title: -1 },
//       "createdAt-asc": { createdAt: 1 },
//       "createdAt-desc": { createdAt: -1 },
//       "added-asc": { createdAt: 1 },
//       "added-desc": { createdAt: -1 },
//       "updatedAt-desc": { updatedAt: -1 }
//     };
//     const sortObj = sortMap[sort] || sortMap["createdAt-desc"];

//     // pagination
//     const perPage = Math.max(1, Number(limit));
//     const currentPage = Math.max(1, Number(page));
//     const skip = (currentPage - 1) * perPage;

//     const [items, total] = await Promise.all([
//       Article.find(where).sort(sortObj).skip(skip).limit(perPage).lean(),
//       Article.countDocuments(where)
//     ]);

//     res.json({
//       items,
//       total,
//       page: currentPage,
//       pages: Math.ceil(total / perPage)
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// // POST /api/articles (supports multipart upload or JSON body)
// exports.createArticle = async (req, res, next) => {
//   try {
//     const payload = { ...req.body };

//     if (!payload.title) return res.status(400).json({ message: "Title is required" });

//     payload.code = payload.code || `#${shortid()}`;

//     // If you sent multipart/form-data with field name "image"
//     if (req.file) payload.imageUrl = `/uploads/${req.file.filename}`;

//     // Normalize tags when provided as "tag1, tag2"
//     if (typeof payload.tags === "string") {
//       payload.tags = payload.tags
//         .split(",")
//         .map(s => s.trim())
//         .filter(Boolean);
//     }

//     const created = await Article.create(payload);
//     res.status(201).json(created);
//   } catch (err) {
//     next(err);
//   }
// };

// // PUT /api/articles/:id
// exports.updateArticle = async (req, res, next) => {
//   try {
//     const payload = { ...req.body };
//     if (req.file) payload.imageUrl = `/uploads/${req.file.filename}`;

//     if (typeof payload.tags === "string") {
//       payload.tags = payload.tags
//         .split(",")
//         .map(s => s.trim())
//         .filter(Boolean);
//     }

//     const updated = await Article.findByIdAndUpdate(req.params.id, payload, {
//       new: true
//     }).lean();

//     if (!updated) return res.status(404).json({ message: "Article not found" });

//     res.json(updated);
//   } catch (err) {
//     next(err);
//   }
// };

// // DELETE /api/articles/:id
// exports.deleteArticle = async (req, res, next) => {
//   try {
//     const found = await Article.findByIdAndDelete(req.params.id);
//     if (!found) return res.status(404).json({ message: "Article not found" });
//     res.json({ ok: true });
//   } catch (err) {
//     next(err);
//   }
// };

// const Article = require("../models/Article");

// exports.listArticles = async (req, res) => {
//   try {
//     const q = {};
//     if (req.query.status) q.status = req.query.status;
//     const items = await Article.find(q).sort({ createdAt: -1 });
//     res.json(items);
//   } catch (err) {
//     console.error("listArticles error:", err);
//     res.status(500).json({ message: "Failed to load articles" });
//   }
// };

// exports.getArticle = async (req, res) => {
//   try {
//     const item = await Article.findById(req.params.id);
//     if (!item) return res.status(404).json({ message: "Not found" });
//     res.json(item);
//   } catch (err) {
//     console.error("getArticle error:", err);
//     res.status(500).json({ message: "Failed to get article" });
//   }
// };

// // stub the rest so routes don’t 500 if hit accidentally
// exports.createArticle = async (req, res) => {
//   try {
//     const doc = await Article.create(req.body);
//     res.status(201).json(doc);
//   } catch (err) {
//     console.error("createArticle error:", err);
//     res.status(400).json({ message: "Invalid payload" });
//   }
// };

// exports.updateArticle = async (req, res) => {
//   try {
//     const doc = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!doc) return res.status(404).json({ message: "Not found" });
//     res.json(doc);
//   } catch (err) {
//     console.error("updateArticle error:", err);
//     res.status(400).json({ message: "Update failed" });
//   }
// };

// exports.deleteArticle = async (req, res) => {
//   try {
//     const doc = await Article.findByIdAndDelete(req.params.id);
//     if (!doc) return res.status(404).json({ message: "Not found" });
//     res.json({ ok: true });
//   } catch (err) {
//     console.error("deleteArticle error:", err);
//     res.status(400).json({ message: "Delete failed" });
//   }
// };

// exports.getAdminStats = async (_req, res) => {
//   try {
//     const total = await Article.countDocuments();
//     res.json({ total });
//   } catch (err) {
//     console.error("getAdminStats error:", err);
//     res.status(500).json({ message: "Failed to load stats" });
//   }
// };


const Article = require("../models/Article");

// Create new article
// exports.createArticle = async (req, res) => {
//   try {
//     const { title, category, author, status, content } = req.body;
//     const image = req.file ? `/uploads/${req.file.filename}` : null;

//     const article = new Article({
//       title,
//       category,
//       author,
//       status,
//       content:content || body,
//       image,
//     });

//     await article.save();
//     res.status(201).json(article);
//   } catch (err) {
//     console.error("Error creating article:", err);
//     res.status(500).json({ message: "Server error creating article" });
//   }
// };


exports.createArticle = async (req, res) => {
  try {
    const { title, category, author, status, content, imageUrl } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : imageUrl || null;

    const article = await Article.create({ title, category, author, status, content, image });
    res.status(201).json(article);
  } catch (err) {
    console.error("createArticle error:", err);
    res.status(500).json({ message: "Server error creating article" });
  }
};


// Get all articles
exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: "Server error fetching articles" });
  }
};

// Get single article
exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: "Server error fetching article" });
  }
};

// Update article
// exports.updateArticle = async (req, res) => {
//   try {
//     const { title, category, author, status, content } = req.body;
//     const updateData = { title, category, author, status, content };

//     if (req.file) {
//       updateData.image = `/uploads/${req.file.filename}`;
//     }

//     const updated = await Article.findByIdAndUpdate(req.params.id, updateData, { new: true });
//     if (!updated) return res.status(404).json({ message: "Article not found" });

//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: "Server error updating article" });
//   }
// };


exports.updateArticle = async (req, res) => {
  try {
    const { title, category, author, status, content, imageUrl } = req.body;
    const update = { title, category, author, status, content };
    if (req.file) update.image = `/uploads/${req.file.filename}`;
    else if (imageUrl) update.image = imageUrl;

    const doc = await Article.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json(doc);
  } catch (err) {
    console.error("updateArticle error:", err);
    res.status(500).json({ message: "Server error updating article" });
  }
};


// Delete article
exports.deleteArticle = async (req, res) => {
  try {
    const deleted = await Article.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Article not found" });

    res.json({ message: "Article deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error deleting article" });
  }
};
