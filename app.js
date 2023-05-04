const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.first;
  const lastName = req.body.second;
  const email = req.body.third;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us17.api.mailchimp.com/3.0/lists/073aac245b";
  const options = {
    method: "POST",
    auth: "Aisha:31a3d1dd71fd46b46d712092257b49da-us17",
  };

  const request = https.request(url, options, function (response) {
    response.on("data", function (data) {
      console.log(JSON.parse(data));
      console.log(response.statusCode);
      if (response.statusCode === 200)
        res.sendFile(__dirname + "/success.html");
      else res.sendFile(__dirname + "/failure.html");
    });
  });

  request.write(jsonData);
  request.end();
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.listen(3000, function (req, res) {
  console.log("Server is running on port 3000");
});

//API key
// 31a3d1dd71fd46b46d712092257b49da-us17

//audience id
// 073aac245b
