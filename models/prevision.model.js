var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create a schema
var previsionSchema = new Schema({
    id: Number,
    competitionId: String,
    competitionName: String,
    seasonId:String,
    homeTeam:Object,
    homeTeamName: String,
    awayTeamName:String,
    awayTeam: Object,
    homeprev:String,
    awayprev:String,

    homeLast6: String,
    awayLast6:String,
    matchDay:String,
    winHome:String,
    draw:String,
    winAway:String,
    mostLikelyOutcome: String,
    mostLikelyOutcomeProbability:String,
    under:Object,
    over:Object,

    score:String
  
});



var Prevision = mongoose.model('Prevision', previsionSchema);

module.exports = Prevision;

