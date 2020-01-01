// Display the time in the jumbotron
function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  
  function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    //convert from 24hour to 12hour clock
    if (h >= 13) {
        h = h-12;
    }
    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);
    $(".current-time").text(h + ":" + m + ":" + s);
    t = setTimeout(function() {
      startTime()
    }, 500);
  }
  startTime();

  //Set up my time slots