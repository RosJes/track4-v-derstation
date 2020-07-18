function todaysWeather(city) {
  console.log("Today's weather in " + city + " is 29 degrees Celsius");

  $("body").ready(function () {
    $.ajax({
      url: "https://jsonplaceholder.typicode.com/photos",
      type: "GET",
      success: function (result) {
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
