//Create a console.log to confirm that the javascript file is connected. 
console.log("This java file is linked");

//BEGIN DOCUMENT READY!!!!!
$(document).ready(function() {

//Create a var for API key
var api_key = "lYDMPf6QY9UggTQK6AoI5J6nt6PrRcQQ";

//var for user's input
// userInput = 

//Create an array based on a specific topic
var teams = ["Atlanta Braves", "Washington Nationals", "New York Mets", "Philadelphia Phillies", "Miami Marlins"];



//Create a loop that will go through the array and create buttons on the buttons div. I confirmed that the loop is working. 
for (i = 0; i < teams.length; i++) {

    //Create a variable to hold the values of the array individually.  Notice the array is called Topics because it is hold multiple values and the variable is called topic because we will pull one value from the array via loop. 
    team = teams[i];

    //Instructions on creating a button for each value on the array. 
    $("#buttons-row").append("<button data-team = '" + team + "' > " + team + " </button>");
    console.log("<button data-team = '" + team + "' > " + team + " </button>");
}

$("button").on("click", function() {
    var team = $(this).attr("data-team");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + api_key + "&q=" + team + "&limit=10&offset=0&rating=G&lang=en";
    console.log(queryURL);

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;
        console.log(response);

        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div>"); //creates a div for the gif results

          var rating = results[i].rating; //setting a variable for ratings

          var p = $("<p>").text("Rating: " + rating);  //creating a paragraph that displays the text: "Rating: + results[i].rating"

          var teamImage = $("<img>"); //setting a variable for the creation of an image
          teamImage.attr("src", results[i].images.fixed_height.url); //setting an attribute for the teamImage.  We will use the URL from the database to pull gif. 

          gifDiv.prepend(p);  //This will create and prepend a paragraph onto the HTML.
          gifDiv.prepend(teamImage);//This will prepend the image/gif onto the HTML.

          $("#results-row").prepend(gifDiv);
        }
      });
  });


}); //END OF DOCUMENT READY!!!!
