// const express = require("express");
// const router = express.Router();
// const { getPets, addPet } = require("../controllers/petController");

// router.get("/", getPets);
// router.post("/", addPet);

// module.exports = router;



// const express = require("express");
// const router = express.Router();
// const upload = require("../middlewares/upload");       // 👈 add
// const { getPets, addPet } = require("../controllers/petController");

// router.get("/", getPets);
// // single image field name = "image"
// router.post("/", upload.single("image"), addPet);
//  

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const upload = require("../middlewares/upload"); // matches your folder
// const {
//   getPets,
//   addPet,
//   updatePet,
//   deletePet,
// } = require("../controllers/petController");


// router.post("/", upload.single("image"), addPet);
// router.get("/", getPets);
// router.put("/:id", upload.single("image"), updatePet);   // ← enable edit (with optional new image)
// router.delete("/:id", deletePet);                        // ← enable delete

// module.exports = router;


// routes/petRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const { getPets, addPet, updatePet, deletePet } = require("../controllers/petController");

router.post("/", upload.single("image"), addPet);
router.get("/", getPets);
router.put("/:id", upload.single("image"), updatePet);
router.delete("/:id", deletePet);

module.exports = router;

