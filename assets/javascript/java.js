//Create a console.log to confirm that the javascript file is connected. 
console.log("This java file is linked");


//Create a var for API key
var api_key = "lYDMPf6QY9UggTQK6AoI5J6nt6PrRcQQ";


//Create an array based on a specific topic
var teams = ["Atlanta Braves", "Washington Nationals", "New York Mets", "Philadelphia Phillies", "Miami Marlins"];

//CREATE FUNCTION TO DISPLAY GIFS USING AJAX
function displayGifs() {
  $(document).on("click", ".team", function () {
    var team = $(this).attr("data-team");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + api_key + "&q=" + team + "&limit=10&offset=0&rating=G&lang=en";
    console.log(queryURL);

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function (response) {
        var results = response.data;
  console.log(response);

        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div>"); //creates a div for the gif results
          gifDiv.addClass("gifs");
          
          var rating = results[i].rating; //setting a variable for ratings
          console.log(results[i]);
          var p = $("<p>").text("Rating: " + rating);  //creating a paragraph that displays the text: "Rating: + results[i].rating"

          var teamImage = $("<img>"); //setting a variable for the creation of an image
          teamImage.attr("src", results[i].images.fixed_height.url); //setting an attribute for the teamImage.  We will use the URL from the database to pull gif. 
          
          teamImage.attr("data-still", results[i].images.fixed_height_still.url);
          teamImage.attr("data-animate", results[i].images.fixed_height.url);
          teamImage.attr("data-state", "still");
          teamImage.addClass("motion");

          gifDiv.prepend(p);  //This will create and prepend a paragraph onto the HTML.
          gifDiv.prepend(teamImage);//This will prepend the image/gif onto the HTML.

          $("#results-row").prepend(gifDiv);
        }
      });
  });
} //END FUNCTION TO DISPLAY GIFS USING AJAX***********************************



//FUNCTION FOR DISPLAYING BUTTONS IN ARRAY************************************
function renderbuttons() {

  //Deleting the team buttons prior to adding new team buttons
  $("#buttons-row").empty();

  //loop through the array of movies
  for (var i = 0; i < teams.length; i++) {

    //call a variable that will create a button
    var a = $("<button>");

    //Add a class
    a.addClass("team");
    a.addClass("btn btn-primary btn-lg btn-block");

    //Adding a data-attribute with a value of the team at index i
    a.attr("data-team", teams[i]);


    //Providing the buttons'text with a a value of the team at index i
    a.text(teams[i]);

    //Add button to html
    $("#buttons-row").append(a);
  } //END FUNCTION FOR DISPLAYING BUTTON IN ARRAY*******************************

}

//FUCTION TO ADD TEAM BUTTON*******************************************
$("#add-team").on("click", function (event) {

  //prevent form from trying to submit itself
  event.preventDefault();

  //Empty team input box
  $("#team-input").empty();

  //Grab the text from the input box
  var team = $("#team-input").val().trim();

  //Push the team input to the array
  teams.push(team);

  //call the render function the render the teams in the array
  renderbuttons();

}) //END FUNCTION TO ADD TEAM BUTTON************************************

// buttonClass = (".btn btn-primary btn-lg btn-block");
$(document).on("click", ".team", displayGifs);


//Call the renderbuttons function to list the original array.
renderbuttons();

//FUNCTION TO PAUSE GIFS**************************************************

  $(document).on("click", ".motion", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {  
      $(this).attr("src", $(this).attr("data-animate")); 
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
 //END OF FUNCTION TO PAUSE GIFS*****************************************

pauseGifs();
