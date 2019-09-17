//Create a console.log to confirm that the javascript file is connected. 
console.log("This java file is linked");


//Create a var for API key
var api_key = "lYDMPf6QY9UggTQK6AoI5J6nt6PrRcQQ";


//Create an array based on a specific topic
var teams = ["Atlanta Braves", "Washington Nationals", "New York Mets", "Philadelphia Phillies", "Miami Marlins"];

//CREATE FUNCTION TO DISPLAY GIFS USING AJAX
function displayGifs() {
  $("button").on("click", function () {
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
          gifDiv.addClass("col");

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
} //END FUNCTION TO DISPLAY GIFS USING AJAX***********************************



//FUNCTION FOR DISPLAYING BUTTONS IN ARRAY************************************
function renderbuttons() {

  //Deleting the movie buttons prior to adding new team buttons
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



// $("button").on("click", function() {
//     var team = $(this).attr("data-team");
//     var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + api_key + "&q=" + team + "&limit=10&offset=0&rating=G&lang=en";
//     console.log(queryURL);

//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     })
//       .then(function(response) {
//         var results = response.data;
//         console.log(response);

//         for (var i = 0; i < results.length; i++) {
//           var gifDiv = $("<div>"); //creates a div for the gif results

//           var rating = results[i].rating; //setting a variable for ratings

//           var p = $("<p>").text("Rating: " + rating);  //creating a paragraph that displays the text: "Rating: + results[i].rating"

//           var teamImage = $("<img>"); //setting a variable for the creation of an image
//           teamImage.attr("src", results[i].images.fixed_height.url); //setting an attribute for the teamImage.  We will use the URL from the database to pull gif. 

//           gifDiv.prepend(p);  //This will create and prepend a paragraph onto the HTML.
//           gifDiv.prepend(teamImage);//This will prepend the image/gif onto the HTML.

//           $("#results-row").prepend(gifDiv);
//         }
//       });
//   });


// }); //END OF DOCUMENT READY!!!!
