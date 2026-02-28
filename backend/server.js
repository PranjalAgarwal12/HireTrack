const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= ROUTES =================
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// 🔽🔽🔽 JOB ROUTES 🔽🔽🔽
const jobRoutes = require('./routes/jobRoutes');
app.use('/api/jobs', jobRoutes);
// 🔼🔼🔼 JOB ROUTES 🔼🔼🔼

// 🔽🔽🔽 APPLICATION ROUTES (NEW ADDED) 🔽🔽🔽
const applicationRoutes = require('./routes/applicationRoutes');   // ✅ ADDED
app.use('/api/applications', applicationRoutes);                   // ✅ ADDED
// 🔼🔼🔼 APPLICATION ROUTES 🔼🔼🔼


// ================= AUTH MIDDLEWARE =================
const authMiddleware = require('./middleware/authMiddleware');

// 🔐 Protected Test Route
app.get('/protected', authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user
  });
});

// ================= ROOT ROUTE =================
app.get('/', (req, res) => {
  res.send("HireTrack API Running");
});

// ================= DATABASE CONNECTION =================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// ================= SERVER START =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
