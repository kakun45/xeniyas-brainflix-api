const express = require("express");
const router = express.Router();
const videosData = require("../data/videos.json");

//works with http://localhost:8000/videos/?api_key=lskjk
router.get("/", (req, res) => {
  // console.log(typeof videosData, videosData); // object
  res.status(200).json(videosData);
});

module.exports = router;
