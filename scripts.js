	
/*
	This is where the actual program logic is placed.
	Notice that no part of this section is displayed on the screen.
	The page can be dynamically changed by this code.
*/


//Start of variable declaration block
var rTempHi, rTempLo, rSunHi, rSunLo, rMoistHi, rMoistLo, temp, sun, moist = 0;
var fakeValuesToggle = false;
var interval;
var log = [];
var lastWeekAverages = [
[75, 15040, 10],
[77, 16100, 9],
[79, 16603, 6],
[80, 16810, 4],
[80, 17000, 3],
[76, 15900, 6],
[74, 14900, 9],
[70, 14000, 11],
];
var currDay = 0;
var lookingBack = false;
var weatherGuy = 0;

var date = new Date();
// End of variable declaration block


/* The init() function is the first function to run.
It sets up function execution intervals and initializes 
the extreme values, such as high and low temperatures. */
function init() {
    shortInterval = window.setInterval("fakeValues()",3000);
    longInterval = window.setInterval("resetExtremes();",60000);
    resetExtremes();
    console.log("Today's time and date: "+date.getMonth()+1+"-"+date.getDate()+"-"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds());
}

/* The resetExtremes() function calculates extreme 
values (highs and lows) for temperature, moisture and 
sunlight. These extremes are fed into the random number 
generator which then calculates a random value within 
these extremes. */
function resetExtremes() {
    /* The weatherGuy variable is used to count up to a storm. 
    It is incremented every time this line is executed.
    When it reaches 3, the code simulates a storm. */
    weatherGuy += 1; 
    console.log("resetting extremes...");
    rTempHi = Math.floor(Math.random() * (80 - 76 + 1)) + 76;
    rTempLo = Math.floor(Math.random() * (80 - 75 + 1)) + 75;
    while ((rTempLo > rTempHi) || (rTempLo == rTempHi)) { // If the random value is out of range, calculate a new one.
        rTempLo = Math.floor(Math.random() * (80 - 75 + 1)) + 75;
    }
    rMoistHi = Math.floor((Math.random() * 25) + 2);
    rMoistLo = Math.floor((Math.random() * 25) + 1);
    while ((rMoistLo > rMoistHi) || (rMoistLo == rMoistHi)) { // If the random value is out of range, calculate a new one.
        rMoistLo = Math.floor((Math.random() * 25) + 1);
    }
    rSunHi = Math.floor(Math.random() * (20000 - 16000 + 1)) + 16000;
    rSunLo = Math.floor(Math.random() * (20000 - 15000 + 1)) + 15000;
    while ((rSunLo > rSunHi) || (rSunLo == rSunHi)) { // If the random value is out of range, calculate a new one.
        rSunLo = Math.floor(Math.random() * (20000 - 15000 + 1)) + 15000;
    }
    if (weatherGuy > 2){
        /* This if/then structure simulates a storm when 
        the weatherGuy variable is 3. The extreme values 
        are then set to represent storm conditions. The 
        weatherGuy variable is reset to 0 and an alert 
        message is displayed. */
        rTempHi  = 55;
        rTempLo  = 50;
        rSunHi   = 11000;
        rSunLo   = 10000;
        rMoistHi = 32;
        rMoistLo = 30;
        weatherGuy = 0;
        log.push(date.getMonth()+1+"-"+date.getDate()+"-"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+" Big Storm Alert!!!<br>");
    }
    console.log("Temp new High/Low: "+rTempHi+"/"+rTempLo);
    console.log("Light new High/Low: "+rSunHi+"/"+rSunLo);
    console.log("Moist new High/Low: "+rMoistHi+"/"+rMoistLo);
    return;
}

// The prepareToggle() function allows the user to toggle between real and simulated data.
function prepareToggle() {
    currDay = 0;
    window.clearInterval(shortInterval);
    showPastDaysAvgs();
    /* This if/else structure uses value of the fakeValuesToggle variable 
    to determine whether to show real values or simulated values. */
    if (fakeValuesToggle == true) { 
        /* If the value is true, the toggleBTN button displays the name "Show Real Values" and then the fakeValues() function runs every 3 seconds*/
        document.getElementById('toggleBTN').innerHTML = 'Show Real Data'; // The toggleBTN button displays "Show Real Values".
        document.getElementById('logArea').innerHTML = 'Connecting to sensors... Please wait.';
        shortInterval = window.setInterval("fakeValues()",3000); // Runs the fakeValues() function every 3 seconds.
    } else {
        /* If fakeValuesToggle is not true, the "toggleBTN" button displays the 
        name "Show Simulated Data". It stops the periodic execution of the fakeValues() 
        function and displays "No sensor data available" for sensor values.*/
        document.getElementById('toggleBTN').innerHTML = 'Show Simulated Data'; // The toggleBTN button displays "Show simulated Data".
        window.clearInterval(shortInterval); // Clear the periodic execution of the fakeValues() function.
        // The next four lines set the HTML to display "No sensor data available" for sensor values.
        document.getElementById('logArea').innerHTML = 'No sensors found.'; 
        document.getElementById("tempValue").innerHTML = "No sensor data available.";
        document.getElementById("sunValue").innerHTML  = "No sensor data available.";
        document.getElementById("moistValue").innerHTML= "No sensor data available.";
      }
    fakeValuesToggle=!fakeValuesToggle;
    return;

}

