const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

module.exports = app;