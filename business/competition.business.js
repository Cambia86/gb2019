
const Competition = require('../models/competition.model');

var getCompetition = function (req, res) {
    let id = req.params.id
    return Competition.findById(req.params.id, function (err, competition) {
        if (err) return next(err);
        return competition
    })
}


var saveCompetition = function (req, res) {
    let comp = new Competition(
        {
            name: req.body.name,
            league: req.body.league,
            year: req.body.year
        }
    );

    comp.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
    })
}

var updateCompetition= function (req, res) {
    return  Competition.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, competition) {
        if (err) return next(err);
        return competition
    })
}

module.exports = {
    getCompetition: getCompetition,
    saveCompetition: saveCompetition,
    updateCompetition:updateCompetition
}