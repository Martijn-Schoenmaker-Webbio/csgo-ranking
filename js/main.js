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
                          <td class="rank">0</td>
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

function oldRanks(tableId, teamId) {
  var test = $("td.table-" + tableId + ".team-" + teamId).text();
  var test2 = $("td.table-" + tableId).text();
  console.log(test);
  return test2;
};

function calculateRank() {
  var stats = [];
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
      // var teamScore = 0;

      //Find all Players per Team
      for (var k = 0; k < countTd; k++) {
        var stat = {};
        var rank = parseInt($("div.match-" + i + " table.team-" + j + " td.rank")[k].innerHTML);
        var playerName = $("div.match-" + i + " table.team-" + j + " td.name")[k].innerHTML;
        var finalKill = $("div.match-" + i + " table.team-" + j + " td.finalKill")[k].innerHTML;
        var topPlayer = $("div.match-" + i + " table.team-" + j + " td.topPlayer")[k].innerHTML;
        // var tdAmount = $("div.match-" + i + " table.team-" + j + " td.rank")[k].innerHTML;
        // teamScore = teamScore + parseInt(tdAmount);
        stats.push({rank: rank, playerName: playerName, finalKill: finalKill, topPlayer: topPlayer, match: i, team: j, winningTeam: winning, newRank: 0});
      }
      // console.log(teamScore);
    }

  }
  console.log(stats);
  for (var l = 0; l < stats.length; l++) {
    var newRank = stats[l].rank;
    if (stats[l].finalKill == "bot") {
      newRank = newRank + 2;
      console.log($("div.match-" + stats[l].match + " table.team-" + stats[l].team + " td.new-rank." +stats[l].playerName + "-" + stats[l].match + "-" + stats[l].team).html(newRank));
      stats[l].newRank = newRank;
    }
  }
  // return 0;
  // var points;
  // if (win === "winning-team") {
  //   points = points + 2;
  // }
  // if (finalKill === "bot") {
  //   points
  // }
  // var orJoeri, orMartijn, orTom;
  // if (player === "Joeri") {
  //     orJoeri = 0;
  // }
  // if (player === "Martijn") {
  //
  // }
  // if (player === "Tom") {
  //
  // }
  // if (player === "Arjan") {
  //
  // }
  // if (player === "Koen") {
  //
  // }
  // if (player === "Jordy") {
  //
  // }
  // if (player === "Nick") {
  //
  // }
};
