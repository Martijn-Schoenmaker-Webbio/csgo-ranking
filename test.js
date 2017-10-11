var basePoints = 0;
var finalKillPoints = 0;

//Calculate the basePoints per player;
basePoints = Math.ceil(((oldRank - minRank) / (maxRank - minRank) * 100) / 25);

//Calculate the win points based on the player's basePoints;
winPoints = 2 + Math.floor(basePoints / 4);

//Calculate the extra Points for the finalKill and the topPlayer;
if (finalKill != false) {

  //If the final kill was a bot subtract 1 point;
  if (isBot === true) {
      finalKillPoints = basePoints - 1;
  } else {
      finalKillPoints = basePoints;
  }

  //Being a top player occurs often when having the final kill, therefore just add 1 point. If you're the top player without having the final kill, grant the full basePoints;
  if (topPlayer === true) {
    topPlayerPoints = 1;
  }
} else if (topPlayer === true) {
    topPlayerPoints = basePoints;
}

//Calculate the award the player gets based on the team's Rank. If the player's team Rank is lower than the other team and differs more than or equal to 30%, grant them extra points.
//If it's the other way around, subtract these points. If the teams are even, set the award to 0;
if (teamWin === true && maxTeam != minTeam) {
    teamAward = Math.floor((maxTeam / minTeam - 1)/0.3);
    if (teamPoints === maxTeam) {
        teamAward *= -1;
    }
} else {
    teamAward = 0;
}

//Set the new Rank;
newRank = oldRank + winPoints + finalKillPoints + topPlayerPoints + teamAward;
