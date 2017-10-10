$(document).ready(function() {

  getTeamRanks();

  function getTeamRanks() {
    var teamRanks = [];

    for (var i = 0; i < matches.length; i++) {
      var teams = matches[i].players;
      var teamRank = [];

      for (var j = 0; j < teams.length; j++) {
        var player = teams[j];
        var playerRank = 0;

        for (var k = 0; k < player.length; k++) {

          for (var l = 0; l < players.length; l++) {
            if (players[l].id === player[k].id) {
              playerRank = playerRank + players[l].rank;
            }
          }

        }
        teamRank.push(playerRank);
      }
      teamRanks.push(teamRank);
      console.log(teamRanks);
    }

  }



  // class player {
  //   constructor(oldRank, finalKill, topPlayer, weakTeamPoints) {
  //     this.oldRank = oldRank;
  //     this.finalKill = finalKill;
  //     this.topPlayer = topPlayer;
  //     this.weakTeamPoints = weakTeamPoints;
  //   }
  // };
});
