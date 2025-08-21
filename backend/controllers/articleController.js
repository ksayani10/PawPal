// const Article = require("../models/Article");

// // List (with simple filters/pagination)
// exports.listArticles = async (req, res) => {
//   try {
//     const { q = "", status, page = 1, limit = 10 } = req.query;
//     const where = {};
//     if (q) where.title = { $regex: q, $options: "i" };
//     if (status) where.status = status;

//     const skip = (Number(page) - 1) * Number(limit);
//     const [items, total] = await Promise.all([
//       Article.find(where).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
//       Article.countDocuments(where),
//     ]);

//     res.json({ items, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ message: "Failed to fetch articles" });
//   }
// };

// exports.getArticle = async (req, res) => {
//   try {
//     const item = await Article.findById(req.params.id);
//     if (!item) return res.status(404).json({ message: "Not found" });
//     res.json(item);
//   } catch (e) {
//     res.status(500).json({ message: "Error" });
//   }
// };

// exports.createArticle = async (req, res) => {
//   try {
//     const body = req.body;
//     const item = await Article.create(body);
//     res.status(201).json(item);
//   } catch (e) {
//     res.status(400).json({ message: "Validation failed", error: e?.message });
//   }
// };

// exports.updateArticle = async (req, res) => {
//   try {
//     const item = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!item) return res.status(404).json({ message: "Not found" });
//     res.json(item);
//   } catch (e) {
//     res.status(400).json({ message: "Update failed", error: e?.message });
//   }
// };

// exports.deleteArticle = async (req, res) => {
//   try {
//     const item = await Article.findByIdAndDelete(req.params.id);
//     if (!item) return res.status(404).json({ message: "Not found" });
//     res.json({ ok: true });
//   } catch (e) {
//     res.status(400).json({ message: "Delete failed", error: e?.message });
//   }
// };

// // Optional: quick KPIs for Admin dashboard
// exports.getAdminStats = async (_req, res) => {
//   try {
//     const ArticleCount = await Article.countDocuments();
//     res.json({ ArticleCount });
//   } catch {
//     res.status(500).json({ message: "Stats failed" });
//   }
// };

// const Article = require("../models/Article");
// const shortid = () => Math.random().toString(16).slice(2, 8); // tiny helper

// // GET /api/articles?q=&status=&sort=
// exports.listArticles = async (req, res) => {
//   const { q = "", status = "All", sort = "title-asc" } = req.query;

//   const where = {};
//   if (q) {
//     where.$or = [
//       { title: new RegExp(q, "i") },
//       { category: new RegExp(q, "i") },
//       { author: new RegExp(q, "i") },
//     ];
//   }
//   if (status !== "All") where.status = status;

//   const sortMap = {
//     "title-asc": { title: 1 },
//     "title-desc": { title: -1 },
//     "added-desc": { createdAt: -1 },
//     "added-asc": { createdAt: 1 },
//   };

//   const items = await Article.find(where).sort(sortMap[sort] || sortMap["title-asc"]);
//   res.json(items);
// };

// // POST /api/articles  (supports image upload)
// exports.createArticle = async (req, res) => {
//   const payload = { ...req.body };
//   if (!payload.title) return res.status(400).json({ message: "Title is required" });

//   payload.code = `#${shortid()}`;
//   if (req.file) payload.imageUrl = `/uploads/${req.file.filename}`;

//   const created = await Article.create(payload);
//   res.status(201).json(created);
// };

// // PUT /api/articles/:id
// exports.updateArticle = async (req, res) => {
//   const payload = { ...req.body };
//   if (req.file) payload.imageUrl = `/uploads/${req.file.filename}`;

//   const updated = await Article.findByIdAndUpdate(req.params.id, payload, { new: true });
//   res.json(updated);
// };

// // DELETE /api/articles/:id
// exports.deleteArticle = async (req, res) => {
//   await Article.findByIdAndDelete(req.params.id);
//   res.json({ ok: true });
// };

// controllers/articleController.js
const Article = require("../models/Article");

// tiny id helper
const shortid = () => Math.random().toString(16).slice(2, 8);

// escape user input for safe regex
const escapeRegex = (s = "") => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// GET /api/articles?q=&status=&sort=&page=&limit=
exports.listArticles = async (req, res, next) => {
  try {
    const {
      q = "",
      status = "All",
      sort = "createdAt-desc",
      page = 1,
      limit = 20
    } = req.query;

    // filter
    const where = {};
    if (q) {
      const rx = new RegExp(escapeRegex(q), "i");
      where.$or = [
        { title: rx },
        { category: rx },
        { author: rx },
        { excerpt: rx },
        { body: rx },
        { tags: { $in: q.split(",").map(s => s.trim()).filter(Boolean) } }
      ];
    }
    if (status !== "All") where.status = status;

    // sort
    const sortMap = {
      "title-asc": { title: 1 },
      "title-desc": { title: -1 },
      "createdAt-asc": { createdAt: 1 },
      "createdAt-desc": { createdAt: -1 },
      "added-asc": { createdAt: 1 },
      "added-desc": { createdAt: -1 },
      "updatedAt-desc": { updatedAt: -1 }
    };
    const sortObj = sortMap[sort] || sortMap["createdAt-desc"];

    // pagination
    const perPage = Math.max(1, Number(limit));
    const currentPage = Math.max(1, Number(page));
    const skip = (currentPage - 1) * perPage;

    const [items, total] = await Promise.all([
      Article.find(where).sort(sortObj).skip(skip).limit(perPage).lean(),
      Article.countDocuments(where)
    ]);

    res.json({
      items,
      total,
      page: currentPage,
      pages: Math.ceil(total / perPage)
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/articles (supports multipart upload or JSON body)
exports.createArticle = async (req, res, next) => {
  try {
    const payload = { ...req.body };

    if (!payload.title) return res.status(400).json({ message: "Title is required" });

    payload.code = payload.code || `#${shortid()}`;

    // If you sent multipart/form-data with field name "image"
    if (req.file) payload.imageUrl = `/uploads/${req.file.filename}`;

    // Normalize tags when provided as "tag1, tag2"
    if (typeof payload.tags === "string") {
      payload.tags = payload.tags
        .split(",")
        .map(s => s.trim())
        .filter(Boolean);
    }

    const created = await Article.create(payload);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

// PUT /api/articles/:id
exports.updateArticle = async (req, res, next) => {
  try {
    const payload = { ...req.body };
    if (req.file) payload.imageUrl = `/uploads/${req.file.filename}`;

    if (typeof payload.tags === "string") {
      payload.tags = payload.tags
        .split(",")
        .map(s => s.trim())
        .filter(Boolean);
    }

    const updated = await Article.findByIdAndUpdate(req.params.id, payload, {
      new: true
    }).lean();

    if (!updated) return res.status(404).json({ message: "Article not found" });

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/articles/:id
exports.deleteArticle = async (req, res, next) => {
  try {
    const found = await Article.findByIdAndDelete(req.params.id);
    if (!found) return res.status(404).json({ message: "Article not found" });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};
