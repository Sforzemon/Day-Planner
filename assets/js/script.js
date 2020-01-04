$( document ).ready(function() {
// Display the time in the jumbotron
// Missed the whole use Moment thing... On the plus side, my way worked.
// function checkTime(i) {
//     if (i < 10) {
//       i = "0" + i;
//     }
//     return i;
//   }
  
//   function startTime() {
//     var today = new Date();
//     var h = today.getHours();
//     var m = today.getMinutes();
//     var s = today.getSeconds();
//     //convert from 24hour to 12hour clock
//     if (h >= 13) {
//         h = h-12;
//     }
//     else if (h < 1) {
//         h = 12;
//     }
//     m = checkTime(m);
//     s = checkTime(s);
//     $(".current-time").text(h + ":" + m + ":" + s);
//     t = setTimeout(function() {
//       startTime()
//     }, 500);
//   }
//   startTime();

// New way to set time...
$(".current-time").text(moment().format('MMMM Do YYYY, h:mm:ss A'));
  //Set up my time slots
  var startHour = 9;
  var endHour = 5;
  function createPlanner() {
    for (j = 9; j < 18; j++){
      if (j >= 12){
        var newRow = $("<div>", {id: j, "class": "row"});
        var checkTime = j
        console.log(checkTime);
        if ( j > 12){
          var PM = j - 12;
        }
        else {
          var PM = 12;
        }
        var newTimeCol = $("<div>", {"class": "timeCol col-2"});
        var newTextCol = $("<div>", {id: PM + " PM", "class": "TextCol col-9"});
        var newSaveCol = $("<div>", {"class": "SaveCol col-1"});
        newTimeCol.text(PM + " PM");
        // console.log(checkTime);

      }
      else {
        var AM = [j]
        var checkTime = j;
        console.log(checkTime);
        var newRow = $("<div>", {id: j, "class": "row"});
        var newTimeCol = $("<div>", {"class": "timeCol col-2"});
        var newTextCol = $("<div>", {id: AM + " AM", "class": "TextCol col-9"});
        var newSaveCol = $("<div>", {"class": "SaveCol col-1"});
        newTimeCol.text(AM + " AM");
        // console.log(checkTime)
      }
      var saveButton = $("<button>", {"class": "saveButton"});
      $(".planner-body").append(newRow);
      newRow.append(newTimeCol, newTextCol, newSaveCol);
      var inputText = $('<textarea class="h-100 w-100" placeholder="So, what should I remember for you?">');
      newTextCol.append(inputText);
      newSaveCol.append(saveButton);
      var HH = parseInt(moment().format('HH'), 10);
      if (checkTime < HH) {
        newTextCol.addClass("past");
      }
      else if (checkTime > HH) {
        newTextCol.addClass("future");
      }
      else {
        newTextCol.addClass("present");
      }
      console.log(HH);
      console.log(checkTime);
    }
  }
  createPlanner();
  // function colorFields () {
  //   var rowArray = 
  // }

});