// const mongoose = require("mongoose");

// const petSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   breed: String,
//   age: Number,
//   gender: String,
//   status: { type: String, default: "Available" }, // Available, Adopted
//   vaccinations: [String],
//   imageUrl: String,  
// });

// module.exports = mongoose.model("Pet", petSchema);


const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    breed: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    status: { type: String, enum: ["Available", "Pending", "Adopted"], default: "Available" },

    // optional: store a yes/no flag AND/OR a list of vaccinations
    isVaccinated: { type: Boolean, default: false },
    vaccinations: [{ type: String }],

    imageUrl: { type: String }, // e.g. /uploads/1723200123-luna.jpeg
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pet", petSchema);
