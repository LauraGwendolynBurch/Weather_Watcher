$(document).ready(function(){
    
    // var citySideList = $(".cityList");
    var searchButton=$("#searchEl");
    var search = $("#inputEl");
    var previousCities = [];
    var storage = JSON.parse(localStorage.getItem("city")) || []
    

    // get all searched cities, for loop, push to previousCities for each city
    // then render function that loops through all previousCities, added button and appends to citySideList
    for (var i = 0; i < storage.length; i++){
      previousCities.push(storage[i])
      console.log(storage[0])
      
    }
  //  when user clicks search button
  function handleSearch(){

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
  

     
  function renderButton(){
    // console.log(citySideList)
    $(".cityList").empty()
    console.log(previousCities)
    for (var i=0; i < previousCities.length; i++) {
    var sideBtn =$("<button>").text(previousCities[i]).addClass("buttonOnNow");
    var listEl =$("<li>")
    listEl.append(sideBtn)
    $(".cityList").append(listEl)
    }
  }

  // $(".clickBtn").on("click", function(){
    
  //   console.log(this)
  // });

  // add a click event to the side cities
    $(".cityList").on("click", ".buttonOnNow", function(e){
      e.preventDefault();
      // var newCityList = $(citySideList).val();
      // citySideList.push(newCityList)
      
      var nextCity =this.innerText
      console.log(this)
      makeWeatherRequest(nextCity)
      console.log(nextCity)
    })

  function makeWeatherRequest(cityName){
    // next build urrrl for first API request key}
    var queryURL ="https://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&appid=79f846e03cf3435d40ca0302d0a1b7fb";
    // console.log(cityName)
    if (cityName == "" || !(isNaN(cityName))){
      
      return;
    };

    // NEXT make the request to the URL with JQuery ajax
    $.ajax( queryURL ).then(function(response) {
      // console.log(response)
      var icon=response.weather[0].icon
      var windEl = response.wind.speed
      var windChange=Math.floor(windEl * 2.2)
      var lat=response.coord.lat
      var lon=response.coord.lon
      var tempEl = response.main.temp
      var tempChange=Math.floor((tempEl-273.15)*1.8)+32
      var queryUV="https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=79f846e03cf3435d40ca0302d0a1b7fb";
      
      $("#cityNameHere").text(cityName)
      $("#windSpeed").text("Wind Speed: " + windChange + " MPH")
      $("#iconHere").attr("src", "https://openweathermap.org/img/w/" + icon + ".png")
      $("#humidity").text("Humidity: " + response.main.humidity + " %")
      $("#temperature").text("Temperature: " + tempChange + " °F");
      
    $.ajax( queryUV ).then(function(response) {
        // console.log(response)
        var uvIndex=response.current.uvi
        $("#uvIndex").text("UV Index: " + uvIndex)
       
        for(var i = 0; i < uvIndex; i++){
          
          if (uvIndex <= 3 ){
            $("#uvIndex").attr("class", "moderate");
          }
          
          else if (uvIndex <= 5 && uvIndex >3 ){
            $("#uvIndex").attr("class", "high")
          }
          else if (uvIndex >= 7 && uvIndex >5 ){
            $("#uvIndex").attr("class", "veryHigh")
          }
          else if (uvIndex >= 10 && uvIndex >7 ) {
            $("#uvIndex").attr("class", "extreme")
          }
       }
      
       var daily = moment().add(1, 'days').calendar("(MMM Do YYYY)");   
       var iconDayOne=response.daily[1].weather[0].icon
       var tempOne=response.daily[1].temp.day
       var tempOneNew=Math.floor((tempOne-273.15)*1.8)+32
       $("#fiveDay").text(daily);
       $("#dayIcon").attr("src", "https://openweathermap.org/img/w/" + iconDayOne + ".png")
       $("#dayTemp").text("Temp: " + tempOneNew + " °F");
       $("#dayHumidity").text("Humidity: " + response.daily[1].humidity + " %")

       var daily2 = moment().add(2, 'days').calendar("(MMM Do YYYY)");   
       var iconDayOne2=response.daily[2].weather[0].icon
       var tempOne2=response.daily[2].temp.day
       var tempOneNew2=Math.floor((tempOne2-273.15)*1.8)+32
       $("#fiveDay2").text(daily2);
       $("#dayIcon2").attr("src", "https://openweathermap.org/img/w/" + iconDayOne2 + ".png")
       $("#dayTemp2").text("Temp: " + tempOneNew2 + " °F");
       $("#dayHumidity2").text("Humidity: " + response.daily[2].humidity + " %")

       var daily3 = moment().add(3, 'days').calendar("(MMM Do YYYY)");   
       var iconDayOne3=response.daily[3].weather[0].icon
       var tempOne3=response.daily[3].temp.day
       var tempOneNew3=Math.floor((tempOne3-273.15)*1.8)+32
       $("#fiveDay3").text(daily3);
       $("#dayIcon3").attr("src", "https://openweathermap.org/img/w/" + iconDayOne3 + ".png")
       $("#dayTemp3").text("Temp: " + tempOneNew3 + " °F");
       $("#dayHumidity3").text("Humidity: " + response.daily[3].humidity + " %")

       var daily4 = moment().add(4, 'days').calendar("(MMM Do YYYY)");   
       var iconDayOne4=response.daily[4].weather[0].icon
       var tempOne4=response.daily[4].temp.day
       var tempOneNew4=Math.floor((tempOne4-273.15)*1.8)+32
       $("#fiveDay4").text(daily4);
       $("#dayIcon4").attr("src", "https://openweathermap.org/img/w/" + iconDayOne4 + ".png")
       $("#dayTemp4").text("Temp: " + tempOneNew4 + " °F");
       $("#dayHumidity4").text("Humidity: " + response.daily[4].humidity + " %")

       var daily5 = moment().add(5, 'days').calendar("(MMM Do YYYY)");   
       var iconDayOne5=response.daily[5].weather[0].icon
       var tempOne5=response.daily[5].temp.day
       var tempOneNew5=Math.floor((tempOne5-273.15)*1.8)+32
       $("#fiveDay5").text(daily5);
       $("#dayIcon5").attr("src", "https://openweathermap.org/img/w/" + iconDayOne5 + ".png")
       $("#dayTemp5").text("Temp: " + tempOneNew5 + " °F");
       $("#dayHumidity5").text("Humidity: " + response.daily[5].humidity + " %")
    });
  })
}

 
  
  
  $(searchButton).on("click",function(e){
    e.preventDefault();
    handleSearch();

  });

 
})

