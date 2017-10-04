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
                          <td>${player}</td>
                          <td>${finalKill}</td>
                          <td>${topPlayer}</td>
                          <td class="new-rank table-${tableId} team-${match}">1</td>
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
});

function oldRanks(tableId, teamId) {
  var test = $("td.table-" + tableId + ".team-" + teamId).text();
  var test2 = $("td.table-" + tableId).text();
  console.log(test);
  return test2;
};

function calculateRank() {
  // var td = $("td.rank");
  // console.log(td.length);
  // for (var i = 0; i < td.length; i++) {
  //
  //   // td[i];
  //   console.log([i]);
  // }
  var matches = $("div.match");
  for (var i = 0; i < matches.length; i++) {
    var countTables = $("div.match-" + i + " table").length;
    for (var j = 0; j < countTables; j++) {
      var countTd = $("div.match-" + i + " table.team-" + j + " td.new-rank").length;
      var teamScore = 0;
      for (var k = 0; k < countTd; k++) {
        var tdAmount = $("div.match-" + i + " table.team-" + j + " td.new-rank")[k].innerHTML;
        teamScore = teamScore + parseInt(tdAmount);
      }
      console.log(teamScore);
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
