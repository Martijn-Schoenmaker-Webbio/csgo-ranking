$(document).ready(function() {
  calculateRanks();

  function calculateRanks() {
    var isFirstTeam = true;
    //Iterate through all matches
    for (var i = 0; i < matches.length; i++) {
      var table = ``;

      if (i > 0) {
        isFirstTeam = false;
      }

      //Create a var to store all ranks
      var allRanks = 0;
      var minRank = 0;
      var maxRank = 0;

      //Store array of teams in var allTeams
      var allTeams = matches[i].players;

      calculateMinMax(isFirstTeam, inRank, maxRank, allTeams, function(minRank, maxRank) {

        //Iterate through all teams
        for (var j = 0; j < allTeams.length; j++) {

          //Store array of players per team in var allPlayers
          var allPlayers = allTeams[j];

          //Iterate through all players
          for (var k = 0; k < allPlayers.length; k++) {
            //Temp store the current player in player var
            var player = allPlayers[k];

            //Temp store the oldRank in the oldRank variable
            var oldRank = player.newRank;

            var newRank = oldRank;

            calculatePercentage(minRank, maxRank, oldRank, function(percentagePoints){
              if (matches[i].win === j) {
                newRank = newRank + 2;
              }

              if (matches[i].finalKill == player.id) {
                newRank = newRank + percentagePoints;
                if (matches[i].isBot === true) {
                  newRank--;
                }
              }

              player.newRank = newRank;

              console.log("Player: " + player.name + " oldRank: " + oldRank + " newRank: " + newRank);
            });

            //Add the current rank of the player to the allRanks variable
            allRanks = allRanks + allPlayers[k].oldRank;
          };
        };
      });
      // console.log(allRanks);
      // console.log(minRank, maxRank);
    };
  };

  function calculatePercentage(min, max, rank, callback) {
    //Set var percentagePoints (how many points a Player can get based on their rank)
    var percentagePoints = 1;

    //Calculate the percentagePoints
    var percentage = (rank - min) / (max - min) * 100;

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

    callback(percentagePoints);
  }

  function calculateMinMax(isFirstTeam, minRank, maxRank, allTeams, callback) {
    //Iterate through all teams
    for (var j = 0; j < allTeams.length; j++) {

      //Store array of players per team in var allPlayers
      var allPlayers = allTeams[j];
      for (var k = 0; k < allPlayers.length; k++) {
        console.log(allPlayers.length);

        //Temp store the oldRank in the oldRank variable
        if (isFirstTeam === false) {
          //oldRank = match[i-1]. // pak de newRank van de vorige iteratie
        }
        var oldRank = allPlayers[k].oldRank;

        //Make sure minRank doesn't stay at 0
        if (k === 0) {
          minRank = oldRank;
        };

        //If the player's rank is the highest or lowest uptill now, make it the new value
        if (oldRank < minRank) {
          minRank = oldRank;
        } else if (oldRank > maxRank) {
          maxRank = oldRank;
        };
      };
    };
    console.log("in de callback:" + minRank + "max: " + maxRank);
    callback(minRank, maxRank);
  };
});
