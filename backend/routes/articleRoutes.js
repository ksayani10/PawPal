// const express = require("express");
// const { requireAuth, requireRole } = require("../middlewares/auth");
// const ctrl = require("../controllers/articleController");

// const router = express.Router();

// router.use(requireAuth, requireRole(["admin"])); // protect all routes below

// router.get("/stats", ctrl.getAdminStats);
// router.get("/", ctrl.listArticles);
// router.get("/:id", ctrl.getArticle);
// router.post("/", ctrl.createArticle);
// router.put("/:id", ctrl.updateArticle);
// router.delete("/:id", ctrl.deleteArticle);

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const upload = require("../middlewares/upload");
// const ctrl = require("../controllers/articleController");
// // const { requireAuth, requireRole } = require("../middlewares/auth"); // if you gate admin

// // router.use(requireAuth, requireRole(["admin"]));

// router.get("/", ctrl.listArticles);
// router.post("/", upload.single("image"), ctrl.createArticle);
// router.put("/:id", upload.single("image"), ctrl.updateArticle);
// router.delete("/:id", ctrl.deleteArticle);

// module.exports = router;


// routes/articleRoutes.js
const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/articleController");
const upload = require("../middlewares/upload");
// const { requireAuth, requireRole } = require("../middlewares/auth");

// Public list
router.get("/", ctrl.listArticles);

// Admin-only below (uncomment when you’re ready)
// router.use(requireAuth, requireRole(["admin"]));

router.post("/", upload.single("image"), ctrl.createArticle);
router.put("/:id", upload.single("image"), ctrl.updateArticle);
router.delete("/:id", ctrl.deleteArticle);

module.exports = router;
