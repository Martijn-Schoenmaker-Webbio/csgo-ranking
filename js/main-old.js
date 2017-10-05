$(document).ready(function() {
  var titleDiv = "";
  var customDiv = "";
  var char1 = ['A','B','C','D','E','F'];
  // var tableStart = `<table class='u-full-width table-${count}'><thead><tr><th>Name</th><th>Final Kill</th><th>Top Player</th><th>Current Rank</th></tr></thead><tbody>`;
  var tableEnd = `</tbody></table>`;
  var joeri, arjan, martijn, koen, tom, nick, jordy;
  var tableId = 0;
  var match = 0;
  var win;

  for (var i = 0; i < matches.length; i++) {
    var startrank = 0;
    var k = i+1;
    titleDiv += `<div class='match match-${match}'><h4>Match ${k}</h4>`;
    var teamId = 0;
    for (var team in matches[i]) {
      if (matches[i][team].win) {
        win = "winning-team";
      } else {
        win = "losing-team";
      }
      titleDiv += `<h5>Team ${char1[teamId]}</h5>`;
      titleDiv += `<table class='u-full-width table-${tableId} team-${teamId} ${win} match-${match}'><thead><tr><th>Rank</th><th>Name</th><th>Final Kill</th><th>Top Player</th><th>New Rank</th></tr></thead><tbody>`;
      // $(".teams").append(tableStart);
      for (var player in matches[i][team]["players"]) {
        var player = player;
        var finalKill = matches[i][team]["players"][player].finalKill;
        var topPlayer = matches[i][team]["players"][player].topPlayer;
        // var previousRanks = oldRanks(tableId, match);
        // console.log("previousRanks: " + previousRanks);
        //var rank = calculateRank(player, finalKill, topPlayer, win);
        titleDiv += `   <tr>
                          <td class="rank ${player}-${match}-${teamId}">1</td>
                          <td class="name">${player}</td>
                          <td class="finalKill">${finalKill}</td>
                          <td class="topPlayer">${topPlayer}</td>
                          <td class="new-rank table-${tableId} team-${match} ${player}-${match}-${teamId}">1</td>
                        </tr>`;
      }
      titleDiv += tableEnd;
      teamId++;
    }
    tableId++;
    match++;
    titleDiv += `</div>`;
  }
  $(".teams").append(titleDiv);
  createObject();
});

// function oldRanks(tableId, teamId) {
//   var test = $("td.table-" + tableId + ".team-" + teamId).text();
//   var test2 = $("td.table-" + tableId).text();
//   console.log(test);
//   return test2;
// };

function createObject() {
  var stats = [];
  //var teams = [];
  //Find all Matches
  var matches = $("div.match");
  for (var i = 0; i < matches.length; i++) {

    //Find all Tables (teams)
    var countTables = $("div.match-" + i + " table").length;
    for (var j = 0; j < countTables; j++) {
      var winning = false;
      var thisTable = $("div.match-" + i + " table.team-" + j).hasClass("winning-team");
      if (thisTable) {
        winning = true;
      } else {
        winning = false;
      }
      var countTd = $("div.match-" + i + " table.team-" + j + " td.rank").length;
      //var teamScore = 0;

      //Find all Players per Team
      for (var k = 0; k < countTd; k++) {
        var stat = {};
        var team = {};
        var rank = parseInt($("div.match-" + i + " table.team-" + j + " td.rank")[k].innerHTML);
        var playerName = $("div.match-" + i + " table.team-" + j + " td.name")[k].innerHTML;
        var finalKill = $("div.match-" + i + " table.team-" + j + " td.finalKill")[k].innerHTML;
        var topPlayer = $("div.match-" + i + " table.team-" + j + " td.topPlayer")[k].innerHTML;
        //teamScore = teamScore + rank;
        stats.push({rank: rank, playerName: playerName, finalKill: finalKill, topPlayer: topPlayer, match: i, team: j, winningTeam: winning, newRank: 0});
      }
      // console.log(teamScore);
    }

  }
  console.log(stats);

  //Create match array
  var matchAmount = matches.length;
  var matchArray= [];
  for (var i = 0; i < matchAmount; i++) {
    var teamArray = [];
    for (var k = 0; k < 2; k++) {
      teamArray.push(0);
    }
    matchArray.push(teamArray);
  }

  calculateRank();

  function calculateRank() {
    //Push teamRanks
    var max = 0;
    var min = 0;

    var joeriStat = 1;

    //Iterate over all the matches
    for (var i = 0; i < matches.length; i++) {

      //Log the Match number
      console.log("========== Match: " + [i] + " ==========");

      //For all the players, calculate the total ranks
      for (var m = 0; m < stats.length; m++) {

        //Calculate the highest and lowest ranks
        if (stats[m].rank > max) {
          max = stats[m].rank;
        } else if (stats[m].rank < min) {
          min = stats[m].rank;
        }

      }
      for (var m = 0; m < stats.length; m++) {
        var points = 0;
        var oldRank, newRank;
        if (stats[m].match === i) {
          console.log(joeriStat);
          if (stats[m].playerName == "Joeri") {
            console.log("true");
            $("div.match-" + i + " table.team-" + stats[m].team + " td.rank." + stats[m].playerName + "-" + stats[m].match + "-" + stats[m].team).text(joeriStat);
          }

          //Determine current team and enemy team number
          var friendlyTeam = stats[m].team;
          var enemyTeam = 0;
          if (stats[m].team == "0") {
            enemyTeam = 1;
          } else {
            enemyTeam = 0;
          }

          //Set var percentagePoints (how many points a Player can get based on their rank)
          var percentagePoints = 1;

          //Calculate the percentagePoints
          var percentage = (stats[m].rank - min) / (max - min) * 100;

          //Determine the range
          if (percentage >= 0 && percentage <= 25 ) {
            percentagePoints = 4;
          }
          if (percentage > 25 && percentage <= 50 ) {
            percentagePoints = 3;
          }
          if (percentage > 50 && percentage <= 75 ) {
            percentagePoints = 2;
          }
          if (percentage > 75 && percentage <= 100 ) {
            percentagePoints = 1;
          }

          //Check if the player is in the winning team
          if (stats[m].winningTeam == true) {
            points = points + 2;
          }

          //Check if the player is the topPlayer
          if (stats[m].topPlayer == "true") {
            points = points + percentagePoints;
          }

          //Check if the player has another player as finalKill
          if (stats[m].finalKill == "player") {
            points = points + percentagePoints;
          }

          //Check if the player has a bot as finalKill
          if (stats[m].finalKill == "bot") {
            points = points + percentagePoints - 1;
          }

          // console.log("Enemy team points: " + matchArray[stats[m].match][enemyTeam]);

          points = stats[m].rank + points;

          stats[m].newRank = points;
          stats[m].rank = points;

          if (stats[m].playerName === "Joeri") {
            joeriStat = joeriStat + points;
            stats[m].newRank = joeriStat;
            stats[m].rank = joeriStat;
            points = joeriStat;
          }

          $("div.match-" + i + " table.team-" + stats[m].match + " td.new-rank." + stats[m].playerName + "-" + stats[m].match + "-" + stats[m].team).text(points);


          oldRank = parseInt(matchArray[stats[m].match][stats[m].team]);
          newRank = oldRank + points;
          matchArray[stats[m].match][stats[m].team] = newRank;

          //Log the player and their points
          console.log(stats[m].playerName + ": " + points);
          // console.log(matchArray);
        }
      }
    }
  }
};
