function todaysWeather() {
  var name = document.getElementById("inputLarge").value;
  document.getElementById("namespan").textContent = name;
  let cityheader = document.getElementById("Weather");
  console.log("Today's weather in " + name + " is 29 degrees Celsius");
  $(document).ready(function () {
    var api_url = "http://api.openweathermap.org/";
    var key = "936f2e7c80c5a35d539529f46f2c798b";
    $.ajax({
      url: api_url + "data/2.5/weather?q=" + name + "&appid=" + key,
      type: "GET",
      dataType: "json",
      success: function (result) {
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

function foreCast() {
  console.log("The wather is:");
}
function changetoSunset() {
  var sunset = document.getElementsByClassName("blocks");
  sunset;
}
