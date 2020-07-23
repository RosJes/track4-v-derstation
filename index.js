let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
var today = new Date();
var time = today.getHours() + ":0" + today.getMinutes();
//Visar gårdagens väder i Stockholm per timme
historyCast("59.33", "18.06", toTimestamp(yesterday.toString()));
let counter = 0;
function todaysWeather() {
  var name = document.getElementById("inputLarge").value;
  var span = document.getElementById("namespan");
  span.textContent = name;
  let humid = document.getElementById("humid");
  let pressure = document.getElementById("Pressure");
  let feel = document.getElementById("Feel");
  let cityheader = document.getElementById("Weather");
  let waetherli = document.getElementById("weatherli");
  let latestheader = document.getElementById("Latest-header");
  let headerimg = document.createElement("IMG");
  let weatherReport = document.getElementById("LatestWeatherReport");
  var lastestWeatherimg = document.getElementById("weatherimg");
  let imgtag = document.createElement("IMG");
  $(document).ready(function () {
    var api_url = "http://api.openweathermap.org/";
    var key = "936f2e7c80c5a35d539529f46f2c798b";
    $.ajax({
      url: api_url + "data/2.5/weather?q=" + name + "&appid=" + key,
      type: "GET",
      dataType: "json",
      success: function (result) {
        console.log(result);
        //text till lastest spalten
        headerimg.src = DayandNightIcon(today.getHours());
        latestheader.innerText =
          result.name +
          " " +
          convertToCelsius(result.main.temp) +
          "° C " +
          time;
        latestheader.appendChild(headerimg);

        weatherReport.innerHTML = result.weather[0].description;
        imgtag.src = setLatestIcon(result.weather[0].description);
        lastestWeatherimg.appendChild(imgtag);
        getYesterday(
          result.name,
          result.coord.lat,
          result.coord.lon,
          toTimestamp(yesterday.toString())
        );
        let ul = document.getElementById("list");
        let text = document.createTextNode(result.weather[0].description);
        let li = document.createElement("li");
        let img = document.createElement("img");

        if (span.length != 0) {
          cityheader.innerText =
            result.name + " " + convertToCelsius(result.main.temp) + "° C ";
          img.src = setWeatherIcon(result.weather[0].description);
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

        var spansunrise = document.getElementById("sunrise-span");
        let sunrisecard = document.getElementById("sunrise");
        var spansunset = document.getElementById("sunset");
        let cardheadersunrise = document.getElementById("sunrise-text");
        sunrisecard.style.display = "inline";
        // cardheadersunrise.innerText = datesunrise;
        let sunrise = result.sys.sunrise;
        let sunset = result.sys.sunset;
        let datesunrise = new Date(sunrise * 1000);
        let datesunset = new Date(sunset * 1000);
        if (sunrisecard.style.background == "#f1f1f1")
          cardheadersunrise.innerText = spansunrise.textContent;
        else if ((sunrisecard.style.background = "black"))
          sunrisecard.style.color = "white";
        cardheadersunrise.innerText = spansunset.textContent;
        spansunset.textContent = datesunset;
        spansunrise.textContent = datesunrise;

        // cardheadersunrise.innerText = datesunset;
      },
    });
  });
}
function changetoSunset() {
  let sunrisecard = document.getElementById("sunrise");
  let sunimg = document.createElement("img");
  let sunsetheader = document.getElementById("sunrise-title");
  let cardheadersunrise = document.getElementById("sunrise-text");
  var spansunset = document.getElementById("sunset");
  var spansunrise = document.getElementById("sunrise-span");
  let source = "";
  let sunbtn = document.getElementById("sunbtn");
  console.log("button clicked");
  if (counter % 2 == 0) {
    sunrisecard.style.background = "#f1f1f1";
    cardheadersunrise.innerText = spansunrise.textContent;
    sunsetheader.innerText = "When does the sun set?";
    sunrisecard.style.color = "black";
    source = "https://img.icons8.com/color/50/000000/sunset.png";
  } else {
    sunrisecard.style.background = "black";
    sunrisecard.style.color = "#f1f1f1";
    source = "https://img.icons8.com/color/48/000000/sunrise.png";
    sunsetheader.innerText = "When does the sun rise?";
    cardheadersunrise.innerText = spansunset.textContent;
  }
  sunimg.src = source;
  sunsetheader.appendChild(sunimg);
  counter++;
}

function toTimestamp(strDate) {
  var datum = Date.parse(strDate);
  return datum / 1000;
}
//night or day icons
function DayandNightIcon(time) {
  console.log("I am about to be a night or day icon");
  let weatherSource = "";
  if (time <= 19) {
    weatherSource =
      "https://img.icons8.com/ios/48/000000/partly-cloudy-day.png";
  }
  if (time >= 19) {
    weatherSource =
      "https://img.icons8.com/ios/48/000000/partly-cloudy-night.png";
  }
  return weatherSource;
}
function setLatestIcon(description) {
  console.log("I am to be an icon");
  let weatherSource = "";
  if (description.includes("rain")) {
    weatherSource = "https://img.icons8.com/fluent/48/000000/intense-rain.png";
  }
  if (description == "light rain") {
    weatherSource = "https://img.icons8.com/fluent/48/000000/light-rain.png";
  }
  if (description == "shower rain") {
    weatherSource = "https://img.icons8.com/fluent/48/000000/downpour.png";
  }
  if (description == "thunderstorm") {
    weatherSource = "https://img.icons8.com/fluent/48/000000/storm.png";
  }
  if (description == "clear sky") {
    weatherSource = "https://img.icons8.com/fluent/48/000000/summer.png";
  }
  if (description == "partly clouds") {
    weatherSource =
      "https://img.icons8.com/fluent/48/000000/partly-cloudy-day.png";
  }
  if (description.includes("snow")) {
    weatherSource = "https://img.icons8.com/fluent/48/000000/snow.png";
  }
  if (description.includes("cloud")) {
    weatherSource = "https://img.icons8.com/fluent/48/000000/clouds.png";
  }
  if (description.includes("smoke") || description.includes("haze")) {
    weatherSource = "https://img.icons8.com/fluent/48/000000/fog-day.png";
  }
  return weatherSource;
}
function setWeatherIcon(description) {
  let weatherSource = "";
  if (description.includes("rain")) {
    weatherSource = "https://img.icons8.com/ios/50/000000/torrential-rain.png";
  }
  if (description == "light rain") {
    weatherSource = "https://img.icons8.com/ios/50/000000/light-rain.png";
  }
  if (description == "shower rain") {
    weatherSource = "https://img.icons8.com/ios/50/000000/intense-rain.png";
  }
  if (description == "thunderstorm") {
    weatherSource = "https://img.icons8.com/ios/50/000000/storm.png";
  }
  if (description == "clear sky") {
    weatherSource = "https://img.icons8.com/ios/50/000000/sun.png";
  }
  if (description == "partly clouds") {
    weatherSource =
      "https://img.icons8.com/ios/50/000000/partly-cloudy-day.png";
  }
  if (description.includes("snow")) {
    weatherSource = "https://img.icons8.com/ios/50/000000/snow.png";
  }
  if (description.includes("cloud")) {
    weatherSource = "https://img.icons8.com/ios/50/000000/clouds.png";
  }
  if (description.includes("smoke") || description.includes("haze")) {
    weatherSource = "https://img.icons8.com/ios/48/000000/fog-day.png";
  }
  return weatherSource;
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
          let temp = convertToCelsius(result.hourly[i].temp);
          li.innerHTML = temp + "° C";
          ("<br></br>");
          ul.appendChild(li);
        }
      },
    });
  });
}
//här ska en av latest vara med gårdagens väder
function getYesterday(name, lat, lon, timestamp) {
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
        //skriv om
        let ul = document.getElementById("Yesterday-header");
        let img = document.createElement("img");
        let date = result.hourly[today.getHours()].dt;
        let unix = new Date(date * 1000);
        let cityname = result.name;
        let temp = convertToCelsius(result.hourly[today.getHours()].temp);
        let description =
          result.hourly[today.getHours()].weather[0].description;
        img.src = DayandNightIcon(today.getHours());
        ul.innerText = name + " " + temp.toString() + "° C" + " " + time;
        ul.appendChild(img);
        let yesterdayreport = document.getElementById("Yesterday-Report");
        let yesterdayimg = document.getElementById("yesterday-img");
        let descrimg = document.createElement("img");
        yesterdayreport.innerHTML = description;
        descrimg.src = setLatestIcon(description);
        yesterdayimg.appendChild(descrimg);
      },
    });
  });
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
