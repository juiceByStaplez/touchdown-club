const _ = require("lodash");
const fs = require("fs");
const API_BASE = "https://www.easports.com/madden-nfl/ratings/service/data";
const TOTAL_COUNT = 2368;
// const TOTAL_COUNT = 480;
const PAGE_LIMIT = 160;
const pages = Math.round(Math.max(TOTAL_COUNT / PAGE_LIMIT));

let playerRatings;

const getJSON = fs.readFile(
  "./public/data/players.json",
  "utf8",
  (err, data) => {
    if (err) throw err;
    playerRatings = JSON.parse(data);

    console.log(playerRatings);
  }
);
