
// var readyToRun = function() {
//   console.log("I am so ready");
// }
//
// $(document).ready(readyToRun);


//dollar sign is a jQuery thing
//calls function after page is loaded
$(document).ready(function() {
  $("#weatherSubmit").click(function(e) {
  	e.preventDefault();
  	var value = $("#weatherInput").val();
    // console.log(value);
    var myurl= "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=ba4f54bf17aace73be2f0c7b5679389c";
    $.ajax({
      url : myurl,
      dataType : "json",
      success : function(json) {
        console.log(json);
        var results = "";
        results += '<h2>Weather in ' + json.name + "</h2>";
        for (var i=0; i<json.weather.length; i++) {
            results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
        }
        results += '<h2>' + json.main.temp + " &deg;F</h2>"
        results += "<p>"
        for (var i=0; i<json.weather.length; i++) {
            results += json.weather[i].description
            if (i !== json.weather.length - 1)
        	   results += ", "
        }
        results += "</p>";
        results += "<p>"
        results += "Wind Speed: " + json.wind.speed + " Wind Direction: " + json.wind.deg + " deg";
        results += "</p>";
        $("#weatherResults").html(results);
      }
    });

  });

  $("#stackSubmit").click(function(e) {
  	e.preventDefault();
  	var value = $("#stackInput").val();
    // console.log(value);
    var myurl= "https://api.stackexchange.com/2.2/search?order=desc&sort=relevance&site=stackoverflow&intitle=" + value;
    $.ajax({
      url : myurl,
      dataType : "json",
      success : function(json) {
        console.log(json);
        var results = "";

        results += "<h2>Top ten relevant answers:</h2>";

        for (var i = 0; i < 10; i++) {
          results += "<p>";
          results += "<a href=" + json.items[i].link + ">" + json.items[i].title + "</a>";
          results += "</p>";
        }

        $("#stackResults").html(results);
      }
    });

  });
});
