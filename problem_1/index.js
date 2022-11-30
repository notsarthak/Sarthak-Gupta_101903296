const express = require("express");
const axios = require("axios");
let app = express();

app.use(express.json());

app.get("/numbers", async (req, res) => {
  let { url } = req.query;
  let numbers = new Set();
  for (let i = 0; i < url.length; i++) {
    let endpoint = url[i].substr(22, url[i].length);
    if(endpoint == "primes" || endpoint == "fibo" || endpoint == "odd" || endpoint == "rand"){
        try {
            let response = await axios.get(url[i]);
            response.data.numbers.forEach(ele => numbers.add(ele));
          } catch (e) {
            console.error("There was an error");
          }
    }
  }
  let finalNums = Array.from(numbers);
  finalNums.sort(function(a, b){return a - b});
  res.send(finalNums)
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
