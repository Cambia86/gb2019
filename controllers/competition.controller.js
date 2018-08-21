const Competition = require('../models/competition.model');
const competition_business = require('../business/competition.business');


//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.competition_get = function (req, res) {
    let data = competition_business.getCompetition(req, res).then(data => {
        res.send(data);
    })
}

exports.competition_create = function (req, res) {
    let data = competition_business.saveCompetition(req, res)
}

exports.competition_Update = function (req, res) {
    // Competition.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, competition) {
    //     if (err) return next(err);
    //     res.send(competition);
    // });


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