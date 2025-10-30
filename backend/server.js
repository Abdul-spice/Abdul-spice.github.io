const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors({
  origin: 'http://127.0.0.1:5500',
  credentials: true
}));
const protectedRoutes = require("./routes/protected");
console.log("🔍 protectedRoutes:", protectedRoutes);
app.use("/api/protected", protectedRoutes);

const connectDB = require('./config/db.js');
connectDB();

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const user_profilesRoutes = require('./routes/user_profiles.js');
app.use("/api/user_profiles", user_profilesRoutes);

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; connect-src 'self' http://localhost:3000 https://api.openai.com"
  );
  next();
});

if (process.env.NODE_ENV === "production") {
  const path = require('path');
  const __dirname = path.resolve();

  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/frontend/dist/index.html"));
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('🚀 Server started at http://localhost:' + PORT);
});