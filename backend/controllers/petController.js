// const Pet = require("../models/Pet");

// // GET all pets
// const getPets = async (req, res) => {
//   const pets = await Pet.find();
//   res.json(pets);
// };

// // POST add pet
// const addPet = async (req, res) => {
//   const newPet = new Pet(req.body);
//   await newPet.save();
//   res.status(201).json(newPet);
// };

// module.exports = { getPets, addPet };


// const Pet = require("../models/Pet");

// // GET all pets
// const getPets = async (req, res) => {
//   const pets = await Pet.find().sort({ createdAt: -1 });
//   res.json(pets);
// };

// // POST add pet  (multipart/form-data with field "image")
// const addPet = async (req, res) => {
//   const body = { ...req.body };

//   if (req.file) {
//     // public URL to the file
//     body.imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
//   }

//   const newPet = await Pet.create(body);
//   res.status(201).json(newPet);
// };

// module.exports = { getPets, addPet };


// const Pet = require("../models/Pet");

// // GET /api/pets
// const getPets = async (req, res) => {
//   try {
//     const pets = await Pet.find().sort({ createdAt: -1 });
//     res.json(pets);
//   } catch (err) {
//     console.error("getPets error:", err);
//     res.status(500).json({ message: "Failed to load pets" });
//   }
// };

// // POST /api/pets  (multipart/form-data)
// const addPet = async (req, res) => {
//   try {
//     const {
//       name,
//       breed,
//       age,
//       gender,
//       status,
//       vaccinations,   // can be "rabies,parvo" or ["rabies","parvo"]
//       isVaccinated,   // "yes"/"no" or true/false
//     } = req.body;

//     // vaccinations: normalize to string[]
//     let vaccinationList = [];
//     if (Array.isArray(vaccinations)) {
//       vaccinationList = vaccinations.map(v => String(v).trim()).filter(Boolean);
//     } else if (typeof vaccinations === "string" && vaccinations.trim() !== "") {
//       vaccinationList = vaccinations.split(",").map(v => v.trim()).filter(Boolean);
//     }

//     const vaccinatedFlag =
//       isVaccinated === true ||
//       isVaccinated === "true" ||
//       isVaccinated === "yes";

//     // image
//     const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

//     const newPet = new Pet({
//       name,
//       breed,
//       age: Number(age),
//       gender,
//       status,
//       vaccinations: vaccinationList,
//       isVaccinated: vaccinatedFlag,
//       imageUrl,
//     });

//     await newPet.save();
//     res.status(201).json(newPet);
//   } catch (err) {
//     console.error("addPet error:", err);
//     res.status(500).json({ message: "Create failed" });
//   }
// };

// module.exports = { getPets, addPet };


// controllers/petController.js
const fs = require("fs");
const path = require("path");
const Pet = require("../models/Pet");

const unlinkIfExists = (relPath) => {
  try {
    if (!relPath) return;
    const abs = path.join(__dirname, "..", relPath);
    if (fs.existsSync(abs)) fs.unlinkSync(abs);
  } catch (e) {
    console.warn("File delete failed:", e.message);
  }
};

// GET /api/pets
const getPets = async (req, res) => {
  try {
    const pets = await Pet.find().sort({ createdAt: -1 });
    res.json(pets);
  } catch (err) {
    console.error("getPets error:", err);
    res.status(500).json({ message: "Failed to load pets" });
  }
};

// POST /api/pets  (multipart/form-data with field "image")
const addPet = async (req, res) => {
  try {
    const {
      name,
      breed,
      age,
      gender,
      status,
      vaccinations,
      isVaccinated,
    } = req.body;

    // normalize vaccinations -> string[]
    let vaccinationList = [];
    if (Array.isArray(vaccinations)) {
      vaccinationList = vaccinations.map((v) => String(v).trim()).filter(Boolean);
    } else if (typeof vaccinations === "string" && vaccinations.trim() !== "") {
      vaccinationList = vaccinations.split(",").map((v) => v.trim()).filter(Boolean);
    }

    const vaccinatedFlag =
      isVaccinated === true ||
      isVaccinated === "true" ||
      isVaccinated === "yes" ||
      isVaccinated === 1 ||
      isVaccinated === "1";

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

    const newPet = new Pet({
      name,
      breed,
      age: age ? Number(age) : undefined,
      gender,
      status,
      vaccinations: vaccinationList,
      isVaccinated: vaccinatedFlag,
      imageUrl,
    });

    await newPet.save();
    res.status(201).json(newPet);
  } catch (err) {
    console.error("addPet error:", err);
    res.status(500).json({ message: "Create failed" });
  }
};

// PUT /api/pets/:id  (multipart/form-data with optional "image")
const updatePet = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await Pet.findById(id);
    if (!pet) return res.status(404).json({ message: "Pet not found" });

    const {
      name,
      breed,
      age,
      gender,
      status,
      vaccinations,
      isVaccinated,
    } = req.body;

    // build updates
    if (name !== undefined) pet.name = name;
    if (breed !== undefined) pet.breed = breed;
    if (age !== undefined && age !== "") pet.age = Number(age);
    if (gender !== undefined) pet.gender = gender;
    if (status !== undefined) pet.status = status;

    // normalize vaccinations
    if (vaccinations !== undefined) {
      if (Array.isArray(vaccinations)) {
        pet.vaccinations = vaccinations.map((v) => String(v).trim()).filter(Boolean);
      } else if (typeof vaccinations === "string") {
        pet.vaccinations = vaccinations
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean);
      } else {
        pet.vaccinations = [];
      }
    }

    if (isVaccinated !== undefined) {
      pet.isVaccinated =
        isVaccinated === true ||
        isVaccinated === "true" ||
        isVaccinated === "yes" ||
        isVaccinated === 1 ||
        isVaccinated === "1";
    }

    // handle new image
    if (req.file) {
      // remove old image file if existed
      if (pet.imageUrl && pet.imageUrl.startsWith("/uploads/")) {
        unlinkIfExists(pet.imageUrl);
      }
      pet.imageUrl = `/uploads/${req.file.filename}`;
    }

    await pet.save();
    res.json(pet);
  } catch (err) {
    console.error("updatePet error:", err);
    res.status(500).json({ message: "Update failed" });
  }
};

// DELETE /api/pets/:id
const deletePet = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await Pet.findById(id);
    if (!pet) return res.status(404).json({ message: "Pet not found" });

    // delete image file if present
    if (pet.imageUrl && pet.imageUrl.startsWith("/uploads/")) {
      unlinkIfExists(pet.imageUrl);
    }

    await pet.deleteOne();
    res.json({ message: "Pet deleted" });
  } catch (err) {
    console.error("deletePet error:", err);
    res.status(500).json({ message: "Delete failed" });
  }
};

module.exports = { getPets, addPet, updatePet, deletePet };
