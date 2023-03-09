// الدوري الاوروبي

var europaName = "Europa League";
var europaleague = new XMLHttpRequest();
europaleague.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var scoreboard = JSON.parse(this.responseText);
    var tableBody = document.getElementById("scoreboard");
    // Create a new row for the league name
    var leagueRow = tableBody.insertRow();
    var leagueCell = leagueRow.insertCell();
    leagueCell.colSpan = "5";
    leagueCell.innerHTML = "<h4>" + europaName + "</h4>";

    var today = new Date();
    today.setHours(0,0,0,0); // Set time to midnight

for (var i = 0; i < scoreboard.events.length; i++) {
  var event = scoreboard.events[i];
  var eventDate = new Date(event.date);
  var today = new Date();
  var yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  
  // قبل المباراة
if (eventDate.toDateString() === today.toDateString() && event.status.type.state == "pre") {
	
	var row = tableBody.insertRow();
    var date = new Date(event.date);
    var time = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    var homeT = event.competitions[0].competitors[0].team.shortDisplayName;
    var awayT = event.competitions[0].competitors[1].team.shortDisplayName;
    var winner = "";
    if (event.competitions[0].competitors[0].score > event.competitions[0].competitors[1].score) {
      winner = homeT;
    } else if (event.competitions[0].competitors[1].score > event.competitions[0].competitors[0].score) {
      winner = awayT;
    }
    var matchup = "";
    if (winner !== "") {
      matchup = "<span style='color:Red;font-weight:bold;'>" + winner + "</span>" + " vs. " + event.competitions[0].competitors[1].team.name;
    } else {
      matchup = "<span style='font-weight:bold;'>" + homeT + " vs. " + awayT + "</span>";
    }
    var score1 = event.competitions[0].competitors[0].score;
    var score2 = event.competitions[0].competitors[1].score;
    var score = score1 + " - " + score2;
    var status = event.status.type.shortDetail;
    
    row.insertCell().innerHTML = time;
    row.insertCell().innerHTML = matchup;
    row.insertCell().innerHTML = status;
    row.insertCell().innerHTML = `<a href='https://europaleague.f20.us#${homeT} vs ${awayT}'/><h5 id='livee'>HD</h5></a>`;
	
}  
  
  
  // لو الماتش يعمل الان
  
   if ((eventDate.toDateString() === today.toDateString() || eventDate.toDateString() === yesterday.toDateString()) && event.status.type.state == "in" ) {
    
    var row = tableBody.insertRow();
    var date = new Date(event.date);
    var time = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    var homeT = event.competitions[0].competitors[0].team.shortDisplayName;
    var awayT = event.competitions[0].competitors[1].team.shortDisplayName;
    var winner = "";
    if (event.competitions[0].competitors[0].score > event.competitions[0].competitors[1].score) {
      winner = homeT;
    } else if (event.competitions[0].competitors[1].score > event.competitions[0].competitors[0].score) {
      winner = awayT;
    }
    var matchup = "";
    if (winner !== "") {
      matchup = "<span style='color:Red;font-weight:bold;'>" + winner + "</span>" + " vs. " + event.competitions[0].competitors[1].team.name;
    } else {
      matchup = homeT + " vs. " + awayT ;
    }
    var score1 = event.competitions[0].competitors[0].score;
    var score2 = event.competitions[0].competitors[1].score;
    var score = score1 + " - " + score2;
    var status = event.status.type.shortDetail;
    row.insertCell().innerHTML = date.toLocaleDateString();
    row.insertCell().innerHTML = time;
    row.insertCell().innerHTML = matchup;
    row.insertCell().innerHTML = score;
    row.insertCell().innerHTML = `<a href='https://europaleague.f20.us#${homeT} vs ${awayT}'/><h5 id='livee'>LIVE</h5></a>`;
  }
  
  // اذا انتهت المباراة
  
  if (eventDate.toDateString() === today.toDateString() && event.status.type.state == "post") {
    // Code for displaying the event
    var row = tableBody.insertRow();
    var date = new Date(event.date);
    var time = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    var homeT = event.competitions[0].competitors[0].team.shortDisplayName;
    var awayT = event.competitions[0].competitors[1].team.shortDisplayName;
    var winner = "";
    if (event.competitions[0].competitors[0].score > event.competitions[0].competitors[1].score) {
      winner = homeT;
    } else if (event.competitions[0].competitors[1].score > event.competitions[0].competitors[0].score) {
      winner = awayT;
    }
    var matchup = "";
    if (winner !== "") {
      matchup = "<span style='color:Red;font-weight:bold;'>" + winner + "</span>" + " vs. " + event.competitions[0].competitors[1].team.name;
    } else {
      matchup = "<span style='color:green;font-weight:bold;'>" + homeT + " vs. " + awayT + "</span>";
    }
    var score1 = event.competitions[0].competitors[0].score;
    var score2 = event.competitions[0].competitors[1].score;
    var score = score1 + " - " + score2;
    var status = event.status.type.shortDetail;
    row.insertCell().innerHTML = `<h6 style='color:gray;'></h6>`;;
    row.insertCell().innerHTML = `<h6 style='color:gray;'></h6>`;
    row.insertCell().innerHTML = matchup;
    row.insertCell().innerHTML = score;
    row.insertCell().innerHTML = `<h6 style='color:gray;'>Full Time</h6>`;
  }
  
  
  
}


  }
};
europaleague.open("GET", "https://site.api.espn.com/apis/site/v2/sports/soccer/uefa.europa/scoreboard", true);
europaleague.send();


