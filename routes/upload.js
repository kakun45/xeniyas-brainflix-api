const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const {
  readComments,
  readData,
  numberWithCommas,
  writeDataOnPost,
} = require("../controllers/controllers");

// POST /videos that will add a new video to the video list. A unique id must be generated for each video added.
router.post("/", (req, res) => {
  const parsedData = readData();
  const { title, description, image } = req.body;
  const id = crypto.randomUUID();
  const baseComments = readComments();
  if (title && description) {
    parsedData.push({
      id,
      description,
      title,
      channel: "Xeniya Sun",
      image,
      views: numberWithCommas(Math.floor(Math.random() * 1000000 + 1)),
      likes: numberWithCommas(Math.floor(Math.random() * 1000000 + 1)),
      timestamp: Date.now(),
      comments: baseComments,
    });
    // write data into .json
    writeDataOnPost(parsedData);
    // 201 Created success status
    console.log("Congrats! Your video is uploaded!");
    return res.status(201).json(parsedData);
  }
});

module.exports = router;
