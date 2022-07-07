const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    const query = req.body.cityName;
    const apiKey = "7e504af68a5495f5c870e6c519300a7c";
    const units = "metric";


    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units;
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            // console.log(weatherData);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
            console.log(temp);
            console.log(weatherDescription);
            const printingData = "<h1>The temp in "+query+" is " + temp + " degree celsius</h1>\n<p>The weather is currently " + weatherDescription;
            res.write(printingData);
            res.write("<img src="+"\""+imageUrl+"\">\n");
            res.send();
        });
    });
});

app.listen(3000, function(){
    console.log("server is running on port 3000");

});