// بداية دوري ابطال اوروبا

var championsName = "Champions League";
var championsleague = new XMLHttpRequest();
championsleague.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var scoreboard = JSON.parse(this.responseText);
    var tableBody = document.getElementById("scoreboard");
    // Create a new row for the league name
    var leagueRow = tableBody.insertRow();
    var leagueCell = leagueRow.insertCell();
    leagueCell.colSpan = "5";
    leagueCell.innerHTML = "<h4>" + championsName + "</h4>";

    var today = new Date();
    today.setHours(0,0,0,0); // Set time to midnight

for (var i = 0; i < scoreboard.events.length; i++) {
  var event = scoreboard.events[i];
  var eventDate = new Date(event.date);
  var today = new Date();
  var yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  
  // قبل المباراة
if (eventDate.toDateString() === today.toDateString() && event.status.type.state == "pre") {
	
	var row = tableBody.insertRow();
    var date = new Date(event.date);
    var time = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    var homeT = event.competitions[0].competitors[0].team.shortDisplayName;
    var awayT = event.competitions[0].competitors[1].team.shortDisplayName;
    var winner = "";
    if (event.competitions[0].competitors[0].score > event.competitions[0].competitors[1].score) {
      winner = homeT;
    } else if (event.competitions[0].competitors[1].score > event.competitions[0].competitors[0].score) {
      winner = awayT;
    }
    var matchup = "";
    if (winner !== "") {
      matchup = "<span style='color:Red;font-weight:bold;'>" + winner + "</span>" + " vs. " + event.competitions[0].competitors[1].team.name;
    } else {
      matchup = "<span style='font-weight:bold;'>" + homeT + " vs. " + awayT + "</span>";
    }
    var score1 = event.competitions[0].competitors[0].score;
    var score2 = event.competitions[0].competitors[1].score;
    var score = score1 + " - " + score2;
    var status = event.status.type.shortDetail;
    
    row.insertCell().innerHTML = time;
    row.insertCell().innerHTML = matchup;
    row.insertCell().innerHTML = status;
    row.insertCell().innerHTML = `<a href='https://europaleague.f20.us#${homeT} vs ${awayT}'/><h5 id='livee'>HD</h5></a>`;
	
}  
  
  
  // لو الماتش يعمل الان
  
   if ((eventDate.toDateString() === today.toDateString() || eventDate.toDateString() === yesterday.toDateString()) && event.status.type.state == "in" ) {
    
    var row = tableBody.insertRow();
    var date = new Date(event.date);
    var time = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    var homeT = event.competitions[0].competitors[0].team.shortDisplayName;
    var awayT = event.competitions[0].competitors[1].team.shortDisplayName;
    var winner = "";
    if (event.competitions[0].competitors[0].score > event.competitions[0].competitors[1].score) {
      winner = homeT;
    } else if (event.competitions[0].competitors[1].score > event.competitions[0].competitors[0].score) {
      winner = awayT;
    }
    var matchup = "";
    if (winner !== "") {
      matchup = "<span style='color:Red;font-weight:bold;'>" + winner + "</span>" + " vs. " + event.competitions[0].competitors[1].team.name;
    } else {
      matchup = homeT + " vs. " + awayT ;
    }
    var score1 = event.competitions[0].competitors[0].score;
    var score2 = event.competitions[0].competitors[1].score;
    var score = score1 + " - " + score2;
    var status = event.status.type.shortDetail;
    row.insertCell().innerHTML = date.toLocaleDateString();
    row.insertCell().innerHTML = time;
    row.insertCell().innerHTML = matchup;
    row.insertCell().innerHTML = score;
    row.insertCell().innerHTML = `<a href='https://europaleague.f20.us#${homeT} vs ${awayT}'/><h5 id='livee'>LIVE</h5></a>`;
  }
  
  // اذا انتهت المباراة
  
  if (eventDate.toDateString() === today.toDateString() && event.status.type.state == "post") {
    // Code for displaying the event
    var row = tableBody.insertRow();
    var date = new Date(event.date);
    var time = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    var homeT = event.competitions[0].competitors[0].team.shortDisplayName;
    var awayT = event.competitions[0].competitors[1].team.shortDisplayName;
    var winner = "";
    if (event.competitions[0].competitors[0].score > event.competitions[0].competitors[1].score) {
      winner = homeT;
    } else if (event.competitions[0].competitors[1].score > event.competitions[0].competitors[0].score) {
      winner = awayT;
    }
    var matchup = "";
    if (winner !== "") {
      matchup = "<span style='color:Red;font-weight:bold;'>" + winner + "</span>" + " vs. " + event.competitions[0].competitors[1].team.name;
    } else {
      matchup = "<span style='color:green;font-weight:bold;'>" + homeT + " vs. " + awayT + "</span>";
    }
    var score1 = event.competitions[0].competitors[0].score;
    var score2 = event.competitions[0].competitors[1].score;
    var score = score1 + " - " + score2;
    var status = event.status.type.shortDetail;
    row.insertCell().innerHTML = `<h6 style='color:gray;'></h6>`;;
    row.insertCell().innerHTML = `<h6 style='color:gray;'></h6>`;
    row.insertCell().innerHTML = matchup;
    row.insertCell().innerHTML = score;
    row.insertCell().innerHTML = `<h6 style='color:gray;'>Full Time</h6>`;
  }
  
  
  
}


  }
};
championsleague.open("GET", "https://site.api.espn.com/apis/site/v2/sports/soccer/uefa.champions/scoreboard", true);
championsleague.send();

