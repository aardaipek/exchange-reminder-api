const express = require("express");
const app = express();
const port = 3000;
const fetch = require("node-fetch");

const API_URL = "https://api.exchangeratesapi.io/latest?base=";

// Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const bodyParser = require("body-parser");

app.get("/", function (req, res) {
  res.send("Hi");
});

// return daily rates
app.get("/api/daily_rates/:type?", function (request, response) {
  var type = request.params.type != null ? request.params.type : "USD";
  var convertedToUppercase =
    type.toUpperCase() === type ? type : type.toUpperCase();

  fetch(API_URL + convertedToUppercase)
    .then((res) => {
      status = res.status;
      return res.json();
    })
    .then((jsonData) => {
      let returnArray = Object.entries(jsonData);
      response.send(returnArray);
    })
    .catch((err) => {
      console.error(err);
    });
});

// include altın
app.get("/api/latest_rates", function (request, response) {
  var apiURl = "https://finans.truncgil.com/today.json";
  fetch(apiURl)
    .then((res) => {
      status = res.status;
      return res.json();
    })
    .then((jsonData) => {
      let returnArray = Object.entries(jsonData);
      response.send(returnArray);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.listen(process.env.PORT || port, function () {
  console.log("Server is running ", this.address().port);
});
