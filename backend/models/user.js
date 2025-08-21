// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const ROLES = ['pet_seeker', 'shelter', 'vet', 'admin', 'owner'];

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email:{ type:String, required:true, unique:true },
//   password:{ type:String, required:true },
// //   role:{ type:String, enum:ROLES, default:'pet_seeker', index:true }
// // }, 
//   role:{type:String ,enum :["user","shelter","admin"],default:"user"},
// },

// { timestamps:true });

// userSchema.pre('save', async function(next){
//   if(!this.isModified('password')) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// userSchema.methods.matchPassword = function(entered){
//   return bcrypt.compare(entered, this.password);
// };

// module.exports = mongoose.model('User', userSchema);
// module.exports.ROLES = ROLES;


// AFTER (testing only — NOT for production)
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    // keep select:true so login can read it without .select('+password')
    password: { type: String, required: true }, 
    role: { type: String, enum: ["admin", "shelter", "vet", "pet_seeker"], default: "pet_seeker" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
