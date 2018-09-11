const Match = require('../models/match.model');


var getMatch = function (req, res) {
    let id = req.params.id
    return Match.findById(req.params.id, function (err, match) {
        if (err) return next(err);
        return match
    })
}

var getAllMatchByCompetitionId = function (req, res) {
    let compIdid = req.params.id
    return Match.find({ competitionId: compIdid }, function (err, match) {
        if (err) return next(err);
        return match
    })
}

var getAllMatchByCompetitionIdAndMatchDay = function (compId, matchDay) {
    // let compIdid = req.params.id
    return Match.find({ competitionId: compId, matchday: matchDay }, function (err, match) {
        if (err) return next(err);
        return match
    })
}

var getAllPastMatchByCompetitionIdAndMatchDay = function (compId, matchDay) {
     let match = parseInt(matchDay)+1
    return Match.find({ competitionId: compId, matchday: { $lt: match } }, function (err, match) {
        if (err) return next(err);
        return match
    })
}

var saveMatch = function (competition, match) {
    match.map(data => {
        let comp = new Match(
            {
                id: data.id,
                competitionId: competition.id,
                competitionName: competition.name,
                matchday: data.matchday,
                homeTeam: data.homeTeam,
                awayTeam: data.awayTeam,
                score: data.score
            }
        );

        comp.save(function (err) {
            if (err) {
                return next(err);
            }

        })
    })

}

module.exports = {
    getMatch: getMatch,
    saveMatch: saveMatch,
    getAllMatchByCompetitionId: getAllMatchByCompetitionId,
    getAllMatchByCompetitionIdAndMatchDay: getAllMatchByCompetitionIdAndMatchDay,
    getAllPastMatchByCompetitionIdAndMatchDay: getAllPastMatchByCompetitionIdAndMatchDay
}