// بداية الدوري الانجليزي

var premierName = "Premier League";
var premierleague = new XMLHttpRequest();
premierleague.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var scoreboard = JSON.parse(this.responseText);
    var tableBody = document.getElementById("scoreboard");
    // Create a new row for the league name
    var leagueRow = tableBody.insertRow();
    var leagueCell = leagueRow.insertCell();
    leagueCell.colSpan = "5";
    leagueCell.innerHTML = "<h4>" + premierName + "</h4>";

    var today = new Date();
    today.setHours(0,0,0,0); // Set time to midnight

for (var i = 0; i < scoreboard.events.length; i++) {
  var event = scoreboard.events[i];
  var eventDate = new Date(event.date);
  var today = new Date();
  var yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  
  // قبل المباراة
if (eventDate.toDateString() === today.toDateString() && event.status.type.state == "pre") {
	
	var row = tableBody.insertRow();
    var date = new Date(event.date);
    var time = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    var homeT = event.competitions[0].competitors[0].team.shortDisplayName;
    var awayT = event.competitions[0].competitors[1].team.shortDisplayName;
    var winner = "";
    if (event.competitions[0].competitors[0].score > event.competitions[0].competitors[1].score) {
      winner = homeT;
    } else if (event.competitions[0].competitors[1].score > event.competitions[0].competitors[0].score) {
      winner = awayT;
    }
    var matchup = "";
    if (winner !== "") {
      matchup = "<span style='color:Red;font-weight:bold;'>" + winner + "</span>" + " vs. " + event.competitions[0].competitors[1].team.name;
    } else {
      matchup = "<span style='font-weight:bold;'>" + homeT + " vs. " + awayT + "</span>";
    }
    var score1 = event.competitions[0].competitors[0].score;
    var score2 = event.competitions[0].competitors[1].score;
    var score = score1 + " - " + score2;
    var status = event.status.type.shortDetail;
    
    row.insertCell().innerHTML = time;
    row.insertCell().innerHTML = matchup;
    row.insertCell().innerHTML = status;
    row.insertCell().innerHTML = `<a href='https://premierleague.f20.us#${homeT} vs ${awayT}'/><h5 id='livee'>HD</h5></a>`;
	
}  
  
  
  // لو الماتش يعمل الان
  
   if ((eventDate.toDateString() === today.toDateString() || eventDate.toDateString() === yesterday.toDateString()) && event.status.type.state == "in" ) {
    
    var row = tableBody.insertRow();
    var date = new Date(event.date);
    var time = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    var homeT = event.competitions[0].competitors[0].team.shortDisplayName;
    var awayT = event.competitions[0].competitors[1].team.shortDisplayName;
    var winner = "";
    if (event.competitions[0].competitors[0].score > event.competitions[0].competitors[1].score) {
      winner = homeT;
    } else if (event.competitions[0].competitors[1].score > event.competitions[0].competitors[0].score) {
      winner = awayT;
    }
    var matchup = "";
    if (winner !== "") {
      matchup = "<span style='color:Red;font-weight:bold;'>" + winner + "</span>" + " vs. " + event.competitions[0].competitors[1].team.name;
    } else {
      matchup = homeT + " vs. " + awayT ;
    }
    var score1 = event.competitions[0].competitors[0].score;
    var score2 = event.competitions[0].competitors[1].score;
    var score = score1 + " - " + score2;
    var status = event.status.type.shortDetail;
    row.insertCell().innerHTML = date.toLocaleDateString();
    row.insertCell().innerHTML = time;
    row.insertCell().innerHTML = matchup;
    row.insertCell().innerHTML = score;
    row.insertCell().innerHTML = `<a href='https://premierleague.f20.us#${homeT} vs ${awayT}'/><h5 id='livee'>LIVE</h5></a>`;
  }
  
  // اذا انتهت المباراة
  
  if (eventDate.toDateString() === today.toDateString() && event.status.type.state == "post") {
    // Code for displaying the event
    var row = tableBody.insertRow();
    var date = new Date(event.date);
    var time = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    var homeT = event.competitions[0].competitors[0].team.shortDisplayName;
    var awayT = event.competitions[0].competitors[1].team.shortDisplayName;
    var winner = "";
    if (event.competitions[0].competitors[0].score > event.competitions[0].competitors[1].score) {
      winner = homeT;
    } else if (event.competitions[0].competitors[1].score > event.competitions[0].competitors[0].score) {
      winner = awayT;
    }
    var matchup = "";
    if (winner !== "") {
      matchup = "<span style='color:Red;font-weight:bold;'>" + winner + "</span>" + " vs. " + event.competitions[0].competitors[1].team.name;
    } else {
      matchup = "<span style='color:green;font-weight:bold;'>" + homeT + " vs. " + awayT + "</span>";
    }
    var score1 = event.competitions[0].competitors[0].score;
    var score2 = event.competitions[0].competitors[1].score;
    var score = score1 + " - " + score2;
    var status = event.status.type.shortDetail;
    row.insertCell().innerHTML = `<h6 style='color:gray;'></h6>`;;
    row.insertCell().innerHTML = `<h6 style='color:gray;'></h6>`;
    row.insertCell().innerHTML = matchup;
    row.insertCell().innerHTML = score;
    row.insertCell().innerHTML = `<h6 style='color:gray;'>Full Time</h6>`;
  }
  
  
  
}


  }
};
premierleague.open("GET", "https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard", true);
premierleague.send();

	  	  

	// الدوري الاسباني

