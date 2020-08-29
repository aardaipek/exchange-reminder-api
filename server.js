const express = require('express')
const app = express()
const port = 3000
const fetch = require("node-fetch");
const firebase = require('./firebase.js');

var cors = require('cors')
app.use(cors())


const API_URL = "https://api.exchangeratesapi.io/latest?base="


// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.send("DEV branch");
})

// return daily rates
app.get("/daily_rates/:type?", function (request, response) {
    var type = (request.params.type) != null ? (request.params.type) : "USD";
    var convertedToUppercase = type.toUpperCase() === type ? type : type.toUpperCase();
    fetch(API_URL+ convertedToUppercase )
    .then((res) => { 
      status = res.status; 
      return res.json()
    })
    .then((jsonData) => {
      let returnArray = Object.entries(jsonData)
      response.send(returnArray);
    })
    .catch((err) => {
      console.error(err);
    });
    firebase.writeUser("arda","aypek");
})

// post işlemi fakat değişecek 
app.post("/api/add_rate",function(request,response) {

  var _username = request.body.user_name;
  var _userrate = request.body.user_rate;
  var _exchangeType = request.body.exchange_type;
  var data = {
    user_name : _username,
    user_rate : _userrate,
    exchange_type: _exchangeType
  }
  console.log(data)

  firebase.writeUser(data)
});

app.get("/api/get_data",function(request,response) {
 firebase.getData().then((res)=> {
    console.log(res)
 })
})
  


app.listen(process.env.PORT || port, function(){
    console.log("Server is running ", this.address().port);
});


