const express = require("express");
const { requireAuth, requireRole } = require("../middlewares/auth");
const ctrl = require("../controllers/articleController");

const router = express.Router();

router.use(requireAuth, requireRole(["admin"])); // protect all routes below

router.get("/stats", ctrl.getAdminStats);
router.get("/", ctrl.listArticles);
router.get("/:id", ctrl.getArticle);
router.post("/", ctrl.createArticle);
router.put("/:id", ctrl.updateArticle);
router.delete("/:id", ctrl.deleteArticle);

module.exports = router;
