const Match = require('../models/match.model');
const match_business = require('../business/match.business');
const ofootbalBusiness = require('../oFootball/ofootballbusiness')

exports.match_get = function (req, res) {
    ofootbalBusiness.getMatch(req.params.id,function (data) {
        // salvo
        match_business.saveMatch(data.competition,data.matches)

        // ritorno
        res.send(data);
    })
    
    // let data = match_business.getMatch(req, res).then(data => {
    //     // se sono sul mio db le ritorno
    //     if (data && data.length > 0) {
    //         res.send(data);
    //     } else {
    //         // altrimenti le richiamo dalle api pubbliche
    //         ofootbalBusiness.getMatch(req.id,function (data) {
    //             // salvo
    //             match_business.saveMatch(data.match)

    //             // ritorno
    //             res.send(data);
    //         })
    //         .catch(error=>{
    //             res.send(error);
    //         })
    //     }

    // })
    // .catch(error=>{
    //     res.next(error);
    // })



}