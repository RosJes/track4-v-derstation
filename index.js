let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
historyCast("59.33", "18.06", toTimestamp(yesterday.toString()));
let counter = 0;
// poser.style.display = "none";
function todaysWeather() {
  var name = document.getElementById("inputLarge").value;
  var span = document.getElementById("namespan");
  span.textContent = name;
  // let poser = document.getElementById("poser");
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
        // historyCast(
        //   result.coord.lat,
        //   result.coord.lon,
        //   toTimestamp(yesterday.toString())
        // );
        weatherSource = "";
        let ul = document.getElementById("list");
        let text = document.createTextNode(result.weather[0].description);
        let li = document.createElement("li");
        let img = document.createElement("img");
        getYesterday(
          result.coord.lat,
          result.coord.lon,
          toTimestamp(yesterday.toString())
        );
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
          if (
            result.weather[0].description.includes("smoke") ||
            result.weather[0].description.includes("haze")
          ) {
            weatherSource = "https://img.icons8.com/ios/48/000000/fog-day.png";
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
        yesterdayweather.innerText = "Timezone: " + result.timezone;
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
function getYesterday(lat, lon, timestamp) {
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
        let ul = document.getElementById("important-city-text");
        // let yesterdayweather = document.getElementById("Yesterdayweather");
        // yesterdayweather.innerText = "Timezone: " + result.timezone;
        let img = document.createElement("img");
        let date = result.hourly[0].dt;
        let unix = new Date(date * 1000);
        let temp = parseFloat(result.hourly[0].temp) - 273;
        ("<br></br>");
        ul.innerText = temp;
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
function Chart() {
  var chart = JSC.chart("chartDiv", {
    debug: true,
    type: "line",
    title_label_text: "Line Series Types",
    legend_position: "inside bottom right",
    toolbar_items: {
      "Line Type": {
        type: "select",
        label_style_fontSize: 13,
        margin: 5,
        items: "Line,Step,Spline",
        events_change: function (val) {
          chart.series().options({ type: val });
        },
      },
    },
    xAxis: { scale_type: "time" },
    series: [
      {
        name: "Purchases",
        points: [
          ["1/1/2020", 29.9],
          ["1/2/2020", 71.5],
          ["1/3/2020", 106.4],
          ["1/6/2020", 129.2],
          ["1/7/2020", 144.0],
          ["1/8/2020", 176.0],
        ],
      },
    ],
  });
}
