const express = require("express");
const router = express.Router();
const crypto = require("crypto");

// to use: http://localhost:8080/register
router.get("/", (_req, res) => {
  const api_key = crypto.randomUUID();
  console.log("You're registered! Here is your key!");
  res.status(200).json(api_key);
});

module.exports = router;