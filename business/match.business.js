const Match = require('../models/match.model');


var getMatch = function (req, res) {
    let id = req.params.id
    return Match.findById(req.params.id, function (err, match) {
        if (err) return next(err);
        return match
    })
}

var saveMatch= function(competition,match){
    match.map(data=>{
        let comp = new Match(
            {
                id:data.id,
                competitionId:competition.id,
                competitionName:competition.name,
                matchday:data.matchday,
                homeTeam:data.homeTeam,
                awayTeam:data.awayTeam,
                score:data.score
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
    saveMatch: saveMatch
}