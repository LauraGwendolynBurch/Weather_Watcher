$(document).ready(function(){
      // var  = $(this).attr("data-");
      // var time = moment().format("MMM Do YYYY"); 
      // var hour = moment().format("h");
      // $("#currentDay").append(time);
      var city = $("#searchCity")


  //  when user clicks search button
  // $("button").on("click", function() { or?
  function handleSearch(){

    // THEN I get the value that is entered into the search input
    makeWeatherRequest(search);
  }
      
  function makeWeatherRequest(search){
    // next build urrrl for first API request
    var queryURL = "https://api.openweathermap.org/data/2.5/onecall?" + "&appid=a6f6ba7128a694d4c8ca6dff399acbd3";
    console.log(queryURL)

    // NEXT make the request to the URL with JQuery ajax
    $.ajax( queryURL ).then(function(response) {
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

  
    // $.ajax({
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
})
