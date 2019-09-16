//Create a console.log to confirm that the javascript file is connected. 
console.log("This java file is linked");

//BEGIN DOCUMENT READY!!!!!
$(document).ready(function() {

//Create an array based on a specific topic
var topics = ["car", "bus", "truck"];


//Create a loop that will go through the array and create buttons on the buttons div. I confirmed that the loop is working. 
for (i = 0; i < topics.length; i++) {

    //Create a variable to hold the values of the array individually.  Notice the array is called Topics because it is hold multiple values and the variable is called topic because we will pull one value from the array via loop. 
    topic = topics[i];

    console.log(topic);

    $("#buttons-row").append("<button> " + topic + " </button>");
}



}); //END OF DOCUMENT READY!!!!
