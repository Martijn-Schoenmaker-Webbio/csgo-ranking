$(document).ready(function() {
  calculateRanks();

  function calculateRanks() {
    var char = ['A','B','C','D','E','F'];
    var contentDiv = ``;
    var tableEnd = `</tbody></table>`;

    //Iterate through all matches
    for (var i = 0; i < matches.length; i++) {
      console.log(`================ Match ${i+1} ================`);
      var divTitle = `<h4>Match ${i+1}</h4>`;

      contentDiv += divTitle;

      //Create a var to store min and max ranks
      var minRank = 0;
      var maxRank = 0;

      //Store array of teams in var allTeams
      var allTeams = matches[i].players;

      calculateMinMax(minRank, maxRank, allTeams, function(minRank, maxRank, teamScores) {
        var teamScoresOriginal = teamScores.slice();
        //Iterate through all teams
        for (var j = 0; j < allTeams.length; j++) {
          var weakTeamPoints = 0;
          var winningTeamPoints;
          var winningTeam = '';
          teamPoints = teamScoresOriginal[j];
          if (matches[i].win === j) {
            winningTeam = " - win";
          } else {
          }

          if (teamScores[0] !== teamScores[1]) {
            teamScores.sort((a, b) => {
              return a - b;
            });

            var minTeam = teamScores[0];
            var maxTeam = teamScores[1];

            if (teamPoints === minTeam) {
              weakTeamPoints = Math.floor(maxTeam / minTeam);
            } else if (teamPoints === maxTeam){
              weakTeamPoints = -(Math.floor(maxTeam / minTeam));
            }

          } else {
            console.log("-------------------------DRAW");
            weakTeamPoints = 0;
          }
          var tableStart = `<h5>Team ${char[j]} ${winningTeam}</h5><table class='u-full-width'><thead><tr><th>Rank (${teamScoresOriginal[j]})</th><th>Name</th><th>Win</th><th>Percentage</th><th>Final Kill</th><th>Top Player</th><th>Weak Team Points</th><th>New Rank</th><th>Growth</th></tr></thead><tbody>`;
          contentDiv += tableStart;

          //Store array of players per team in var allPlayers
          var allPlayers = allTeams[j];

          var playerRow = ``;

          var playerRows = [];

          //Iterate through all players
          for (var k = 0; k < allPlayers.length; k++) {

            //Temp store the current player in player var
            var player = allPlayers[k];

            //Get the current rank of the player in the players array
            for (var y = 0; y < players.length; y++) {

              //If the player ID in the matches array is the same as the one in the players array
              if (player.id === players[y].id) {

                //Set the currentRank
                var currentRank = players[y].rank;

              }
            }

            var newRank = currentRank;
            //Fire the function to calculate the range of percentage the player is in.
            calculatePercentage(minRank, maxRank, currentRank, function(percentagePoints){
              var finalKillPoints = 0;
              var topPlayerPoints = 0;

              if (matches[i].win === j) {
                console.log("Winning Team gets: " + weakTeamPoints);
                var defaultWin = 2 + (Math.floor(percentagePoints/4));
                var winPoints = defaultWin + weakTeamPoints;
                console.log("winpoints: " + winPoints);

                if (matches[i].finalKill == player.id) {
                  finalKillType = "Player";
                  finalKillPoints = percentagePoints;
                  if (matches[i].isBot === true) {
                    finalKillType = "Bot";
                    finalKillPoints--;
                  }
                }

                if (matches[i].topPlayer == player.id) {
                  topPlayer = "True";
                  topPlayerPoints = percentagePoints;
                }
                newRank = currentRank + winPoints + finalKillPoints + topPlayerPoints;
              } else {
                console.log("lost but better:" + weakTeamPoints);
                var defaultWin = 0;
                if (weakTeamPoints < 0) {
                  var lostTeamPoints = weakTeamPoints;
                  newRank = currentRank + lostTeamPoints;
                  console.log(currentRank);
                  console.log(lostTeamPoints);
                  console.log(newRank);
                } else {
                  weakTeamPoints = 0;
                  newRank = currentRank;
                }
              }

              player.newRank = newRank;

              for (var y = 0; y < players.length; y++) {
                if (player.id === players[y].id) {
                  players[y].rank = newRank;
                }
              }

              playerRow = {
                sort: currentRank,
                html:`<tr>
                        <td class="rank">${currentRank}</td>
                        <td class="name">${player.name}</td>
                        <td class="winpoints">${defaultWin}</td>
                        <td class="percentagePoints">${percentagePoints}</td>
                        <td class="finalKill">${finalKillPoints}</td>
                        <td class="topPlayer">${topPlayerPoints}</td>
                        <td class="weakTeamPoints">${weakTeamPoints}</td>
                        <td class="new-rank">${newRank}</td>
                        <td class="growth">${newRank - currentRank}</td>
                      </tr>`};

              if (matches[i].win === j) {
                console.log("Win: " + player.name + ", oldRank: " + currentRank + ", winPoints: " + winPoints + ", weakTeamPoints: " + weakTeamPoints + ", percentagePoints: " + percentagePoints + ", finalKillPoints: " + finalKillPoints + ", topPlayerPoints: " + topPlayerPoints + ", newRank: " + newRank + ", growth: " + (newRank - currentRank));
              } else {
                console.log("Lost: " + player.name + ", Rank: " + newRank);
              }
            });
            playerRows.push(playerRow);
          };
          playerRows.sort((a, b) => {
            return b.sort - a.sort;
          });
          for (var q = 0; q < playerRows.length; q++) {
            contentDiv += playerRows[q].html;
          }
         contentDiv += tableEnd;
        };
      });
    };
    $('.teams').append(contentDiv);
  };

  function calculatePercentage(min, max, currentRank, callback) {
    //Set var percentagePoints (how many points a Player can get based on their rank)
    var percentagePoints = 1;

    //Calculate the percentagePoints
    var percentage = (currentRank - min) / (max - min) * 100;

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

    //Pass the variable percentagePoints in the callback
    callback(percentagePoints);
  }

  function calculateMinMax(minRank, maxRank, allTeams, callback) {

    var teamRanks = [];
    //Iterate through the players array
    for (var i = 0; i < players.length; i++) {
      var teamRank = {playerId: 0, playerRank: 0};

      //Set the playerId
      var playerId = players[i].id;

      //Set the currentRank to the rank of the player in the players array
      var currentRank = players[i].rank;

      //Make sure minRank doesn't stay at 0
      if (i === 0) {
        minRank = currentRank;
      };

      //If the player's rank is the highest or lowest uptill now, make it the new value
      if (currentRank < minRank) {
        minRank = currentRank;
      } else if (currentRank > maxRank) {
        maxRank = currentRank;
      };

      teamRank.playerId = playerId;
      teamRank.playerRank = currentRank;
      teamRanks.push(teamRank);

    }
    console.log(teamRanks);

    var teamScores = [];

    for (var t = 0; t < allTeams.length; t++) {

      var teamScore = 0;

      //Store array of players per team in var allPlayers
      var allPlayers = allTeams[t];

      //Iterate through all players
      for (var k = 0; k < allPlayers.length; k++) {

        //Temp store the current player in player var
        var player = allPlayers[k];

        for (var r = 0; r < teamRanks.length; r++) {
          if (teamRanks[r].playerId === player.id) {
            teamScore = teamScore + teamRanks[r].playerRank;
            console.log(teamScore);
          }
        }
      }
      teamScores.push(teamScore);
    }
    callback(minRank, maxRank, teamScores);
  };
});
