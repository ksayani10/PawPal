// // backend/controllers/userController.js
// const User = require('../models/user');          // match your file casing
// const { signToken } = require('../utils/jwt');
// const bcrypt = require('bcryptjs');

// exports.signup = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body || {};
//     if (!name || !email || !password) {
//       return res.status(400).json({ message: 'Missing fields' });
//     }

//     const exists = await User.findOne({ email });
//     if (exists) return res.status(409).json({ message: 'Email already in use' });

//     const user = await User.create({ name, email, password, role: role || 'pet_seeker' });
//     const token = signToken(user);

//     return res.status(201).json({
//       code: 201,
//       user: { id: user._id, name: user.name, email: user.email, role: user.role },
//       token,
//     });
//   } catch (e) {
//     console.error('SIGNUP_ERROR:', e);
//     return res.status(500).json({ message: 'Signup failed' });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body || {};
//     if (!email || !password) {
//       return res.status(400).json({ message: 'Missing email or password' });
//     }

//     const user = await User.findOne({ email });
//     if (!user) return res.status(401).json({ message: 'Invalid credentials' });

//     const ok = typeof user.matchPassword === 'function'
//       ? await user.matchPassword(password)
//       : await bcrypt.compare(password, user.password);

//     if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

//     const token = signToken(user); // needs JWT_SECRET in .env
//     return res.json({
//       code: 200,
//       user: { id: user._id, name: user.name, email: user.email, role: user.role },
//       token,
//     });
//   } catch (e) {
//     console.error('LOGIN_ERROR:', e);
//     return res.status(500).json({ message: 'Login failed' });
//   }
// };

// controllers/authController.js
// const User = require("../models/user");
// const { signToken } = require("../utils/jwt"); // your file
// const bcrypt = require("bcryptjs");

// exports.signup = async (req, res) => {
//   try {
//     const { name, email, password, role = "pet_seeker" } = req.body;
//     const exists = await User.findOne({ email });
//     if (exists) return res.status(400).json({ message: "Email already in use" });

//     const hash = await bcrypt.hash(password, 10);
//     const user = await User.create({ name, email, password: hash, role });

//     const token = signToken(user);
//     res.status(201).json({
//       token,
//       user: { id: user._id, role: user.role, email: user.email, name: user.name },
//     });
//   } catch (e) {
//     res.status(500).json({ message: "Signup error" });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email }).select("+password");
//     if (!user) return res.status(400).json({ message: "Invalid credentials" });

//     const ok = await bcrypt.compare(password, user.password);
//     if (!ok) return res.status(400).json({ message: "Invalid credentials" });

//     const token = signToken(user);
//     res.json({
//       token,
//       user: { id: user._id, role: user.role, email: user.email, name: user.name },
//     });
//   } catch (e) {
//     res.status(500).json({ message: "Login error" });
//   }
// };


const User = require("../models/user");
const { signToken } = require("../utils/jwt"); // your file

// --- Signup (no password hashing) ---
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role = "pet_seeker" } = req.body;
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Save password directly (plain text ⚠️)
    const user = await User.create({ name, email, password, role });

    // You can skip token if you want to force manual login, but leaving it here:
    const token = signToken(user);
    res.status(201).json({
      token,
      user: {
        id: user._id,
        role: user.role,
        email: user.email,
        name: user.name,
      },
    });
  } catch (e) {
    console.error("Signup error:", e);
    res.status(500).json({ message: "Signup error" });
  }
};

// --- Login (plain password check) ---
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare plain text
    if (password !== user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = signToken(user);
    res.json({
      token,
      user: {
        id: user._id,
        role: user.role,
        email: user.email,
        name: user.name,
      },
    });
  } catch (e) {
    console.error("Login error:", e);
    res.status(500).json({ message: "Login error" });
  }
};
