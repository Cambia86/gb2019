const Prevision = require('../models/prevision.model');


var getPrevision = function (competitionId, matchday) {

    return Prevision.find({}, function (err, prev) {
        if (err) return next(err);
        return prev
    })
    // return Prevision.find({ competitionId: competitionId }, function (err, prev) {
    //     if (err) return next(err);
    //     return prev
    // })
}


var savePrevision = function (competition, prevision, seasonId) {
    prevision.map(data => {
        let prev = new Prevision(
            {
                id: data.id,
                competitionId: competition.id,
                competitionName: competition.name,
                seasonId: seasonId,

                matchDay:data.matchDay,
                homeTeamName: data.homeTeam.name,
                awayTeamName: data.awayTeam.name,
                homeTeam: data.homeTeam,

                awayTeam: data.awayTeam,
                homeprev: data.homeprev,
                awayprev: data.awayprev,

                homeLast6: data.homeLast6,
                awayLast6: data.awayLast6,

                winHome: data.winHome,
                draw: data.draw,
                winAway: data.winAway,
                mostLikelyOutcome: data.mostLikelyOutcome,
                mostLikelyOutcomeProbability: data.mostLikelyOutcomeProbability,
            }
        );

        prev.save(function (err) {
            if (err)
                return {}
            else
                return data
        })
    })

}

module.exports = {
    getPrevision: getPrevision,
    savePrevision: savePrevision
}