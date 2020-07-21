let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
let counter = 0;
function todaysWeather() {
  var name = document.getElementById("inputLarge").value;
  var span = document.getElementById("namespan");
  span.textContent = name;
  // let poser = document.getElementById("poser");
  let Cast = document.getElementById("HistoryCast");
  // poser.style.display = "none";
  Cast.style.display = "inline";
  let humid = document.getElementById("humid");
  let pressure = document.getElementById("Pressure");
  let feel = document.getElementById("Feel");
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
        );
        weatherSource = "";
        let ul = document.getElementById("list");
        let text = document.createTextNode(result.weather[0].description);
        let li = document.createElement("li");
        let img = document.createElement("img");
        if (span.length != 0) {
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
          cityheader.innerText =
            result.name + " " + convertToCelsius(result.main.temp) + "° C ";
          li.appendChild(text);
          ul.appendChild(img);
          ul.appendChild(li);
          pressure.innerText = "Pressure: " + result.main.pressure;
          feel.innerText =
            "Feels like: " + convertToCelsius(result.main.feels_like) + "° C";
          humid.innerText = "Humidity: " + result.main.humidity;
        }
        if (span.length != 0) {
          let commitbtn = document.getElementById("commitbtn");
          commitbtn.style.display = "none";
          span.innerText = " ";
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
function convertToCelsius(temp) {
  let convertCelsius = parseFloat(temp) - 273.5;
  return (convertCelsius = Math.round(convertCelsius));
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
//BUNDET TILL KNAPP
function changetoSunset() {
  let sunsetcard = document.getElementById("sunsetcard");
  let sunrisecard = document.getElementById("sunrisecard");
  console.log("button clicked");
  if (counter % 2 == 0) {
    sunsetcard.style.display = "inline";
    sunrisecard.style.display = "none";
  } else {
    sunsetcard.style.display = "none";
    sunrisecard.style.display = "inline";
  }
  counter++;
}
