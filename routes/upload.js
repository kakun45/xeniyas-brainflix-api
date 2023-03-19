const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const {
  readData,
  writeDataOnPost,
  numberWithCommas,
} = require("../controllers/controllers");

router.post("/", (req, res) => {
  const parsedData = readData();
  const { title, description } = req.body;
  const id = crypto.randomUUID();
  if (title && description) {
    parsedData.push({
      id,
      description,
      title,
      channel: "Xeniya Sun",
      image: "http://localhost:8080/images/fantasy.jpeg",
      views: numberWithCommas(Math.floor(Math.random() * 1000000 + 1)),
      likes: numberWithCommas(Math.floor(Math.random() * 1000000 + 1)),
      timestamp: Date.now(),
      comments: [],
    });
    // write data into .json
    writeDataOnPost(parsedData);
    // 201 Created success status
    console.log(parsedData);
    console.log("Congrats! Your video is uploaded!");
    return res.status(201).json(parsedData);
  }
});

module.exports = router;
