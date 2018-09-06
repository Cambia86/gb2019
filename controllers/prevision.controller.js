const Match = require('../models/prevision.model');
const prevision_business = require('../business/prevision.business');
const standing_business = require('../business/standing.business');
const ofootbalBusiness = require('../oFootball/ofootballbusiness')
const match_business = require('../business/match.business');

function factorial(num) {

    var result = 1;
    for (var i = 2; i <= num; i++) {
        result *= i;
    }
    return result;
}

function poissonCalculator(numerOfGoal, goalAverage) {
    let e = 2.718

    let firts = Math.pow(goalAverage, numerOfGoal)
    let second = Math.pow(e, goalAverage * -1)
    let third = factorial(numerOfGoal)

    let result = (firts * second) / third
    return result.toFixed(3);
}

exports.get_prevision = function (req, res) {
    let idcomp = req.params.id

    standing_business.getStanding(idcomp, currentStanding => {
        if (currentStanding && currentStanding.length > 0) {
            let matchDay = parseInt(currentStanding[0].playedGames) + 1
            match_business.getAllMatchByCompetitionIdAndMatchDay(idcomp, matchDay).then(nextMatch => {
                if (nextMatch && nextMatch.length > 0) {
                    nextMatch.map(match => {
                        //hometeam
                        let homeTeam = {
                            id: match.homeTeam.id,
                            name: match.homeTeam.name,
                            standing: null,
                            mediaGolFatti: null,
                            mediaGolSubiti: null,
                        }
                        homeTeam.standing = currentStanding.filter(data => {
                            if (data.teamId == homeTeam.id)
                                return data;
                        })[0]

                        homeTeam.mediaGolFatti = parseInt( homeTeam.standing.goalsFor) / parseInt(homeTeam.standing.playedGames)
                        homeTeam.mediaGolSubiti = parseInt(homeTeam.standing.goalsAgainst)/ parseInt(homeTeam.standing.playedGames)

                        //awayteam
                        let awayTeam = {
                            id: match.awayTeam.id,
                            name: match.awayTeam.name,
                            standing: null,
                            mediaGolFatti: null,
                            mediaGolSubiti: null,
                        }
                        awayTeam.standing = currentStanding.filter(data => {
                            if (data.teamId == awayTeam.id)
                                return data;
                        })[0]
                        
                        
                        awayTeam.mediaGolFatti = parseInt( awayTeam.standing.goalsFor) / parseInt(awayTeam.standing.playedGames)
                        awayTeam.mediaGolSubiti = parseInt(awayTeam.standing.goalsAgainst)/ parseInt(awayTeam.standing.playedGames)


                        // poisson calculator
                        let poiss = poissonCalculator(2, 2.5)

                        let prevision = {
                            homeTeam: {
                                id: match.homeTeam.id,
                                name: match.homeTeam.name,
                            },
                            awayTeam: {
                                id: match.awayTeam.id,
                                name: match.awayTeam.name,
                            },
                            matchDay: matchDay,
                            winHome: 0,
                            draw: 0,
                            winAway: 0
                        }

                        // calcolo sui gol fatti
                        for(i=0;i<=5;i++){
                            for(y=0;y<=5;y++){
                                let poissonHome=poissonCalculator(i, parseFloat( homeTeam.mediaGolFatti))
                                let poissonAway=poissonCalculator(y, parseFloat(  awayTeam.mediaGolFatti))

                                if(i>y){
                                    prevision.winHome=parseFloat(prevision.winHome)+( parseFloat(poissonHome)*parseFloat(poissonAway))
                                }
                                if(i<y){
                                    prevision.winAway=parseFloat(prevision.winHome)+(parseFloat(poissonHome)*parseFloat(poissonAway))
                                }
                                if(i==y){
                                    prevision.draw=parseFloat(prevision.winHome)+(parseFloat(poissonHome)*parseFloat(poissonAway))
                                }
                            } 
                        }

                    })



                    res.send(currentStanding);
                }

            })








        }
    })


    // res.send(prevision_business.getPrevision(idcomp,null))
}