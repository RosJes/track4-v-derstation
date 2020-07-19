function todaysWeather() {
  var name = document.getElementById("name").value;
  document.getElementById("namespan").textContent = name;
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
        li.appendChild(text);
        ul.appendChild(img);
        ul.appendChild(li);
        console.log(result.weather[0].description);
      },
    });
  });
}
