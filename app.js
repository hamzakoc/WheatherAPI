const express = require('express')
const https = require('https')
const bodyParser = require('body-parser');


var app = express();
app.use(bodyParser.urlencoded({ extended: true }))





app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html")

})



app.post("/", function (req, res) {

    var country = req.body.country
    var query = country
    var apiKey = "39535c6bc9ca9dc8a086acf0aec66d18"
    var unit = "metric"
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`

    https.get(url, function (response) {

        console.log(response.statusCode);
        response.on("data", function (data) {
            const wheatherData = JSON.parse(data)
            const temp = wheatherData.main.temp
            console.log(temp);
            const wheatherDataDescription = wheatherData.weather[0].description

            const icon = wheatherData.weather[0].icon

            var iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`

            res.write("<h1> The temperature in " + country + " is " + temp + " degrees celcius</h1>")
            res.write("<h1> The weather is currettly " + wheatherDataDescription + "</h1>")
            res.write("<img style='background-color:grey' src=" + iconURL + " >")
            res.send()
            // res.send(`<h1> The temperature in Canada is  ${temp}  degrees celcius</h1>
            //         <h1> The weather is currettly ${wheatherDataDescription}</h1>



        })
    })
})


app.listen("3000", function () {
    console.log("Server running on port 3000");
})