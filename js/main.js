$(document).ready(function() {
  var titleDiv = "";
  var customDiv = "";
  var char1 = ['A','B','C','D','E','F'];
  // var tableStart = `<table class='u-full-width table-${count}'><thead><tr><th>Name</th><th>Final Kill</th><th>Top Player</th><th>Current Rank</th></tr></thead><tbody>`;
  var tableEnd = `</tbody></table>`;
  var joeri, arjan, martijn, koen, tom, nick, jordy;
  var tableId = 1;
  var win;

  for (var i = 0; i < matches.length; i++) {
    var startrank = 0;
    var k = i+1;
    titleDiv += "<h4>Match " + k + "</h4>";
    var match = 0;
    for (var team in matches[i]) {
      if (matches[i][team].win) {
        win = "winning-team";
      } else {
        win = "losing-team";
      }
      titleDiv += "<h5>Team " + char1[match] + "</h5>";
      titleDiv += `<table class='u-full-width table-${tableId} team-${match} ${win}'><thead><tr><th>Name</th><th>Final Kill</th><th>Top Player</th><th>Current Rank</th></tr></thead><tbody>`;
      // $(".teams").append(tableStart);
      for (var player in matches[i][team]["players"]) {
        var player = player;
        var finalKill = matches[i][team]["players"][player].finalKill;
        var topPlayer = matches[i][team]["players"][player].topPlayer;
        var previousRanks = oldRanks(tableId, match);
        console.log("previousRanks: " + previousRanks);
        var rank = calculateRank(player, finalKill, topPlayer, win);
        titleDiv += `   <tr>
                          <td>${player}</td>
                          <td>${finalKill}</td>
                          <td>${topPlayer}</td>
                          <td class="table-${tableId} team-${match}">${rank}</td>
                        </tr>`;
      }
      titleDiv += tableEnd;
      match++;
    }
    tableId ++;
  }
  $(".teams").append(titleDiv);
});

function oldRanks(tableId, teamId) {
  var test = $("td.table-" + tableId + ".team-" + teamId).text();
  var test2 = $("td.table-" + tableId).text();
  console.log(test);
  return test2;
};

function calculateRank(player, finalKill, topPlayer, win) {
  // return 0;
  var points;
  if (win === "winning-team") {
    points = points + 2;
  }
  if (finalKill === "bot") {
    points
  }
  var orJoeri, orMartijn, orTom;
  if (player === "Joeri") {
      orJoeri = 0;
  }
  if (player === "Martijn") {

  }
  if (player === "Tom") {

  }
  if (player === "Arjan") {

  }
  if (player === "Koen") {

  }
  if (player === "Jordy") {

  }
  if (player === "Nick") {

  }
};
