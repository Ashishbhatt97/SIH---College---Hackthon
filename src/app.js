// import express from 'express';
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { userRoutes } = require("./routes/routes.js")

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/user", userRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});