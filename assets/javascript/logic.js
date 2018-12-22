  // Initialize Firebase//
  var config = {
    apiKey: "AIzaSyDjrnUcbybdii_O6pdKVP_97CeG5g5qBfo",
    authDomain: "trainschedule15.firebaseapp.com",
    databaseURL: "https://trainschedule15.firebaseio.com",
    projectId: "trainschedule15",
    storageBucket: "trainschedule15.appspot.com",
    messagingSenderId: "657930879538"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();
  var nextTrain;
  var untilNext;
  
  // Click handler for adding a new train//

  $("#addTrain").on("click", function(event) {
    event.preventDefault();
    console.log("hello")

  // Capture user inputs and store them into variables
  var newName = $('#train-name-input').val().trim();
  var newDestination = $('#destination-input').val().trim();
  var newStart = $('#firstTrain-input').val().trim();
  var newFrequency = $('#frequency-input').val().trim();

    // Clear the text boxes once pushed//

  $('#train-name-input').val("");
  $('#destination-input').val("");
  $('#firstTrain-input').val("");
  $('#frequency-input').val("");
    
  // Calculated variables - momentjs - COME BACK LATER//

      // First Time (pushed back 1 year to make sure it comes before current time)
      var firstTimeConverted = moment(newStart, "HH:mm").subtract(1, "years");
      console.log(firstTimeConverted);

      // Current Time
      var currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

      // Difference between the times
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      console.log("DIFFERENCE IN TIME: " + diffTime);

      // Time apart (remainder)
      var tRemainder = diffTime % newFrequency;
      console.log(tRemainder);

      // Minute Until Train
      var untilNext = newFrequency - tRemainder;
      console.log("MINUTES TILL TRAIN: " + untilNext);

      // Next Train
      nextTrain = moment().add(untilNext, "minutes");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
      nextTrain = moment(nextTrain).format("HH:mm");
 
// Create local temporary object to hold the new train data//

var newTrain = {
  name: newName,
  destination: newDestination,
  start: newStart,
  frequency: newFrequency,
  next: nextTrain,
  until: untilNext,
};

// Push to firebase//

database.ref().push(newTrain);
console.log(newTrain);

 })

  // Create new row when train is added - pulling the data in from Firebase//

  database.ref().on("child_added", function(childSnapshot) {
  
    var newName = childSnapshot.val().name;
    var newDestination = childSnapshot.val().destination;
    var newFrequency = childSnapshot.val().frequency;
    var nextTrain = childSnapshot.val().next;
    var untilNext = childSnapshot.val().until;
  
    var newRow = $("<tr>").append(
      $("<td>").text(newName),
      console.log(newName),
      $("<td>").text(newDestination),
      console.log(newDestination),
      $("<td>").text(newFrequency),
      console.log(newFrequency),
      $("<td>").text(nextTrain),
      console.log(nextTrain),
      $("<td>").text(untilNext),
      console.log(untilNext),
    );

  $("#tableBody").append(newRow);
  });