const Article = require("../models/Article");

// List (with simple filters/pagination)
exports.listArticles = async (req, res) => {
  try {
    const { q = "", status, page = 1, limit = 10 } = req.query;
    const where = {};
    if (q) where.title = { $regex: q, $options: "i" };
    if (status) where.status = status;

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Article.find(where).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Article.countDocuments(where),
    ]);

    res.json({ items, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to fetch articles" });
  }
};

exports.getArticle = async (req, res) => {
  try {
    const item = await Article.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (e) {
    res.status(500).json({ message: "Error" });
  }
};

exports.createArticle = async (req, res) => {
  try {
    const body = req.body;
    const item = await Article.create(body);
    res.status(201).json(item);
  } catch (e) {
    res.status(400).json({ message: "Validation failed", error: e?.message });
  }
};

exports.updateArticle = async (req, res) => {
  try {
    const item = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (e) {
    res.status(400).json({ message: "Update failed", error: e?.message });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const item = await Article.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ message: "Delete failed", error: e?.message });
  }
};

// Optional: quick KPIs for Admin dashboard
exports.getAdminStats = async (_req, res) => {
  try {
    const ArticleCount = await Article.countDocuments();
    res.json({ ArticleCount });
  } catch {
    res.status(500).json({ message: "Stats failed" });
  }
};