/* The fakeValues() function simulates sensor data by calculating 
random numbers. It uses the high and low values defined in the 
resetExtremes() function above. */
function fakeValues() { 
  /* This if/else loop first tests to ensure that the user is 
  looking at simulated values for today. It does so by checking 
  the lookingBack variable. If the lookingBack variable is set to 
  not true, then the user is looking at today's simulated values.*/
  if (!lookingBack) { /* If !lookingBack, which means that 
  lookingBack is not true, then the code calculates random 
  values for variables temp, sun, and moist. The value of these 
  variables is then displayed. */
    document.getElementById("logArea").innerHTML = "";
    temp = Math.floor(Math.random() * (rTempHi - rTempLo + 1)) + rTempLo;
    sun = Math.floor(Math.random() * (rSunHi - rSunLo + 1)) + rSunLo;
    moist = Math.floor((Math.random() * rMoistHi) + rMoistLo);
    document.getElementById("tempValue").innerHTML =  temp + " F";
    document.getElementById("sunValue").innerHTML  =  sun + " lux";
    document.getElementById("moistValue").innerHTML= moist;
    /* The following if/then structures determine 
    whether or not a WARNING message should display */
    if (temp < 77) { // If temperature drops below 77F, display WARNING message.
        log.push(date.getMonth()+1+"-"+date.getDate()+"-"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+" WARNING: Field temperature dropped below 77F.  Current Value: "+temp+"F<br>");
    }
    if (sun > 17000) { // If sun exposure is higher than 17000, display WARNING message.
        log.push(date.getMonth()+1+"-"+date.getDate()+"-"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+" WARNING: Sun exposure is higher than 17000. Current Value: "+sun+" lux<br>");
    }
    if (moist <5) { // If moisture is below 5...
        log.push(date.getMonth()+1+"-"+date.getDate()+"-"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+" WARNING: Field moisture level is below 5. Current Value: "+moist+"<br>");
    } else if (moist > 20) { // ...or above 20, display WARNING message.
        log.push(date.getMonth()+1+"-"+date.getDate()+"-"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+" WARNING: Field moisture level is above 20.  Current Value: "+moist+"<br>");
      }
    // This if structure allows the log messages to scroll when more than 10 messages are displayed.
    if (log.length > 10) { 
        var j = log.length - 10;
        for (j;j>0;j--) {
            log.shift();
        }
    }
    for (var i=0;i<log.length;i++ ) {
        document.getElementById("logArea").innerHTML += log[i];
    }
  }
}

/* The dayOfWeek(d) function maps the variable d to a 
weekday name using the following values:
sun=0; mon=1; tue=2; wed=3; thu=4; fri=5; sat=6. 
The variable weekDay is declared to assign the 
weekday value in the switch+case structure.		*/
function dayOfWeek(d) {
  var weekDay = "";
  /* The switch+case structure manipulates 
  variables that can assume specific values. In this 
  example, d can switch case between 0 and 6, representing 
  weekdays. The break command causes the dayOfWeek 
  function to terminate when the value of d is located. 
  The program "breaks" to the next line of code, which 
  is the console.log() function. */
  switch(d) {
    case 0:
      weekDay = "Sunday"; 
      break;
    case 1:
      weekDay = "Monday"; 
      break;
    case 2:
      weekDay = "Tuesday"; 
      break;
    case 3:
      weekDay = "Wednesday";
      break;
    case 4:
      weekDay = "Thursday"; 
      break;
    case 5:
      weekDay = "Friday"; 
      break;
    case 6:
      weekDay = "Saturday";
      break;
  }
  console.log(currDay+","+d+","+weekDay);
  return weekDay;
}

/* The showPastDaysAvgs() function calculates yesterday's weekday. */
function showPastDaysAvgs(c) {
  if (c == "nDay") currDay += 1;
  if (c == "pDay") currDay -= 1;
   /* This if structure limits the user to viewing only the 
   last 7 days of historical data. If currDay is <= -6, then 
   the pDay or Previous Day button is disabled. If the currDay 
   is >= 0, then the nDay or Next Day button is disabled. */  
  if ((currDay > -7) && (currDay < 0)) { 
       lookingBack = true; // When true, this variable indicates that the user is currently looking at a day in the past.
    var day = (((date.getDay()+currDay)+7)%7); // The current day is calculated and stored in the variable day.
    // This line displays the value of the dayOfWeek() function.
    document.getElementById("dayValue").innerHTML = dayOfWeek(day); 
    // This line enables the pDay or Previous Day button.
       document.getElementById("pDay").disabled = false; 
    // This line enables the nDay or Next Day button.
       document.getElementById("nDay").disabled = false; 
    // This lines displays the average temperature value for the day.
    document.getElementById("tempValue").innerHTML = lastWeekAverages[lastWeekAverages.length+currDay][0]  + " F"; 
    //This line displays the average light value for the day.
    document.getElementById("sunValue").innerHTML  = lastWeekAverages[lastWeekAverages.length+currDay][1]  + " lux"; 
    //This line displays the average moisture value for the day.
    document.getElementById("moistValue").innerHTML= lastWeekAverages[lastWeekAverages.length+currDay][2]; 
  }
  if (currDay >= 0) {
    lookingBack = false;
    document.getElementById("pDay").disabled = false; // This line enables the pDay or Previous Day button.
    document.getElementById("nDay").disabled = true;  // This line disables the nDay or Next Day button.
    // This line is calculating the current date.
    document.getElementById("dayValue").innerHTML = "Today, "+(date.getMonth()+1)+"-"+date.getDate()+"-"+date.getFullYear();
  }
  if (currDay <= -6) {
    document.getElementById("pDay").disabled = true;  // This line disables the pDay or Previous Day button.
    document.getElementById("nDay").disabled = false; // This line enables the nDay or Next Day button.
  }
}