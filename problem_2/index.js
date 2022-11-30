const express = require("express");
let app = express();

app.use(express.json());

const ListOfWords = ["bonfire", "cardio", "case", "character", "bonsai"];
let shortestPrefix = {};

for (let i = 0; i < ListOfWords.length; i++) {
  currShortestPrefix = "";
  let k = 0;
  for (let j = 0; j < ListOfWords.length; j++) {
    if (i == j) continue;
    for (; k < ListOfWords[j].length && k < ListOfWords[i].length; k++) {
      if (ListOfWords[i][k] != ListOfWords[j][k]) break;
      else
        currShortestPrefix += ListOfWords[i][k];
    }
  }
  shortestPrefix[ListOfWords[i]] = currShortestPrefix + ListOfWords[i][k];
}

app.get("/prefixes", async (req, res) => {
  let { keywords } = req.query;
  let keywordsList = keywords.split(",");
  let finalRes = [];
  keywordsList.forEach((ele) => {
    if (ListOfWords.includes(ele)) {
      finalRes.push({
        keyword: ele,
        status: "found",
        prefix: shortestPrefix[ele],
      });
    } else {
      finalRes.push({
        keyword: ele,
        status: "not_found",
        prefix: "not_applicable",
      });
    }
  });
  res.send(finalRes);
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
