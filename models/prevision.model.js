var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create a schema
var previsionSchema = new Schema({
    id: Number,
    competitionId: String,
    competitionName: String,
    seasonId:String,
    homeTeam:String,

    awayTeam: String,
    homeprev:String,
    awayprev:String,

    homeLast6: String,
    awayLast6:String,
    
    winHome:String,
    draw:String,
    winAway:String
});



var Prevision = mongoose.model('Prevision', previsionSchema);

module.exports = Prevision;

