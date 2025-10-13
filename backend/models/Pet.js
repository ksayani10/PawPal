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
    isVaccinated: { type: Boolean, default: false },
    vaccinations: [{ type: String }],

    imageUrl: { type: String }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pet", petSchema);
