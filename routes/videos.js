const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const {
  readData,
  readNickNames,
  writeDataOnPost,
} = require("../controllers/controllers");

// GET /videos that responds with an array of videos for videoList
router.get("/", (_req, res) => {
  const videosData = readData();
  const arrObj = videosData.map((video) => ({
    id: video.id,
    title: video.title,
    channel: video.channel,
    image: video.image,
  }));
  res.status(200).json(arrObj);
});

// GET /videos/:id that responds with an object containing the details of the video with an id of :id.
router.get("/:videoId", (req, res) => {
  const { videoId } = req.params;
  const videosData = readData();
  let data = videosData.find((video) => video.id === videoId);
  if (data) {
    return res.status(200).json(data);
  }
  return res.status(404).json({
    message: `No video with that id ${videoId} exists`,
  });
});

// only returns Arr of comments that belongs to a path of a videoId
router.post("/:videoId/comments", (req, res) => {
  const videoId = req.params.videoId;
  const allData = readData();
  const videoIdComments = allData.find((video) => video.id === videoId);
  const { comment } = req.body;
  if (comment) {
    // define comments from parsedData
    const commentsArrOFvideoId = videoIdComments?.comments;
    if (commentsArrOFvideoId === undefined) {
      return res.status(422).json({
        message: "No video with that id exists",
      });
    }
    const arrOfNames = readNickNames();
    const randomInd = Math.floor(Math.random() * arrOfNames.length);
    const id = crypto.randomUUID();
    commentsArrOFvideoId.push({
      id,
      name: arrOfNames[randomInd],
      comment,
      likes: 0,
      timestamp: Date.now(),
    });
    // write-in a modified data
    writeDataOnPost(allData);
    // 201 Created success status
    res.status(201).json(commentsArrOFvideoId); // returns an entire comments arr
  } else {
    console.log("Unprocessable Entity. Request is missing required parameters");
    res
      .status(422)
      .json("Unprocessable Entity. Request is missing required parameters");
  }
});

// Deletes the given comment and returns it in the response body
// http://localhost:8080/:videoId/comments/657de346-b3c2-47b4-bf5b-6db90d1e3bdc/?api_key=lskjk
router.delete("/:videoId/comments/:commentId", (req, res) => {
  const videoId = req.params.videoId;
  const commentId = req.params.commentId;
  const allData = readData();
  const videoIdComments = allData.find((video) => video.id === videoId);
  const videoIdCommentId = videoIdComments.find((comment) => comment.id === commentId);
  const index = videoIdComments.indexOf(videoIdCommentId);
  console.log(index);
  if (index > -1) {
    // only splice array when item is found
    videoIdComments.splice(index, 1); 
    // 2nd parameter means remove one item only
  }
  // write into json modified arr
});
module.exports = router;
