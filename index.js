// BACKEND! NO local Storage
const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const routeVideos = require("./routes/videos");
const routeComments = require("./routes/comments");

app.use(cors());
app.use(express.json());

// Middleware for everything
app.use("/", (req, res, next) => {
  console.log("Middleware active");
  if (!req.query.api_key)
    return res.status(401).json("Authorized request: api_key is required");
  next();
});

// end-points
// tested with http://localhost:8000/?api_key=lskjk
app
  .route("/")
  .get((req, res) => {
    return res.status(200).json("Request approved");
  })
  .post((req, res) => {
    return res.status(200).json("Post from app");
  });


app.get("/videos/:videoId", (req, res) => {
  return res.status(200).send("Here is the data for " + req.params.videoId);
});

// static endpoint for images
app.use(express.static("images"));
// TODO look into json under "image" like that? relative path to what?

// routs
app.use("/videos", routeVideos);
app.use("/comments", routeComments);

app.listen(port, () => {
  console.log("Server is up 👍");
});
