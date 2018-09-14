const Prevision = require('../models/prevision.model');


var getPrevision=function(competitionId ,cb){
    
   return 'hello world'
}


var savePrevision = function (competition, prevision, seasonId) {
    prevision.map(data => {
        let stand = new Prevision(
            {
                id: data.id,
                competitionId: competition.id,
                competitionName: competition.name,
                seasonId: seasonId,
                homeTeam: data.homeTeam,

                awayTeam: data.awayTeam,
                homeprev:data.homeprev,
                awayprev:data.awayprev,

                homeLast6: data.homeLast6,
                awayLast6:data.awayLast6,
                
                winHome:data.winHome,
                draw:data.draw,
                winAway:data.winAway,
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
    getPrevision:getPrevision,
    savePrevision:savePrevision
}