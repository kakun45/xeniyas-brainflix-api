// BACKEND! REST API, NO local Storage
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { readDocs } = require("./controllers/controllers");
const routeVideos = require("./routes/videos");
const routeRegister = require("./routes/register");
const routeUpload = require("./routes/upload");

const { PORT } = process.env;
app.use(cors());
app.use(express.json());

// Middleware for upload. WARNING! can't put on everything due to pictures must have path with an api_key
app.use("/upload", (req, res, next) => {
  console.log("Middleware active");
  if (!req.query.api_key)
    return res.status(401).json("Authorized request: api_key is required");
  next();
});

// Home end-points with Docs in res
// to call: http://localhost:8080/?api_key=lskjk
app.route("/").get((req, res) => {
  docs = readDocs();
  // in a browser this downloads .md a file vs showing it into html page
  res.status(200).send(docs);
});

// static endpoint for images
app.use("/images", express.static("./public/images"));

// routs
app.use("/videos", routeVideos);
app.use("/upload", routeUpload);
app.use("/register", routeRegister); 

app.listen(PORT || 8000, () => {
  console.log("Server is up 👍 on " + PORT || 8000);
});
