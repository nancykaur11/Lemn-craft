// // src/server.js
// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const connectDB = require("./config/db");
// const cors = require('cors');
// const dotenv = require('dotenv');
// const authRoutes = require("./routes/authRoutes");
// // const assetRoutes = require("./routes/assetRoutes");
// const PORT = process.env.PORT || 3000;

// // dotenv.config();
// connectDB();

// app.use(express.json());

// app.use('/api/auth', authRoutes);
// // app.use('/api/assets', assetRoutes);
// console.log("hello");
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
require('dotenv').config(); 
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const assetRoutes = require("./routes/assetRoutes");
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/assets', assetRoutes); 

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
