const Match = require('../models/match.model');
const match_business = require('../business/match.business');
const ofootbalBusiness = require('../oFootball/ofootballbusiness')

exports.match_retrieve=function(req,res){
    let majorChampionship = [2002,2019, 2021, 2015, 2014]
    majorChampionship.map(championshipId=>{
        let data = match_business.getAllMatchByCompetitionId_v2(championshipId, res).then(data => {
            // se sono sul mio db le ritorno
            if (data && data.length > 0) {
                res.send(data);
            } else {
                // altrimenti le richiamo dalle api pubbliche
                ofootbalBusiness.getMatch(championshipId,function (data) {
                    // salvo
                    match_business.saveMatch(data.competition,data.matches)
            
              
                })
                .catch(error=>{
                    res.send(error);
                })
            }
    
        })
        .catch(error=>{
            res.next(error);
        })
    })

          // ritorno
          res.send('ok');
}


exports.match_get = function (req, res) {

    
    let data = match_business.getAllMatchByCompetitionId(req, res).then(data => {
        // se sono sul mio db le ritorno
        if (data && data.length > 0) {
            res.send(data);
        } else {
            // altrimenti le richiamo dalle api pubbliche
            ofootbalBusiness.getMatch(req.params.id,function (data) {
                // salvo
                match_business.saveMatch(data.competition,data.matches)
        
                // ritorno
                res.send(data);
            })
            .catch(error=>{
                res.send(error);
            })
        }

    })
    .catch(error=>{
        res.next(error);
    })



}