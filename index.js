function todaysWeather() {
  var name = document.getElementById("inputLarge").value;
  document.getElementById("namespan").textContent = name;
  let cityheader = document.getElementById("Weather");
  $(document).ready(function () {
    var api_url = "http://api.openweathermap.org/";
    var key = "936f2e7c80c5a35d539529f46f2c798b";
    $.ajax({
      url: api_url + "data/2.5/weather?q=" + name + "&appid=" + key,
      type: "GET",
      dataType: "json",
      success: function (result) {
        console.log(result.id);
        historyCast("60.99", "30.9", "1594810397");
        weatherSource = "";
        let convertCelsius = parseFloat(result.main.temp) - 273.5;
        convertCelsius = Math.round(convertCelsius);
        console.log(convertCelsius);
        let ul = document.getElementById("list");
        let text = document.createTextNode(result.weather[0].description);
        let li = document.createElement("li");
        let img = document.createElement("img");
        if (result.weather[0].description.includes("rain")) {
          weatherSource =
            "https://img.icons8.com/ios/50/000000/torrential-rain.png";
        }
        if (result.weather[0].description == "light rain") {
          weatherSource = "https://img.icons8.com/ios/50/000000/light-rain.png";
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
        console.log(result.weather[0].description);

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
        let ul = document.getElementById("list");

        for (var i = 0; i < result.length; i++) {
          let li = document.createElement("li");
          let img = document.createElement("img");

          li.innerHTML = result[i].title + "<br></br>";
          img.src = result[i].thumbnailUrl;

          li.appendChild(img);
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
