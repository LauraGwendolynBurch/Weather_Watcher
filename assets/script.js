$(document).ready(function () {

  // var citySideList = $(".cityList");
  var searchButton = $("#searchEl");
  var search = $("#inputEl");
  var previousCities = [];
  var storage = JSON.parse(localStorage.getItem("city")) || []



  // get all searched cities, for loop, push to previousCities for each city
  // then render function that loops through all previousCities, added button and appends to citySideList
  for (var i = 0; i < storage.length; i++) {
    previousCities.push(storage[i])
    // console.log(storage[0])

  }
  renderButton()
  //  when user clicks search button
  function handleSearch() {

    var cityName = search.val();
    var upperCaseCity = cityName.toUpperCase();
    // THEN I get the value that is entered into the search input
    makeWeatherRequest(cityName);
    var time = moment().format("(MMM Do YYYY)");
    $("#currentDay").text(time);
    $("#cityNameHere").text(upperCaseCity);
    previousCities.push(cityName);
    localStorage.setItem("city", JSON.stringify(previousCities))
    search.val("");
    renderButton()
  }



  function renderButton() {
    // console.log(citySideList)
    $(".cityList").empty()
    // console.log(previousCities)
    for (var i = 0; i < previousCities.length; i++) {
      var sideBtn = $("<button>").text(previousCities[i]).addClass("buttonOnNow");
      var listEl = $("<li>")
      listEl.append(sideBtn)
      $(".cityList").append(listEl)
    }
  }

  // add a click event to the side cities
  $(".cityList").on("click", ".buttonOnNow", function (e) {
    e.preventDefault();
    // var newCityList = $(citySideList).val();
    // citySideList.push(newCityList)

    var nextCity = this.innerText
    // console.log(this)
    makeWeatherRequest(nextCity)
    // console.log(nextCity)
  })

  function makeWeatherRequest(cityName) {
    // next build urrrl for first API request key}
    $(".cardRow").empty()
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=79f846e03cf3435d40ca0302d0a1b7fb";

    if (cityName == "" || !(isNaN(cityName))) {

      return;
    };
    // console.log(cityName)
    // NEXT make the request to the URL with JQuery ajax
    $.ajax(queryURL).then(function (response) {
      // console.log(cityName)
      var icon = response.weather[0].icon
      var windEl = response.wind.speed
      var windChange = Math.floor(windEl * 2.2)
      var lat = response.coord.lat
      var lon = response.coord.lon
      var tempEl = response.main.temp
      var tempChange = Math.floor((tempEl - 273.15) * 1.8) + 32
      var queryUV = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=79f846e03cf3435d40ca0302d0a1b7fb";

      $("#cityNameHere").text(response.name)
      $("#windSpeed").text("Wind Speed: " + windChange + " MPH")
      $("#iconHere").attr("src", "https://openweathermap.org/img/w/" + icon + ".png")
      $("#humidity").text("Humidity: " + response.main.humidity + " %")
      $("#temperature").text("Temperature: " + tempChange + " °F");

      $.ajax(queryUV).then(function (response) {
        // console.log(response)
        var uvIndex = response.current.uvi
        $("#uvIndex").text("UV Index: " + uvIndex)

        for (var i = 0; i < uvIndex; i++) {

          if (uvIndex <= 3) {
            $("#uvIndex").attr("class", "moderate");
          }

          else if (uvIndex <= 5 && uvIndex > 3) {
            $("#uvIndex").attr("class", "high")
          }
          else if (uvIndex >= 7 && uvIndex > 5) {
            $("#uvIndex").attr("class", "veryHigh")
          }
          else if (uvIndex >= 10 && uvIndex > 7) {
            $("#uvIndex").attr("class", "extreme")
          }
        }

        for (var j = 1; j < 6; j++) {

          fiveDayCall(j, response)

        }
      });
    })
  }

  function fiveDayCall(i, response) {
    var weatherCard = $("<div>").addClass("card col-xs text-white text-nowrap bg-primary m-4 p-2").attr("style", "max-width: 11rem; max-height: 9rem;");
    var icon = $("<h6>")
    var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.daily[i].weather[0].icon + ".png")
    icon.append(image)
    var date = moment().add(i, 'days').calendar("(MMM Do YYYY)");
    var daily = $("<h6>").addClass("card-title text-sm-left font-weight-bold ").text(date)
    var tempOne = response.daily[i].temp.day
    var tempOneNew = Math.floor((tempOne - 273.15) * 1.8) + 32
    var temp = $("<h6>").text("Temp: " + tempOneNew + " °F")
    var humidity = $("<h6>").text("Humidity: " + response.daily[i].humidity + " %")
    weatherCard.append(daily, icon, temp, humidity)
    $(".cardRow").append(weatherCard)
  }



  $(searchButton).on("click", function (e) {
    e.preventDefault();
    handleSearch();

  });


})

