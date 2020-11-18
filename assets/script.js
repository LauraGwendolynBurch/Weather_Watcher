$(document).ready(function(){
    
    var citySideList = $(".cityList");
    var searchButton=$("#searchEl");
    var search = $("#inputEl");
    var previousCities = [];
    var storage = JSON.parse(localStorage.getItem("city"))
    // get all searched cities, for loop, push to previousCities for each city
    // then render function that loops through all previousCities, added button and appends to citySideList
    // for (var i = 0; i < storage.length; index++) {
    //   previousCities.push(storage)
    //   console.log()
      
    // }
  //  when user clicks search button
  function handleSearch(){

    var cityName = search.val();
    var upperCaseCity = cityName.toUpperCase(); 
    // THEN I get the value that is entered into the search input
    makeWeatherRequest(upperCaseCity);
    var time = moment().format("MMM Do YYYY"); 
    $("#currentDay").text(time);
    $("#cityNameHere").text(upperCaseCity);
    previousCities.push(cityName);
    localStorage.setItem("city", JSON.stringify(previousCities))
    // $("#iconHere").append(icon);
    // $(".cityList").text(upperCaseCity);
    renderButton()
  }
     
  function renderButton(){
    console.log(citySideList)
    for (var i=0; i < previousCities.length; i++) {
    var sideBtn =$("<button>")
    var listEl =$("<ul>").text(previousCities[i]);
    listEl.append(sideBtn)
    $(".cityList").text(listEl)
    
      
    }
}

  // add a click event to the side cities
    $( ".cityList").on("click", function(e){
      e.preventDefault();
      // var newCityList = $(citySideList).val();
      // citySideList.push(newCityList)
      makeWeatherRequest(cityName)

    })

  function makeWeatherRequest(cityName){
    // next build urrrl for first API request key}
    var queryURL ="http://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&appid=79f846e03cf3435d40ca0302d0a1b7fb";
    // console.log(cityName)
    

    // NEXT make the request to the URL with JQuery ajax
    $.ajax( queryURL ).then(function(response) {
      console.log(response)
      var icon=response.weather[0].icon
      $("#windSpeed").text("Wind Speed: " + response.wind.speed + " MPH")
      $("#iconHere").attr("src", "http://openweathermap.org/img/w/" + icon + ".png")
      $("#humidity").text("Humidity: " + response.main.humidity + " %")
      var tempEl = response.main.temp
      
      $("#temperature").text("Temperature: " + ((tempEl-273.15)*1.8)+32 + " °F");
      // var lat=search.val()
      // var lon=search.val()
      // var queryUV="http://api.openweathermap.org/data/2.5/uvi?lat="+ lat +" &lon= "+ lon +" &appid=79f846e03cf3435d40ca0302d0a1b7fb";
      // $.ajax( queryUV ).then(function(response) {
        // console.log(response)

      // START rendering data to the HTML

      // Then get the lat and log out of thr 'response object'

      // NEXT call"makeOneCallRequest( lat, lng )' and pass in the lat and lng.
    // });
    });
  } 
    
  function makeOneCallRequest ( lat, lng ){

    // NEXT, build the url for 1st api request 
    // 

    // next, make the rrequest to the url with jquery ajax
    $.ajax( queryURL ).then(function(response) {

      // finish rendering data to the html


  });


  //   $.ajax({
  //       url: "",
  //       method: "GET"
  //     }).then(function(response) {
  //       console.log(response);
  //     });
  // } 



  }
      
  
  // var clearButton = $("#button")

  // function buttonClear(){
  //   localStorage.clear();
  //   location.reload();
  // }

  //create button event to call the clearing of local storage 
  // $(clearButton).on("click",buttonClear)
  
  
  $(searchButton).on("click",function(e){
    e.preventDefault();
    handleSearch();
  });

 
})

