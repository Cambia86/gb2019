const Standing = require('../models/standing.model');


var getStanding=function(competitionId ,cb){
    return Standing.find({competitionId: competitionId}).exec(function(err, result) {
        if (!err) {
          // handle result
          cb(result) 
        } else {
            cb(error) 
          // error handling
        };
      });
}

var saveStanding = function (competition, standing,seasonId) {
    standing.map(data => {
        let stand = new Standing(
            {
                id: data.id,
                competitionId: competition.id,
                competitionName: competition.name,
                seasonId:seasonId,

                draw: data.draw,
                goalDifference: data.goalDifference,
                goalsAgainst: data.goalsAgainst,
                goalsFor: data.goalsFor,
                lost: data.lost,
                playedGames: data.playedGames,
                points: data.points,
                position: data.position
            }
        );

        stand.save(function (err) {
            if (err) {
                return next(err);
            }

        })
    })

}

module.exports = {
    getStanding:getStanding,
    saveStanding: saveStanding
}