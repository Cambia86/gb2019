// var request = require('request');

const request = require('request');


var getCompetition = function (callback) {
    return request({
        method: 'GET',
        url: 'http://api.football-data.org/v2/competitions',
        json: true,
        headers: {
            'X-Auth-Token': '041b645e8f1c477fb0630e4b1fed932e',
            'X-Response-Control': 'full'
        }
    }, function (error, response, body) {
         if (error) { return console.log(error); }
        callback( body)
    });
}

var getMatch=function(competitionId,callback){
    return request({
        method: 'GET',
        url: 'http://api.football-data.org/v2/competitions/'+competitionId+'/matches',
        json: true,
        headers: {
            'X-Auth-Token': '041b645e8f1c477fb0630e4b1fed932e',
            'X-Response-Control': 'full'
        }
    }, function (error, response, body) {
         if (error) { return console.log(error); }
        callback( body)
    });
}


module.exports = {
    getCompetition: getCompetition,
    getMatch:getMatch
}