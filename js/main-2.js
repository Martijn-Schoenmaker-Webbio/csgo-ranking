$(document).ready(function() {


  for (var i = 0; i < matches.length; i++) {
    var teams = matches[i].players;
    var winningTeam = matches[i].win;
    var finalKillPlayer = matches[i].finalKill;
    var isBot = matches[i].isBot;
    var topPlayer = matches[i].topPlayer;

    getAllRanks(teams, function(minRank, maxRank, minTeam, maxTeam, teamRanks, teamAward) {
      for (var j = 0; j < teams.length; j++) {
        var player = teams[j];
        var isWin = false;
        var playerRows = [];

        if (winningTeam === j) {
          isWin = true;
        }

        var teamPoints = teamRanks[j];

        if (isWin && teamAward !== 0) {
            if (teamPoints === maxTeam) {
                teamAward *= -1;
            }
        } else {
            teamAward = 0;
        }

        for (var k = 0; k < player.length; k++) {
          var newRank = 0;
          var isFinalKill = false;
          var isTopPlayer = false;

          if (player[k].id === finalKillPlayer) {
            isFinalKill = true;
          }

          if (player[k].id === topPlayer) {
            isTopPlayer = true;
          }

          for (var l = 0; l < players.length; l++) {
            if (players[l].id === player[k].id) {
              var oldRank = players[l].rank;
              var playerName = players[l].name;
              getBasePoints(players[l].rank, minRank, maxRank, function(basePoints){
                getExtraPoints(isFinalKill, isBot, isTopPlayer, isWin, basePoints, function(winPoints, finalKillPoints, topPlayerPoints){
                  newRank = oldRank + winPoints + finalKillPoints + topPlayerPoints + teamAward;
                  tablePlayerRow(oldRank, playerName, winPoints, finalKillPoints, topPlayerPoints, teamAward, newRank, function(playerRow){
                    playerRows.push(playerRow);
                    players[l].rank = newRank;
                  });
                });
              });
            }
          }
        }
        playerRows.sort((a, b) => {
          return b.sort - a.sort;
        });
        console.log(playerRows);
      }
    });

  }

  function getAllRanks(teams, callback) {
    var teamRanks = [];
    var allRanks = [];
    var teamAward = 0;

      for (var j = 0; j < teams.length; j++) {
        var player = teams[j];
        var playerRank = 0;

        for (var k = 0; k < player.length; k++) {

          for (var l = 0; l < players.length; l++) {
            if (players[l].id === player[k].id) {
              playerRank = playerRank + players[l].rank;
              allRanks.push(players[l].rank);
            }
          }

        }
        teamRanks.push(playerRank);
      }

      var minRank = Math.min(...allRanks);
      var maxRank = Math.max(...allRanks);

      var minTeam = Math.min(...teamRanks);
      var maxTeam = Math.max(...teamRanks);

      if (minTeam !== maxTeam) {
        teamAward = Math.floor((maxTeam / minTeam - 1)/0.3);
      }
      //console.log("min: " + minTeam + ", " + "max: " + maxTeam);
      callback(minRank, maxRank, minTeam, maxTeam, teamRanks, teamAward);
  }

  function getBasePoints(playerRank, minRank, maxRank, callback) {
    var basePoints = Math.ceil((((playerRank - minRank) / (maxRank - minRank) * 100) / 25 - 4)*-1);
    if (basePoints === 0) {
      basePoints = 1;
    }

    callback(basePoints);
  }

  function getExtraPoints(isFinalKill, isBot, isTopPlayer, isWin, basePoints, callback) {
    var winPoints = 0;
    var finalKillPoints = 0;
    var topPlayerPoints = 0;

    if (isWin) {
      winPoints = 2 + Math.floor(basePoints / 4);
    }

    if (isFinalKill !== false) {

      //If the final kill was a bot subtract 1 point;
      if (isBot === true) {
          finalKillPoints = basePoints - 1;
      } else {
          finalKillPoints = basePoints;
      }

      //Being a top player occurs often when having the final kill, therefore just add 1 point. If you're the top player without having the final kill, grant the full basePoints;
      if (isTopPlayer === true) {
        topPlayerPoints = 1;
      }

    } else if (isTopPlayer === true) {
        topPlayerPoints = basePoints;
    }

    callback(winPoints, finalKillPoints, topPlayerPoints)

  }

  function tablePlayerRow(oldRank, playerName, winPoints, finalKillPoints, topPlayerPoints, teamAward, newRank, callback) {
    playerRow = {
      sort: oldRank,
      html:`<tr>
              <td class="rank">${oldRank}</td>
              <td class="name">${playerName}</td>
              <td class="winpoints">${winPoints}</td>
              <td class="finalKill">${finalKillPoints}</td>
              <td class="topPlayer">${topPlayerPoints}</td>
              <td class="weakTeamPoints">${teamAward}</td>
              <td class="new-rank">${newRank}</td>
              <td class="growth">${newRank - oldRank}</td>
            </tr>`
      };
    callback(playerRow);
  }

});