var laligaName = "LaLiga";
var laliga = new XMLHttpRequest();
laliga.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var scoreboard = JSON.parse(this.responseText);
    var tableBody = document.getElementById("scoreboard");
    // Create a new row for the league name
    var leagueRow = tableBody.insertRow();
    var leagueCell = leagueRow.insertCell();
    leagueCell.colSpan = "5";
    leagueCell.innerHTML = "<h4>" + laligaName + "</h4>";

    var today = new Date();
    today.setHours(0,0,0,0); // Set time to midnight

for (var i = 0; i < scoreboard.events.length; i++) {
  var event = scoreboard.events[i];
  var eventDate = new Date(event.date);
  var today = new Date();
  var yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  
  // قبل المباراة
if (eventDate.toDateString() === today.toDateString() && event.status.type.state == "pre") {
	
	var row = tableBody.insertRow();
    var date = new Date(event.date);
    var time = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    var homeT = event.competitions[0].competitors[0].team.shortDisplayName;
    var awayT = event.competitions[0].competitors[1].team.shortDisplayName;
    var winner = "";
    if (event.competitions[0].competitors[0].score > event.competitions[0].competitors[1].score) {
      winner = homeT;
    } else if (event.competitions[0].competitors[1].score > event.competitions[0].competitors[0].score) {
      winner = awayT;
    }
    var matchup = "";
    if (winner !== "") {
      matchup = "<span style='color:Red;font-weight:bold;'>" + winner + "</span>" + " vs. " + event.competitions[0].competitors[1].team.name;
    } else {
      matchup = "<span style='font-weight:bold;'>" + homeT + " vs. " + awayT + "</span>";
    }
    var score1 = event.competitions[0].competitors[0].score;
    var score2 = event.competitions[0].competitors[1].score;
    var score = score1 + " - " + score2;
    var status = event.status.type.shortDetail;
    
    row.insertCell().innerHTML = time;
    row.insertCell().innerHTML = matchup;
    row.insertCell().innerHTML = status;
    row.insertCell().innerHTML = `<a href='https://hesgoal.f20.us#${homeT} vs ${awayT}'/><h5 id='livee'>HD</h5></a>`;
	
}  
  
  
  // لو الماتش يعمل الان
  
   if ((eventDate.toDateString() === today.toDateString() || eventDate.toDateString() === yesterday.toDateString()) && event.status.type.state == "in" ) {
    
    var row = tableBody.insertRow();
    var date = new Date(event.date);
    var time = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    var homeT = event.competitions[0].competitors[0].team.shortDisplayName;
    var awayT = event.competitions[0].competitors[1].team.shortDisplayName;
    var winner = "";
    if (event.competitions[0].competitors[0].score > event.competitions[0].competitors[1].score) {
      winner = homeT;
    } else if (event.competitions[0].competitors[1].score > event.competitions[0].competitors[0].score) {
      winner = awayT;
    }
    var matchup = "";
    if (winner !== "") {
      matchup = "<span style='color:Red;font-weight:bold;'>" + winner + "</span>" + " vs. " + event.competitions[0].competitors[1].team.name;
    } else {
      matchup = homeT + " vs. " + awayT ;
    }
    var score1 = event.competitions[0].competitors[0].score;
    var score2 = event.competitions[0].competitors[1].score;
    var score = score1 + " - " + score2;
    var status = event.status.type.shortDetail;
    row.insertCell().innerHTML = date.toLocaleDateString();
    row.insertCell().innerHTML = time;
    row.insertCell().innerHTML = matchup;
    row.insertCell().innerHTML = score;
    row.insertCell().innerHTML = `<a href='https://hesgoal.f20.us#${homeT} vs ${awayT}'/><h5 id='livee'>LIVE</h5></a>`;
  }
  
  // اذا انتهت المباراة
  
  if (eventDate.toDateString() === today.toDateString() && event.status.type.state == "post") {
    // Code for displaying the event
    var row = tableBody.insertRow();
    var date = new Date(event.date);
    var time = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    var homeT = event.competitions[0].competitors[0].team.shortDisplayName;
    var awayT = event.competitions[0].competitors[1].team.shortDisplayName;
    var winner = "";
    if (event.competitions[0].competitors[0].score > event.competitions[0].competitors[1].score) {
      winner = homeT;
    } else if (event.competitions[0].competitors[1].score > event.competitions[0].competitors[0].score) {
      winner = awayT;
    }
    var matchup = "";
    if (winner !== "") {
      matchup = "<span style='color:Red;font-weight:bold;'>" + winner + "</span>" + " vs. " + event.competitions[0].competitors[1].team.name;
    } else {
      matchup = "<span style='color:green;font-weight:bold;'>" + homeT + " vs. " + awayT + "</span>";
    }
    var score1 = event.competitions[0].competitors[0].score;
    var score2 = event.competitions[0].competitors[1].score;
    var score = score1 + " - " + score2;
    var status = event.status.type.shortDetail;
    row.insertCell().innerHTML = `<h6 style='color:gray;'></h6>`;;
    row.insertCell().innerHTML = `<h6 style='color:gray;'></h6>`;
    row.insertCell().innerHTML = matchup;
    row.insertCell().innerHTML = score;
    row.insertCell().innerHTML = `<h6 style='color:gray;'>Full Time</h6>`;
  }
  
  
  
}


  }
};
laliga.open("GET", "https://site.api.espn.com/apis/site/v2/sports/soccer/esp.1/scoreboard", true);
laliga.send();

	  
	// الدوري الايطالي

