const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const comments = require("../data/comments.json");

//tested with http://localhost:8000/comments/?api_key=lskjk
router.get("/", (req, res) => {
  res.status(200).json(comments);
});

//tested with
// http://localhost:8000/comments/?api_key=lskjk
//localhost:8000/comments/?api_key=lskjk
// with body json {
  // "name": "test name",
  // "comment": "test text"
// }
router.post("/", (req, res) => {
  const { name, comment } = req.body;
  const id = crypto.randomBytes(16).toString("hex"); // 449f866f53bedce70b4f4e1d2f717f7b
  if (name && comment) {
    comments.push({
      id,
      name,
      likes: 0,
      timestamp: Date.now(),
    });
    // 201 Created success status
    res.status(201).json(comments); // TODO: probably shouldn't return entire comments arr, just a posted one?
  } else {
    // tested with http://localhost:8000/comments/?api_key=lskjk
    res
      .status(422)
      .json("Unprocessable Entity. Request is missing required parameters");
  }
});

module.exports = router;
