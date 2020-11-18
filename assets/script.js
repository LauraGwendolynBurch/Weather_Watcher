$(document).ready(function(){
    
    var citySideList = $(".cityList");
    var searchButton=$("#searchEl");
    var search = $("#inputEl")

  //  when user clicks search button
  function handleSearch(){

    var cityName = search.val();
    var upperCaseCity = cityName.toUpperCase(); 
    // THEN I get the value that is entered into the search input
    makeWeatherRequest(upperCaseCity);
    var time = moment().format("MMM Do YYYY"); 
    $("#currentDay").text(time);
    $("#cityNameHere").text(upperCaseCity);
    // var icon=upperCaseCity.weather.icon
    // $("#iconHere").append(icon);
    // $(".cityList").text(upperCaseCity);
    renderButton()
  }
     
  function renderButton(){

    for (var i=0; i < citySideList.length; i++) {
    
       var listEl =$("<ul>").text(citySideList[i]);
      $(".cityList").text(listEl)
      
    }


  }

  function makeWeatherRequest(cityName){
    // next build urrrl for first API request key}
    var queryURL ="http://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&appid=79f846e03cf3435d40ca0302d0a1b7fb";
    // console.log(cityName)
    

    // NEXT make the request to the URL with JQuery ajax
    $.ajax( queryURL ).then(function(response) {
      console.log(response)
      // START rendering data to the HTML

      // Then get the lat and log out of thr 'response object'

      // NEXT call"makeOneCallRequest( lat, lng )' and pass in the lat and lng.

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

  $(document).on("click", ".cityList", handleSearch);
  

})