var seriaaName = "SeriaA";
var seriaa = new XMLHttpRequest();
seriaa.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var scoreboard = JSON.parse(this.responseText);
    var tableBody = document.getElementById("scoreboard");
    // Create a new row for the league name
    var leagueRow = tableBody.insertRow();
    var leagueCell = leagueRow.insertCell();
    leagueCell.colSpan = "5";
    leagueCell.innerHTML = "<h4>" + seriaaName + "</h4>";

    var today = new Date();
    today.setHours(0,0,0,0); // Set time to midnight

for (var i = 0; i < scoreboard.events.length; i++) {
  var event = scoreboard.events[i];
  var eventDate = new Date(event.date);
  var today = new Date();
  var yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  
  // قبل المباراة
if (eventDate.toDateString() === today.toDateString() && event.status.type.state == "pre") {
	
	var row = tableBody.insertRow();
    var date = new Date(event.date);
    var time = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    var homeT = event.competitions[0].competitors[0].team.shortDisplayName;
    var awayT = event.competitions[0].competitors[1].team.shortDisplayName;
    var winner = "";
    if (event.competitions[0].competitors[0].score > event.competitions[0].competitors[1].score) {
      winner = homeT;
    } else if (event.competitions[0].competitors[1].score > event.competitions[0].competitors[0].score) {
      winner = awayT;
    }
    var matchup = "";
    if (winner !== "") {
      matchup = "<span style='color:Red;font-weight:bold;'>" + winner + "</span>" + " vs. " + event.competitions[0].competitors[1].team.name;
    } else {
      matchup = "<span style='font-weight:bold;'>" + homeT + " vs. " + awayT + "</span>";
    }
    var score1 = event.competitions[0].competitors[0].score;
    var score2 = event.competitions[0].competitors[1].score;
    var score = score1 + " - " + score2;
    var status = event.status.type.shortDetail;
    
    row.insertCell().innerHTML = time;
    row.insertCell().innerHTML = matchup;
    row.insertCell().innerHTML = status;
    row.insertCell().innerHTML = `<a href='http://wcupstreaming.iceiy.com/leads/wcupcf/live/live.html'/><h5 id='livee'>HD</h5></a>`;
	
}  
  
  
  // لو الماتش يعمل الان
  
   if ((eventDate.toDateString() === today.toDateString() || eventDate.toDateString() === yesterday.toDateString()) && event.status.type.state == "in" ) {
    
    var row = tableBody.insertRow();
    var date = new Date(event.date);
    var time = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    var homeT = event.competitions[0].competitors[0].team.shortDisplayName;
    var awayT = event.competitions[0].competitors[1].team.shortDisplayName;
    var winner = "";
    if (event.competitions[0].competitors[0].score > event.competitions[0].competitors[1].score) {
      winner = homeT;
    } else if (event.competitions[0].competitors[1].score > event.competitions[0].competitors[0].score) {
      winner = awayT;
    }
    var matchup = "";
    if (winner !== "") {
      matchup = "<span style='color:Red;font-weight:bold;'>" + winner + "</span>" + " vs. " + event.competitions[0].competitors[1].team.name;
    } else {
      matchup = homeT + " vs. " + awayT ;
    }
    var score1 = event.competitions[0].competitors[0].score;
    var score2 = event.competitions[0].competitors[1].score;
    var score = score1 + " - " + score2;
    var status = event.status.type.shortDetail;
    row.insertCell().innerHTML = date.toLocaleDateString();
    row.insertCell().innerHTML = time;
    row.insertCell().innerHTML = matchup;
    row.insertCell().innerHTML = score;
    row.insertCell().innerHTML = `<a href='http://wcupstreaming.iceiy.com/leads/wcupcf/live/live.html'/><h5 id='livee'>LIVE</h5></a>`;
  }
  
  // اذا انتهت المباراة
  
  if (eventDate.toDateString() === today.toDateString() && event.status.type.state == "post") {
    // Code for displaying the event
    var row = tableBody.insertRow();
    var date = new Date(event.date);
    var time = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    var homeT = event.competitions[0].competitors[0].team.shortDisplayName;
    var awayT = event.competitions[0].competitors[1].team.shortDisplayName;
    var winner = "";
    if (event.competitions[0].competitors[0].score > event.competitions[0].competitors[1].score) {
      winner = homeT;
    } else if (event.competitions[0].competitors[1].score > event.competitions[0].competitors[0].score) {
      winner = awayT;
    }
    var matchup = "";
    if (winner !== "") {
      matchup = "<span style='color:Red;font-weight:bold;'>" + winner + "</span>" + " vs. " + event.competitions[0].competitors[1].team.name;
    } else {
      matchup = "<span style='color:green;font-weight:bold;'>" + homeT + " vs. " + awayT + "</span>";
    }
    var score1 = event.competitions[0].competitors[0].score;
    var score2 = event.competitions[0].competitors[1].score;
    var score = score1 + " - " + score2;
    var status = event.status.type.shortDetail;
    row.insertCell().innerHTML = `<h6 style='color:gray;'></h6>`;;
    row.insertCell().innerHTML = `<h6 style='color:gray;'></h6>`;
    row.insertCell().innerHTML = matchup;
    row.insertCell().innerHTML = score;
    row.insertCell().innerHTML = `<h6 style='color:gray;'>Full Time</h6>`;
  }
  
  
  
}


  }
};
seriaa.open("GET", "https://site.api.espn.com/apis/site/v2/sports/soccer/ita.1/scoreboard", true);
seriaa.send();

  
	// الدوري الالماني

