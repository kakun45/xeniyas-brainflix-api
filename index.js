// BACKEND! NO local Storage
const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");

app.use(cors());
// end-points
app.use(express.json());

app.route("/videos")
.get((req, res) => {
  if (req.query.api_key) {
    return res.status(200).send("Request approved");
  }
  res.status(401).json("nauthorized request: Api_key is required");
});

app.get("/videos/:videoId", (req, res) => {
  if (req.query.api_key) {
    return res.status(200).send("Here is the data for " + req.params.videoId);
  }
});

app.listen(port, () => {
  console.log("Server is up 👍");
});
