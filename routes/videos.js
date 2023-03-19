const express = require("express");
const router = express.Router();
const videosData = require("../data/video-details.json"); // data is not a part of a code. in Real life don't store it in Git
const crypto = require("crypto");
const {
  readData,
  readNickNames,
  writeDataOnPost,
} = require("../controllers/controllers");

// get a whole videoList
// works with http://localhost:8080/videos/?api_key=lskjk
router.get("/", (_req, res) => {
  const arrObj = videosData.map((video) => ({
    id: video.id,
    title: video.title,
    channel: video.channel,
    image: video.image,
  }));
  res.status(200).json(arrObj);
});

// tested: http://localhost:8080/videos/25ce5d91-a262-4dcf-bb87-42b87546bcfa/?api_key=Kkdfjd
router.get("/:videoId", (req, res) => {
  const { videoId } = req.params;
  let data = videosData.find((video) => video.id === videoId);
  if (data) {
    return res.status(200).json(data);
  }
  return res.status(404).send("Here is no data for " + videoId);
});

// only returns Arr of comments that belongs to a path of a videoId
// http://localhost:8080/videos/84e96018-4022-434e-80bf-000ce4cd12b8/comments/?api_key=lskjk
// body {
// "comment": "test text from a form"
// }
router.post("/:videoId/comments", (req, res) => {
  const videoId = req.params.videoId;
  const allData = readData();
  const videoIdComments = allData.find((video) => video.id === videoId);
  const { comment } = req.body;
  if (comment) {
    // define comments from parsedData
    const commentsArrOFvideoId = videoIdComments?.comments;
    if (commentsArrOFvideoId === undefined) {
      return res.status(422).json("invalid ID");
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
    console.log(allData);
    // write in a modified data
    writeDataOnPost(allData);
    // 201 Created success status
    res.status(201).json(commentsArrOFvideoId); // returns an entire comments arr
  } else {
    console.log("Unprocessable Entity. Request is missing required parameters");
    res
      .status(422)
      .json("Unprocessable Entity. Request is missing required parameters"); // tested
  }
});

module.exports = router;
