const Competition = require('../models/competition.model');
const competition_business = require('../business/competition.business');
const ofootbalBusiness = require('../oFootball/ofootballbusiness')


exports.competition_get = function (req, res) {
    let data = competition_business.getCompetition(req, res).then(data => {
        // se sono sul mio db le ritorno
        if (data && data.length > 0) {
            res.send(data);
        } else {
            // altrimenti le richiamo dalle api pubbliche
            ofootbalBusiness.getCompetition(function (data) {
                // salvo
             competition_business.saveCompetition(data.competitions)

                // ritorno
                res.send(data);
            })
        }

    })



}

exports.competition_create = function (req, res) {
    let data = competition_business.saveCompetition(req, res)
}

exports.competition_Update = function (req, res) {
    let data = competition_business.updateCompetition(req, res).then(data => {
        res.send(data);
    })
}

exports.competition_delete = function (req, res) {
    Competition.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
}