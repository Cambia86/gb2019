const Match = require('../models/match.model');
const standing_business = require('../business/standing.business');
const ofootbalBusiness = require('../oFootball/ofootballbusiness')

exports.standing_get = function (req, res) {
    let idcomp = req.params.id

    standing_business.getStanding(idcomp,datalocal=>{
        if (datalocal && datalocal.length>0) {
            res.send(datalocal);
        } else {
            ofootbalBusiness.getStanding(req.params.id, function (data) {

                // salvo
                standing_business.saveStanding(data.competition, data.standings[0].table, data.season.id)

                // ritorno
                res.send(data);

            })
        }

    })
}