var gerName = "Bundesliga";
var bundesliga = new XMLHttpRequest();
bundesliga.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var scoreboard = JSON.parse(this.responseText);
    var tableBody = document.getElementById("scoreboard");
    // Create a new row for the league name
    var leagueRow = tableBody.insertRow();
    var leagueCell = leagueRow.insertCell();
    leagueCell.colSpan = "5";
    leagueCell.innerHTML = "<h4>" + gerName + "</h4>";

    var today = new Date();
    today.setHours(0,0,0,0); // Set time to midnight

for (var i = 0; i < scoreboard.events.length; i++) {
  var event = scoreboard.events[i];
  var eventDate = new Date(event.date);
  var today = new Date();
  var yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  
  // قبل المباراة
if (eventDate.toDateString() === today.toDateString() && event.status.type.state == "pre") {
	
	var row = tableBody.insertRow();
    var date = new Date(event.date);
    var time = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    var homeT = event.competitions[0].competitors[0].team.shortDisplayName;
    var awayT = event.competitions[0].competitors[1].team.shortDisplayName;
    var winner = "";
    if (event.competitions[0].competitors[0].score > event.competitions[0].competitors[1].score) {
      winner = homeT;
    } else if (event.competitions[0].competitors[1].score > event.competitions[0].competitors[0].score) {
      winner = awayT;
    }
    var matchup = "";
    if (winner !== "") {
      matchup = "<span style='color:Red;font-weight:bold;'>" + winner + "</span>" + " vs. " + event.competitions[0].competitors[1].team.name;
    } else {
      matchup = "<span style='font-weight:bold;'>" + homeT + " vs. " + awayT + "</span>";
    }
    var score1 = event.competitions[0].competitors[0].score;
    var score2 = event.competitions[0].competitors[1].score;
    var score = score1 + " - " + score2;
    var status = event.status.type.shortDetail;
    
    row.insertCell().innerHTML = time;
    row.insertCell().innerHTML = matchup;
    row.insertCell().innerHTML = status;
    row.insertCell().innerHTML = `<a href='https://bundesliga.f20.us#${homeT} vs ${awayT}'/><h5 id='livee'>HD</h5></a>`;
	
}  
  
  
  // لو الماتش يعمل الان
  
   if ((eventDate.toDateString() === today.toDateString() || eventDate.toDateString() === yesterday.toDateString()) && event.status.type.state == "in" ) {
    
    var row = tableBody.insertRow();
    var date = new Date(event.date);
    var time = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    var homeT = event.competitions[0].competitors[0].team.shortDisplayName;
    var awayT = event.competitions[0].competitors[1].team.shortDisplayName;
    var winner = "";
    if (event.competitions[0].competitors[0].score > event.competitions[0].competitors[1].score) {
      winner = homeT;
    } else if (event.competitions[0].competitors[1].score > event.competitions[0].competitors[0].score) {
      winner = awayT;
    }
    var matchup = "";
    if (winner !== "") {
      matchup = "<span style='color:Red;font-weight:bold;'>" + winner + "</span>" + " vs. " + event.competitions[0].competitors[1].team.name;
    } else {
      matchup = homeT + " vs. " + awayT ;
    }
    var score1 = event.competitions[0].competitors[0].score;
    var score2 = event.competitions[0].competitors[1].score;
    var score = score1 + " - " + score2;
    var status = event.status.type.shortDetail;
    row.insertCell().innerHTML = date.toLocaleDateString();
    row.insertCell().innerHTML = time;
    row.insertCell().innerHTML = matchup;
    row.insertCell().innerHTML = score;
    row.insertCell().innerHTML = `<a href='https://bundesliga.f20.us#${homeT} vs ${awayT}'/><h5 id='livee'>LIVE</h5></a>`;
  }
  
  // اذا انتهت المباراة
  
  if (eventDate.toDateString() === today.toDateString() && event.status.type.state == "post") {
    // Code for displaying the event
    var row = tableBody.insertRow();
    var date = new Date(event.date);
    var time = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    var homeT = event.competitions[0].competitors[0].team.shortDisplayName;
    var awayT = event.competitions[0].competitors[1].team.shortDisplayName;
    var winner = "";
    if (event.competitions[0].competitors[0].score > event.competitions[0].competitors[1].score) {
      winner = homeT;
    } else if (event.competitions[0].competitors[1].score > event.competitions[0].competitors[0].score) {
      winner = awayT;
    }
    var matchup = "";
    if (winner !== "") {
      matchup = "<span style='color:Red;font-weight:bold;'>" + winner + "</span>" + " vs. " + event.competitions[0].competitors[1].team.name;
    } else {
      matchup = "<span style='color:green;font-weight:bold;'>" + homeT + " vs. " + awayT + "</span>";
    }
    var score1 = event.competitions[0].competitors[0].score;
    var score2 = event.competitions[0].competitors[1].score;
    var score = score1 + " - " + score2;
    var status = event.status.type.shortDetail;
    row.insertCell().innerHTML = `<h6 style='color:gray;'></h6>`;;
    row.insertCell().innerHTML = `<h6 style='color:gray;'></h6>`;
    row.insertCell().innerHTML = matchup;
    row.insertCell().innerHTML = score;
    row.insertCell().innerHTML = `<h6 style='color:gray;'>Full Time</h6>`;
  }
  
  
  
}


  }
};
bundesliga.open("GET", "https://site.api.espn.com/apis/site/v2/sports/soccer/ger.1/scoreboard", true);
bundesliga.send();

 
	// الكووووبا

