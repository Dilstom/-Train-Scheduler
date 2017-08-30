var now = moment().format("HH:mm:ss"); 
$("#headerClock").text("Current Time: " + now);  

var config = {
    apiKey: "AIzaSyCFdh7BeiKB9Gzgsv5XwgJoecodrCqPJAU",
    authDomain: "train-e4dfb.firebaseapp.com",
    databaseURL: "https://train-e4dfb.firebaseio.com",
    projectId: "train-e4dfb",
    storageBucket: "",
    messagingSenderId: "550458782796"
  };
  firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

// Capture Button Click
$("#submit").on("click", function(event){
// prevent page from refreshing when form tries to submit itself
    event.preventDefault();
    
// creating vars for storing input info
    var trainName = $("#train-name").val().trim();
    var destinN = $("#destination").val().trim();
    var firstTrain = $("#first-train").val().trim();
    var freqCy = $("#frequency").val().trim();

// Console log each of the user inputs to confirm we are receiving them
    var newTrain = {
        name: trainName,
        destiNew: destinN,
        firstArriv: firstTrain,
        frequan: freqCy
    };
    
    database.ref().push(newTrain);
    
    console.log(newTrain.name);
    console.log(newTrain.destiNew);
    console.log(newTrain.firstArriv);
    console.log(newTrain.frequan);
// Alert
    alert("New Train successfully added");
      
// Clear all of the text-boxes
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train").val("");
    $("#frequency").val("");
});
// 3. Create Firebase event for adding new train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());

// Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destinN= childSnapshot.val().destiNew;
    var firstTrain = childSnapshot.val().firstArriv;
    var freqCy = childSnapshot.val().frequan;
    
// Train Info
    console.log(trainName);
    console.log(destinN);
    console.log(firstTrain);
    console.log(freqCy);
// Prettify the arrival time
   var newArrivalTime = moment.unix(firstTrain).format("HH:mm");
//calculate the minutes left to the next arrival
var newMinutes = moment().diff(moment.unix(firstTrain, "X"), "minutes");
    console.log(newMinutes);

//Calculate the frequency
//    var frequen = 
    
//Add each train's data into the table
   $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destinN + "</td><td" + firstTrain + "</td><td>" + freqCy + "</td></tr>");
    
});
//
//
//    var convertedDate = moment(randomDate, randomFormat);
//console.log(moment(convertedDate).format("hh:mm"));