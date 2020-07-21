let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
let counter = 0;
function todaysWeather() {
  var name = document.getElementById("inputLarge").value;
  var span = document.getElementById("namespan");
  span.textContent = name;
  let poser = document.getElementById("poser");
  let Cast = document.getElementById("HistoryCast");
  poser.style.display = "none";
  Cast.style.display = "inline";

  let cityheader = document.getElementById("Weather");
  let waetherli = document.getElementById("weatherli");
  $(document).ready(function () {
    var api_url = "http://api.openweathermap.org/";
    var key = "936f2e7c80c5a35d539529f46f2c798b";
    $.ajax({
      url: api_url + "data/2.5/weather?q=" + name + "&appid=" + key,
      type: "GET",
      dataType: "json",
      success: function (result) {
        console.log(result);
        historyCast(
          result.coord.lat,
          result.coord.lon,
          toTimestamp(yesterday.toString())
        ); //gör klart konverterar metoden
        //hårdkodat, gör en timestamp konverterare, ret lon,lat värden
        weatherSource = "";
        let convertCelsius = parseFloat(result.main.temp) - 273.5;
        convertCelsius = Math.round(convertCelsius);
        let ul = document.getElementById("list");
        let text = document.createTextNode(result.weather[0].description);
        let li = document.createElement("li");
        let img = document.createElement("img");
        if (name != null) {
          if (result.weather[0].description.includes("rain")) {
            weatherSource =
              "https://img.icons8.com/ios/50/000000/torrential-rain.png";
          }
          if (result.weather[0].description == "light rain") {
            weatherSource =
              "https://img.icons8.com/ios/50/000000/light-rain.png";
          }
          if (result.weather[0].description == "shower rain") {
            weatherSource =
              "https://img.icons8.com/ios/50/000000/intense-rain.png";
          }
          if (result.weather[0].description == "thunderstorm") {
            weatherSource = "https://img.icons8.com/ios/50/000000/storm.png";
          }
          if (result.weather[0].description == "clear sky") {
            weatherSource = "https://img.icons8.com/ios/50/000000/sun.png";
          }
          if (result.weather[0].description == "partly clouds") {
            weatherSource =
              "https://img.icons8.com/ios/50/000000/partly-cloudy-day.png";
          }

          if (result.weather[0].description.includes("snow")) {
            weatherSource = "https://img.icons8.com/ios/50/000000/snow.png";
          }
          if (result.weather[0].description.includes("cloud")) {
            weatherSource = "https://img.icons8.com/ios/50/000000/clouds.png";
          }
          img.src = weatherSource;
          cityheader.innerText = result.name + " " + convertCelsius + "° C ";
          li.appendChild(text);
          ul.appendChild(img);
          ul.appendChild(li);
        }
        console.log(result.weather[0].description);
        counter += 1;
        var x = document.getElementById("commitbtn");
        if (span.length != 0) {
          x.style.display = "none";
          span.innerText = " ";
        }
        if (span.length == 0) {
          x.style.display = "inline";
        }
        let sunrise = result.sys.sunrise;
        let sunset = result.sys.sunset;
        let datesunrise = new Date(sunrise * 1000);
        let datesunset = new Date(sunset * 1000);

        let cardheadersunset = document.getElementById("sunset");
        let cardheadersunrise = document.getElementById("sunrise");
        cardheadersunrise.innerText = datesunrise;
        cardheadersunset.innerText = datesunset;
      },
    });
  });
}
function toTimestamp(strDate) {
  var datum = Date.parse(strDate);
  return datum / 1000;
}
function historyCast(lat, lon, timestamp) {
  console.log("The weather is:");

  $("body").ready(function () {
    var api_url = "http://api.openweathermap.org";
    var key = "936f2e7c80c5a35d539529f46f2c798b";
    let str = "/data/2.5/onecall/timemachine?";
    let url =
      api_url +
      str +
      "lat=" +
      lat +
      "&" +
      "lon=" +
      lon +
      "&" +
      "dt=" +
      timestamp +
      "&appid=" +
      key;
    $.ajax({
      url: url,
      type: "GET",
      success: function (result) {
        console.log(result);
        let ul = document.getElementById("HistoryCast");
        let yesterdayweather = document.getElementById("Yesterdayweather");
        for (var i = new Date().getUTCHours(); i < result.hourly.length; i++) {
          let li = document.createElement("li");
          let img = document.createElement("img");
          let date = result.hourly[i].dt;
          let unix = new Date(date * 1000);
          let temp = parseFloat(result.hourly[i].temp) - 273;
          li.innerHTML = unix + ":" + Math.round(temp) + "° C";
          ("<br></br>");
          ul.appendChild(li);
        }
      },
    });
  });
}

function changetoSunset() {
  var sunset = document.getElementsByClassName("blocks");
  console.log(sunset);
}
