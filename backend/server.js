const express = require("express");
const app = express();
const connectDB = require("./config/connectDB");
 const cors = require("cors");

const dotenv = require("dotenv").config();

//for multer
const path = require("path");

const PORT = process.env.PORT || 5002;

//  app.use(cors());

app.use(cors({
  origin: ['http://localhost:5173','http://127.0.0.1:5173'],
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
}));


//health check
app.get('/api/health', (_req, res) => res.json({ ok: true }));

 app.use(express.json());


connectDB(); // ✅ Connects to MongoDB

// Routes will go here
app.use("/api/pets", require("./routes/petRoutes"));
app.use('/api/auth', require('./routes/authRoutes'));
// Test route
app.get("/", (req, res) => {
  console.log("GET / called");
  res.json("Server is running ✅");
});


// serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.listen(PORT, (err) => {
  console.log(`Server is running on port ${PORT}`);
});

