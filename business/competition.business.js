
const Competition = require('../models/competition.model');

var getCompetition = function (req, res) {
    let id = req.params.id
    return Competition.findById(req.params.id, function (err, competition) {
        if (err) return next(err);
        return competition
    })


 
}


var saveCompetition = function (competition) {

    competition.map(data=>{
        let comp = new Competition(
            {
                id:data.id,
                name:data.name
            }
        );
    
        comp.save(function (err) {
            if (err) {
                return next(err);
            }
            
        })
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