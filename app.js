//API Trying to Render: https://www.wunderground.com/weather/api/d/docs?d=data/forecast10day&MR=1 
// http://api.wunderground.com/api/d808da4a7563de20/forecast10day/q/CA/San_Francisco.json
var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require('body-parser');

app.use(bodyParser());

app.use(express.static("public"));
app.set("view engine", "ejs");

// Create search
app.get("/", function(req,res) {
    res.render("search");
});

// Use API to generate results page
app.post("/results", function(req,res) {
    var state = req.body.state;
    var city = req.body.city;
    var url = "http://api.wunderground.com/api/d808da4a7563de20/forecast10day/q/" + state + "/" + city + ".json";
    console.log("url: " + url);

    request(url, function(error, response, body) {
        if(!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            console.log("data: " + JSON.stringify(data));
            console.log("data.forecast: " + data.forecast);
            res.render("results", {data: data});
        }
    });
});



app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Weather App has started!!!");
});