var delreyName = "Copa del Rey";
var copadelrey = new XMLHttpRequest();
copadelrey.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var scoreboard = JSON.parse(this.responseText);
    var tableBody = document.getElementById("scoreboard");
    // Create a new row for the league name
    var leagueRow = tableBody.insertRow();
    var leagueCell = leagueRow.insertCell();
    leagueCell.colSpan = "5";
    leagueCell.innerHTML = "<h4>" + delreyName + "</h4>";

    var today = new Date();
    today.setHours(0,0,0,0); // Set time to midnight

for (var i = 0; i < scoreboard.events.length; i++) {
  var event = scoreboard.events[i];
  var eventDate = new Date(event.date);
  var today = new Date();
  var yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  
  // قبل المباراة
if (eventDate.toDateString() === today.toDateString() && event.status.type.state == "pre") {
	
	var row = tableBody.insertRow();
    var date = new Date(event.date);
    var time = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    var homeT = event.competitions[0].competitors[0].team.shortDisplayName;
    var awayT = event.competitions[0].competitors[1].team.shortDisplayName;
    var winner = "";
    if (event.competitions[0].competitors[0].score > event.competitions[0].competitors[1].score) {
      winner = homeT;
    } else if (event.competitions[0].competitors[1].score > event.competitions[0].competitors[0].score) {
      winner = awayT;
    }
    var matchup = "";
    if (winner !== "") {
      matchup = "<span style='color:Red;font-weight:bold;'>" + winner + "</span>" + " vs. " + event.competitions[0].competitors[1].team.name;
    } else {
      matchup = "<span style='font-weight:bold;'>" + homeT + " vs. " + awayT + "</span>";
    }
    var score1 = event.competitions[0].competitors[0].score;
    var score2 = event.competitions[0].competitors[1].score;
    var score = score1 + " - " + score2;
    var status = event.status.type.shortDetail;
    
    row.insertCell().innerHTML = time;
    row.insertCell().innerHTML = matchup;
    row.insertCell().innerHTML = status;
    row.insertCell().innerHTML = `<a href='http://wcupstreaming.iceiy.com/super.html#${homeT} vs ${awayT}'/><h5 id='livee'>HD</h5></a>`;
	
}  
  
  
  // لو الماتش يعمل الان
  
   if ((eventDate.toDateString() === today.toDateString() || eventDate.toDateString() === yesterday.toDateString()) && event.status.type.state == "in" ) {
    
    var row = tableBody.insertRow();
    var date = new Date(event.date);
    var time = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    var homeT = event.competitions[0].competitors[0].team.shortDisplayName;
    var awayT = event.competitions[0].competitors[1].team.shortDisplayName;
    var winner = "";
    if (event.competitions[0].competitors[0].score > event.competitions[0].competitors[1].score) {
      winner = homeT;
    } else if (event.competitions[0].competitors[1].score > event.competitions[0].competitors[0].score) {
      winner = awayT;
    }
    var matchup = "";
    if (winner !== "") {
      matchup = "<span style='color:Red;font-weight:bold;'>" + winner + "</span>" + " vs. " + event.competitions[0].competitors[1].team.name;
    } else {
      matchup = homeT + " vs. " + awayT ;
    }
    var score1 = event.competitions[0].competitors[0].score;
    var score2 = event.competitions[0].competitors[1].score;
    var score = score1 + " - " + score2;
    var status = event.status.type.shortDetail;
    row.insertCell().innerHTML = date.toLocaleDateString();
    row.insertCell().innerHTML = time;
    row.insertCell().innerHTML = matchup;
    row.insertCell().innerHTML = score;
    row.insertCell().innerHTML = `<a href='http://wcupstreaming.iceiy.com/super.html#${homeT} vs ${awayT}'/><h5 id='livee'>LIVE</h5></a>`;
  }
  
  // اذا انتهت المباراة
  
  if (eventDate.toDateString() === today.toDateString() && event.status.type.state == "post") {
    // Code for displaying the event
    var row = tableBody.insertRow();
    var date = new Date(event.date);
    var time = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    var homeT = event.competitions[0].competitors[0].team.shortDisplayName;
    var awayT = event.competitions[0].competitors[1].team.shortDisplayName;
    var winner = "";
    if (event.competitions[0].competitors[0].score > event.competitions[0].competitors[1].score) {
      winner = homeT;
    } else if (event.competitions[0].competitors[1].score > event.competitions[0].competitors[0].score) {
      winner = awayT;
    }
    var matchup = "";
    if (winner !== "") {
      matchup = "<span style='color:Red;font-weight:bold;'>" + winner + "</span>" + " vs. " + event.competitions[0].competitors[1].team.name;
    } else {
      matchup = "<span style='color:green;font-weight:bold;'>" + homeT + " vs. " + awayT + "</span>";
    }
    var score1 = event.competitions[0].competitors[0].score;
    var score2 = event.competitions[0].competitors[1].score;
    var score = score1 + " - " + score2;
    var status = event.status.type.shortDetail;
    row.insertCell().innerHTML = `<h6 style='color:gray;'></h6>`;;
    row.insertCell().innerHTML = `<h6 style='color:gray;'></h6>`;
    row.insertCell().innerHTML = matchup;
    row.insertCell().innerHTML = score;
    row.insertCell().innerHTML = `<h6 style='color:gray;'>Full Time</h6>`;
  }
  
  
  
}


  }
};
copadelrey.open("GET", "https://site.api.espn.com/apis/site/v2/sports/soccer/esp.copa_del_rey/scoreboard", true);
copadelrey.send();


	// الكووووبا

