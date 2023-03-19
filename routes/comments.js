// const express = require("express");
// const router = express.Router();
// const crypto = require("crypto");
// const {
//   readData,
// } = require("../controllers/controllers");

//tested '/' with http://localhost:8080/comments/?api_key=lskjk
// router.get("/", (_req, res) => {
//   const filedata = readData();
//   res.status(200).json(filedata);
// });

// only returns Arr of comments that belongs to a path of a videoId
// http://localhost:8080/comments/84e96018-4022-434e-80bf-000ce4cd12b8/?api_key=lskjk
// router.get("/:videoId", (req, res) => {
//   const videoId = req.params.videoId;
//   const allData = readData();
//   const videoIdComments = allData.find((video) => video.id === videoId);
//   const commentsArrOFvideoId = videoIdComments.comments;
//   res.status(200).json(commentsArrOFvideoId);
// });

// router.post("/", (req, res) => {
//   const arrOfNames = readNickNames();
//   const randomInd = Math.floor(Math.random() * arrOfNames.length);
//   console.log(arrOfNames[randomInd]);
//   const parsedData = readData();
//   console.log(parsedData);
//   const { comment } = req.body;
//   // const id = crypto.randomBytes(16).toString("hex"); // 449f866f53bedce70b4f4e1d2f717f7b
//   const id = crypto.randomUUID(); // 84e96018-4022-434e-80bf-000ce4cd12b8
//   // TODO: define let comments = parsedData...
//   let comments = videosDetails();
//   if (comment) {
//     comments.push({
//       id,
//       name: arrOfNames[randomInd],
//       likes: 0,
//       timestamp: Date.now(),
//     });
//     // TODO: write data
//     // writeDataOnPost(parsedData);
//     // 201 Created success status
//     res.status(201).json(comments); // TODO: probably shouldn't return entire comments arr, just a posted one?
//   } else {
//     // tested with http://localhost:8000/comments/?api_key=lskjk
//     res
//       .status(422)
//       .json("Unprocessable Entity. Request is missing required parameters");
//   }
// });

// module.exports = router;
