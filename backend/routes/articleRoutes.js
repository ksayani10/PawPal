
// // routes/articleRoutes.js
// const express = require("express");
// const router = express.Router();
// const ctrl = require("../controllers/articleController");
// const upload = require("../middlewares/upload");
// const { requireAuth, requireRole } = require("../middlewares/auth");

// // Public list
// router.get("/", ctrl.listArticles);

// // Admin-only below (uncomment when you’re ready)
//  router.use(requireAuth, requireRole(["admin"]));

// router.post("/", upload.single("image"), ctrl.createArticle);
// router.put("/:id", upload.single("image"), ctrl.updateArticle);
// router.delete("/:id", ctrl.deleteArticle);

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const { requireAuth, requireRole } = require("../middlewares/auth"); // ✅ correct
// const ctrl = require("../controllers/articleController");

// // Public list (if you want it public, remove the guard for GET /)
// router.get("/", ctrl.listArticles);

// // Protected admin routes (everything below requires admin)
// router.use(requireAuth, requireRole(["admin"]));
// router.get("/stats", ctrl.getAdminStats);
// router.get("/:id", ctrl.getArticle);
// router.post("/", ctrl.createArticle);
// router.put("/:id", ctrl.updateArticle);
// router.delete("/:id", ctrl.deleteArticle);

// module.exports = router;

const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload"); // multer middleware
const articleCtrl = require("../controllers/articleController");

// Public
router.get("/", articleCtrl.getArticles);
router.get("/:id", articleCtrl.getArticleById);

// Admin (protected if you add requireAuth/requireRole later)
router.post("/", upload.single("image"), articleCtrl.createArticle);
router.put("/:id", upload.single("image"), articleCtrl.updateArticle);
router.delete("/:id", articleCtrl.deleteArticle);

module.exports = router;
