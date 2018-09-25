const Match = require('../models/match.model');
const standing_business = require('../business/standing.business');
const ofootbalBusiness = require('../oFootball/ofootballbusiness')

exports.standing_get = function (req, res) {
    let idcomp = req.params.id


    standing_business.getStanding(idcomp, datalocal => {
        if (datalocal && datalocal.length > 0) {
            res.send(datalocal);
        } else {
            ofootbalBusiness.getStanding(req.params.id, function (data) {

                if(data){
                    standing_business.saveStanding(data.competition, data.standings[0].table, data.season.id)
                    res.send(data);
                }
                // salvo
                
                else{
                    res.status(500).send('Something broke!');
                }


            })
        }

        // ritorno
       
    })


}


exports.standing_retrive = function (req, res) {
    let idcomp = req.params.id

    let majorChampionship = [2002,2019, 2021, 2015, 2014]

    majorChampionship.map(championshipId => {
        standing_business.getStanding(championshipId, datalocal => {
            if (datalocal && datalocal.length > 0) {
                res.send(datalocal);
            } else {
                ofootbalBusiness.getStanding(championshipId, function (data) {
                    if (data && data.competition && data.standings && data.standings[0] && data.standings[0].table)
                        // salvo
                        standing_business.saveStanding(data.competition, data.standings[0].table, data.season.id)



                })
            }

        })
    })

    // ritorno
    res.send('ok');
}

