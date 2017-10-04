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
                          <td class="rank">1</td>
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
  calculateRank();
});

// function oldRanks(tableId, teamId) {
//   var test = $("td.table-" + tableId + ".team-" + teamId).text();
//   var test2 = $("td.table-" + tableId).text();
//   console.log(test);
//   return test2;
// };

function calculateRank() {
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
    console.log(matchArray);
  }

  //Push teamRanks
  var max = 0;
  var min = 0;

  for (var i = 0; i < matches.length; i++) {
    for (var m = 0; m < stats.length; m++) {
      if (stats[m].match === i) {
        var oldRank = parseInt(matchArray[stats[m].match][stats[m].team]);
        var newRank = oldRank + parseInt(stats[m].rank);
        matchArray[stats[m].match][stats[m].team] = newRank;

        if (stats[m].rank > max) {
          max = stats[m].rank;
        } else if (stats[m].rank < min) {
          min = stats[m].rank;
        }
      }
    }
    for (var m = 0; m < stats.length; m++) {
      var points = 0;
      if (stats[m].match === i) {
        var percentage = (stats[m].rank - min) / (max - min) * 100;
        console.log(stats[m].finalKill);
        if (stats[m].finalKill !== "false") {
          // console.log("jee");
          if (percentage >= 0 && percentage <= 25 ) {
            points = points + 4;
            console.log("rank-1");
          }
          if (percentage > 25 && percentage <= 50 ) {
            points = points + 3;
            console.log("rank-2");
          }
          if (percentage > 50 && percentage <= 75 ) {
            points = points + 2;
            console.log("rank-3");
          }
          if (percentage > 75 && percentage <= 100 ) {
            points = points + 1;
            console.log("rank-4");
          }
          if (stats[m].finalKill == "bot") {
            points--;
          }
          if (stats[m].topPlayer == "true") {
            if (percentage >= 0 && percentage <= 25 ) {
              points = points + 4;
              console.log("rank-1");
            }
            if (percentage > 25 && percentage <= 50 ) {
              points = points + 3;
              console.log("rank-2");
            }
            if (percentage > 50 && percentage <= 75 ) {
              points = points + 2;
              console.log("rank-3");
            }
            if (percentage > 75 && percentage <= 100 ) {
              points = points + 1;
              console.log("rank-4");
            }
          }

        }

        if (stats[m].winningTeam !== "winning-team") {
          points = points + 2;
        }
        console.log(points);

        // console.log(percentage);
        //Points based on: (Current rank points - lowest rank points) / (highest rank points - lowest rank points) * 100. See scheme in what range the percentage falls.
        //(x < 10 && y > 1) is true
      }
    }
    // console.log("Match " + i + ":" + max + " " + min);
  }

  //Calculate points per player
  for (var m = 0; m < stats.length; m++) {
    if (stats[m].finalKill == "bot") {
      // caculatePoints(matchArray[stats[m].match][stats[m].team]);
    } else if (stats[m].finalKill == "player") {

    } else {

    }
  }

  for (var l = 0; l < stats.length; l++) {
    var newRank = stats[l].rank;

    if (stats[l].finalKill == "bot") {
      newRank = newRank + 2;
      // console.log($("div.match-" + stats[l].match + " table.team-" + stats[l].team + " td.new-rank." +stats[l].playerName + "-" + stats[l].match + "-" + stats[l].team).html(newRank));
      stats[l].newRank = newRank;
    }
  }
};

// function calculatePoints(enemyRanking) {
//
// }
