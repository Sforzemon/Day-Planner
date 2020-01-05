$( document ).ready(function() {
// New way to set time...
  $(".current-time").text(moment().format('MMMM Do YYYY, h:mm:ss A'));
  function update() {
    $(".current-time").text(moment().format('MMMM Do YYYY, h:mm:ss A'));
  };
  function setTime() {
  setInterval(update, 1000);
  };
//Setting up my time slots
//Create each row, 3 columns, and assign classes based onwhat the column should do and the time.
//I set the function to check the time, then create PM or AM rows. 
//It will then create the button
// append the row and then the following columns
// It assigns classes, and checks the row variable checkTime against moment() to apply past present or future classes.
  function createPlanner() {
    for (j = 9; j < 18; j++){
      if (j >= 12){
        var newTextCol = $("<div>", {id: j, "class": "textCol col-9"});
        var checkTime = j
        if ( j > 12){
          var PM = j - 12;
        }
        else {
          var PM = 12;
        }
        var newRow = $("<div>", {id: PM + "-PM", "class": "row"});
        var newTimeCol = $("<div>", {"class": "timeCol col-2"});
        
        var newSaveCol = $("<div>", {"class": "saveCol col-1"});
        newTimeCol.text(PM + " PM");
      }
      else {
        var AM = [j]
        var checkTime = j;
        var newRow = $("<div>", {id: AM + "-AM", "class": "row"});
        var newTimeCol = $("<div>", {"class": "timeCol col-2"});
        var newTextCol = $("<div>", {id: j, "class": "textCol col-9"});
        var newSaveCol = $("<div>", {"class": "saveCol col-1"});
        newTimeCol.text(AM + " AM");
      } 
      var saveButton = $("<button>", {"class": "saveButton"});
      $(".planner-body").append(newRow);
      newRow.append(newTimeCol, newTextCol, newSaveCol);
      var inputText = $('<textarea>').attr({"placeholder": "So, what should I remember for you?"});
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
    }
  }

//This next function will display the text in the same row as the button that was pressed to save.
  var storedReminder = [];
  if (localStorage.getItem('storedReminder') !== null) {
    storedReminder = JSON.parse(localStorage.getItem('storedReminder'));
  }
  function showReminders() {
     for (l = 0; l < storedReminder.length; l++) {
       for (x = 9; x < 18; x++) {
      if (x == storedReminder[l].key) {
        $("#" + x).children().val(storedReminder[l].value)
      }
    }
    }
  }
  // Making that save button work.
  function saveReminder() {  
    console.log($(this).parent().siblings(".textCol").attr("id"))
    console.log($(this).parent().siblings(".textCol").children().val()) 
    var savedReminder = {
      key: $(this).parent().siblings(".textCol").attr("id"), 
      value: $(this).parent().siblings(".textCol").children().val()
    }
    var keyCheck = 999;
    // console.log($(this).parent().siblings(".textCol").attr("id"))
    // console.log($(this).parent().siblings(".textCol").children().val())
    if (storedReminder.length === 0) {
      storedReminder.push(savedReminder);
      console.log("did this work?")
    } 
    else {
      for (var k = 0; k < storedReminder.length; k++) {
        if (savedReminder.key === storedReminder[k].key) {
          console.log("true")
          keyCheck = k;
          console.log(k + "this is k")
          console.log(keyCheck)
        } 
      }
      if (keyCheck === 999) {
        storedReminder.push(savedReminder);
        console.log(keyCheck + " if statement")
      }
      else {
        storedReminder[keyCheck].key = savedReminder.key;
        storedReminder[keyCheck].value = savedReminder.value;
        console.log(keyCheck + " else statement")
      } 
    }
    localStorage.setItem('storedReminder', JSON.stringify(storedReminder));
  };
  //Calling the clock that is displayed on the Jumbotron.
  setTime();
  //Calling the row and column div creation
  createPlanner();
  //calling Local Storage saving on button click
  $(document).on("click", ".saveButton", saveReminder);
  //Calling Display Storage
  showReminders();
});



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