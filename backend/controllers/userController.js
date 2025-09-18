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




// const User = require("../models/user");
// const { signToken } = require("../utils/jwt"); // your file

// // --- Signup (no password hashing) ---
// exports.signup = async (req, res) => {
//   try {
//     const { name, email, password, role = "pet_seeker" } = req.body;
//     const exists = await User.findOne({ email });
//     if (exists) {
//       return res.status(400).json({ message: "Email already in use" });
//     }

//     // Save password directly (plain text ⚠️)
//     const user = await User.create({ name, email, password, role });

//     // You can skip token if you want to force manual login, but leaving it here:
//     const token = signToken(user);
//     res.status(201).json({
//       token,
//       user: {
//         id: user._id,
//         role: user.role,
//         email: user.email,
//         name: user.name,
//       },
//     });
//   } catch (e) {
//     console.error("Signup error:", e);
//     res.status(500).json({ message: "Signup error" });
//   }
// };

// // --- Login (plain password check) ---
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({ message: "Email and password required" });
//     }

//     // Find user
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // Compare plain text
//     if (password !== user.password) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const token = signToken(user);
//     res.json({
//       token,
//       user: {
//         id: user._id,
//         role: user.role,
//         email: user.email,
//         name: user.name,
//       },
//     });
//   } catch (e) {
//     console.error("Login error:", e);
//     res.status(500).json({ message: "Login error" });
//   }
// };


const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { signToken } = require("../utils/jwt");

const pickSafe = (u) => ({
  id: u._id,
  name: u.name,
  email: u.email,
  role: u.role,
  createdAt: u.createdAt,
});

/* POST /api/auth/signup  (Admin can also call this to create users) */
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role = "pet_seeker" } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "name, email, password are required" });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role });

    const token = signToken(user); // e.g., { sub: user._id, role: user.role }
    return res.status(201).json({ token, user: pickSafe(user) });
  } catch (e) {
    if (e.name === "ValidationError") {
      return res.status(400).json({ message: "Invalid user data" });
    }
    console.error("Signup error:", e);
    return res.status(500).json({ message: "Signup error" });
  }
};

/* POST /api/auth/login */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    // if you later set password: { select:false } in the schema, add .select("+password")
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    const token = signToken(user);
    return res.json({ token, user: pickSafe(user) });
  } catch (e) {
    console.error("Login error:", e);
    return res.status(500).json({ message: "Login error" });
  }
};

/* ========== Admin: user management ========== */

/* GET /api/auth/users */
exports.listUsers = async (req, res) => {
  const { q = "", role, sort } = req.query;
  const where = {};
  if (role) where.role = role; // must be one of the enum values

  let query = User.find(where).select("-password");
  if (sort === "name-desc") query = query.sort({ name: -1 });
  else if (sort === "added-asc") query = query.sort({ createdAt: 1 });
  else if (sort === "added-desc") query = query.sort({ createdAt: -1 });
  else query = query.sort({ name: 1 });

  const all = await query.lean();
  const needle = q.toLowerCase();
  const filtered = needle
    ? all.filter(u => [u.name, u.email, u.role].some(v => (v || "").toLowerCase().includes(needle)))
    : all;

  res.json(filtered);
};

/* GET /api/auth/users/:id */
exports.getUserById = async (req, res) => {
  const u = await User.findById(req.params.id).select("-password").lean();
  if (!u) return res.status(404).json({ message: "Not found" });
  res.json(u);
};

/* PUT /api/auth/users/:id  (hash password only if provided) */
exports.updateUser = async (req, res) => {
  try {
    const patch = { ...req.body };
    if (patch.password) patch.password = await bcrypt.hash(patch.password, 10);

    const u = await User.findByIdAndUpdate(req.params.id, patch, {
      new: true,
      runValidators: true,
    }).select("-password");
    if (!u) return res.status(404).json({ message: "Not found" });

    res.json(u);
  } catch (e) {
    if (e.code === 11000) return res.status(409).json({ message: "Email already exists" });
    if (e.name === "ValidationError") return res.status(400).json({ message: "Invalid user data" });
    console.error("Update user error:", e);
    res.status(500).json({ message: "Server error" });
  }
};

/* DELETE /api/auth/users/:id */
exports.deleteUser = async (_req, res) => {
  await User.findByIdAndDelete(_req.params.id);
  res.status(204).end();
};