var saudiName = "Saudi Pro League";
var saudi = new XMLHttpRequest();
saudi.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var scoreboard = JSON.parse(this.responseText);
    var tableBody = document.getElementById("scoreboard");
    // Create a new row for the league name
    var leagueRow = tableBody.insertRow();
    var leagueCell = leagueRow.insertCell();
    leagueCell.colSpan = "5";
    leagueCell.innerHTML = "<h4>" + saudiName + "</h4>";

    var today = new Date();
    today.setHours(0,0,0,0); // Set time to midnight

for (var i = 0; i < scoreboard.events.length; i++) {
  var event = scoreboard.events[i];
  var eventDate = new Date(event.date);
  var today = new Date();
  var yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  
  // قبل المباراة
if (eventDate.toDateString() === today.toDateString() && event.status.type.state == "pre") {
	
	var row = tableBody.insertRow();
    var date = new Date(event.date);
    var time = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    var homeT = event.competitions[0].competitors[0].team.shortDisplayName;
    var awayT = event.competitions[0].competitors[1].team.shortDisplayName;
    var winner = "";
    if (event.competitions[0].competitors[0].score > event.competitions[0].competitors[1].score) {
      winner = homeT;
    } else if (event.competitions[0].competitors[1].score > event.competitions[0].competitors[0].score) {
      winner = awayT;
    }
    var matchup = "";
    if (winner !== "") {
      matchup = "<span style='color:Red;font-weight:bold;'>" + winner + "</span>" + " vs. " + event.competitions[0].competitors[1].team.name;
    } else {
      matchup = "<span style='font-weight:bold;'>" + homeT + " vs. " + awayT + "</span>";
    }
    var score1 = event.competitions[0].competitors[0].score;
    var score2 = event.competitions[0].competitors[1].score;
    var score = score1 + " - " + score2;
    var status = event.status.type.shortDetail;
    
    row.insertCell().innerHTML = time;
    row.insertCell().innerHTML = matchup;
    row.insertCell().innerHTML = status;
    row.insertCell().innerHTML = `<a href='https://all.f20.us#${homeT} vs ${awayT}'/><h5 id='livee'>HD</h5></a>`;
	
}  
  
  
  // لو الماتش يعمل الان
  
   if ((eventDate.toDateString() === today.toDateString() || eventDate.toDateString() === yesterday.toDateString()) && event.status.type.state == "in" ) {
    
    var row = tableBody.insertRow();
    var date = new Date(event.date);
    var time = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    var homeT = event.competitions[0].competitors[0].team.shortDisplayName;
    var awayT = event.competitions[0].competitors[1].team.shortDisplayName;
    var winner = "";
    if (event.competitions[0].competitors[0].score > event.competitions[0].competitors[1].score) {
      winner = homeT;
    } else if (event.competitions[0].competitors[1].score > event.competitions[0].competitors[0].score) {
      winner = awayT;
    }
    var matchup = "";
    if (winner !== "") {
      matchup = "<span style='color:Red;font-weight:bold;'>" + winner + "</span>" + " vs. " + event.competitions[0].competitors[1].team.name;
    } else {
      matchup = homeT + " vs. " + awayT ;
    }
    var score1 = event.competitions[0].competitors[0].score;
    var score2 = event.competitions[0].competitors[1].score;
    var score = score1 + " - " + score2;
    var status = event.status.type.shortDetail;
    row.insertCell().innerHTML = date.toLocaleDateString();
    row.insertCell().innerHTML = time;
    row.insertCell().innerHTML = matchup;
    row.insertCell().innerHTML = score;
    row.insertCell().innerHTML = `<a href='https://all.f20.us#${homeT} vs ${awayT}'/><h5 id='livee'>LIVE</h5></a>`;
  }
  
  // اذا انتهت المباراة
  
  if (eventDate.toDateString() === today.toDateString() && event.status.type.state == "post") {
    // Code for displaying the event
    var row = tableBody.insertRow();
    var date = new Date(event.date);
    var time = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    var homeT = event.competitions[0].competitors[0].team.shortDisplayName;
    var awayT = event.competitions[0].competitors[1].team.shortDisplayName;
    var winner = "";
    if (event.competitions[0].competitors[0].score > event.competitions[0].competitors[1].score) {
      winner = homeT;
    } else if (event.competitions[0].competitors[1].score > event.competitions[0].competitors[0].score) {
      winner = awayT;
    }
    var matchup = "";
    if (winner !== "") {
      matchup = "<span style='color:Red;font-weight:bold;'>" + winner + "</span>" + " vs. " + event.competitions[0].competitors[1].team.name;
    } else {
      matchup = "<span style='color:green;font-weight:bold;'>" + homeT + " vs. " + awayT + "</span>";
    }
    var score1 = event.competitions[0].competitors[0].score;
    var score2 = event.competitions[0].competitors[1].score;
    var score = score1 + " - " + score2;
    var status = event.status.type.shortDetail;
    row.insertCell().innerHTML = `<h6 style='color:gray;'></h6>`;;
    row.insertCell().innerHTML = `<h6 style='color:gray;'></h6>`;
    row.insertCell().innerHTML = matchup;
    row.insertCell().innerHTML = score;
    row.insertCell().innerHTML = `<h6 style='color:gray;'>Full Time</h6>`;
  }
  
  
  
}


  }
};
saudi.open("GET", "https://site.api.espn.com/apis/site/v2/sports/soccer/ksa.1/scoreboard", true);
saudi.send();
