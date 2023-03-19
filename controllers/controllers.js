const fs = require("fs");
// WARNING! only one "dot/<path>" routs on data, bc we call it from index.js, not from here

const readData = () => {
  return JSON.parse(fs.readFileSync("./data/video-details.json"));
};

const writeDataOnPost = (data) => {
  fs.writeFileSync("./data/video-details.json", JSON.stringify(data));
};

function numberWithCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const readNickNames = () => {
  return JSON.parse(fs.readFileSync("./data/nicknames.json"));
};

const readDocs = () => {
  return fs.readFileSync("./0.1Documentation/Sprint-2API-Documentation.md");
};

const readComments = () => {
  return JSON.parse(fs.readFileSync("./data/comments.json"));
};

module.exports = {
  numberWithCommas,
  readData,
  readDocs,
  readComments,
  readNickNames,
  writeDataOnPost,
};
