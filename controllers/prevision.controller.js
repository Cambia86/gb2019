const Match = require('../models/prevision.model');
const prevision_business = require('../business/prevision.business');
const standing_business = require('../business/standing.business');
const ofootbalBusiness = require('../oFootball/ofootballbusiness')
const match_business = require('../business/match.business');


exports.get_prevision_result = function (req, res) {
    let idcomp = req.params.id
    let matchDay = req.params.matchDay
    let data = prevision_business.getPrevision(idcomp, matchDay).then(prevision => {
        // se sono sul mio db le ritorno
        if (prevision && prevision.length > 0) {
            // res.send(data);

            match_business.getAllMatchByCompetitionIdAndMatchDay(idcomp, matchDay).then(matches => {
                if (matches && matches.length > 0) {


                    let newprevarr = prevision.map(prev => {
                        matches.map(match => {
                            if (match.homeTeam.name == prev.homeTeam && match.awayTeam.name == prev.awayTeam) {
                                prev['score'] = match.score.fullTime.homeTeam + ' - ' + match.score.fullTime.awayTeam
                            }

                        })
                        return prev
                    })

                    res.send(newprevarr);
                }
            })


        }
    })
}

exports.get_prevision_lastResult = function (req, res) {
    let idcomp = req.params.id
    let storeprev = req.params.storeprevision
    previsionList = []
    standing_business.getStanding(idcomp, currentStanding => {
        if (currentStanding && currentStanding.length > 0) {
            let matchDay = parseInt(currentStanding[0].playedGames) + 1
            match_business.getAllPastMatchByCompetitionIdAndMatchDay(idcomp, matchDay).then(matches => {

                let nextMatch = getCurrentMatches(matches, matchDay)

                let pawg = pointAwerageTeams(currentStanding)

                previsionList = createMultiplePrevision(nextMatch, currentStanding, matches, matchDay, pawg);

                if (storeprev == "true")
                    storePrevisions(previsionList);

                // res.send(previsionList);
                res.send(previsionList);
            })
        } else {
            getStandingFromOfootball(true, idcomp)
        }
    })
}

exports.get_prevision_week = function (req, res) {
    previsionList = []
    let majorChampionship = [2002, 2019, 2021, 2015, 2014]
    majorChampionship.map((championshipId, index) => {

        let idcomp = championshipId
        let storeprev = req.params.storeprevision
       
        standing_business.getStanding(idcomp, currentStanding => {
            if (currentStanding && currentStanding.length > 0) {
                let matchDay = parseInt(currentStanding[0].playedGames) + 1
                match_business.getAllPastMatchByCompetitionIdAndMatchDay(idcomp, matchDay).then(matches => {

                    let nextMatch = getCurrentMatches(matches, matchDay)

                    let pawg = pointAwerageTeams(currentStanding)

                    prevs = createMultiplePrevision(nextMatch, currentStanding, matches, matchDay, pawg);
                    prevs.map(p=>{
                        previsionList.push(p)
                    })


                    if (storeprev == "true")
                        storePrevisions(prevs);

                    if (index == 4) {
                        // res.send(previsionList);
                        res.send(previsionList);
                    }
                })
            }
        })


    })


}


exports.get_prevision = function (req, res) {
    let idcomp = req.params.id

    standing_business.getStanding(idcomp, currentStanding => {
        if (currentStanding && currentStanding.length > 0) {
            let matchDay = parseInt(currentStanding[0].playedGames) + 1
            match_business.getAllMatchByCompetitionIdAndMatchDay(idcomp, matchDay).then(nextMatch => {
                if (nextMatch && nextMatch.length > 0) {

                    previsionList = []

                    nextMatch.map(match => {
                        //hometeam
                        let homeTeam = homeTeamStatistics(match, currentStanding);

                        //awayteam
                        let awayTeam = awayTeamStatistics(match, currentStanding);


                        // poisson calculator
                        let prevision = calculateProbability(match, matchDay, homeTeam, awayTeam);

                        previsionList.push(prevision)
                    })
                    res.send(previsionList);
                }

            })

        }
    })


    // res.send(prevision_business.getPrevision(idcomp,null))
}

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

function getStandingFromOfootball(needPrevision, idcomp) {
    ofootbalBusiness.getStanding(idcomp, function (data) {
        // salvo
        standing_business.saveStanding(data.competition, data.standings[0].table, data.season.id)

        if (needPrevision == 'true')
            createPrevisionFromNewStanding(idcomp, false)
    })
}

function createPrevisionFromNewStanding(idcomp, storeprev) {
    standing_business.getStanding(idcomp, currentStanding => {
        if (currentStanding && currentStanding.length > 0) {
            let matchDay = parseInt(currentStanding[0].playedGames) + 1
            match_business.getAllPastMatchByCompetitionIdAndMatchDay(idcomp, matchDay).then(matches => {

                let nextMatch = getCurrentMatches(matches, matchDay)

                previsionList = createMultiplePrevision(nextMatch, currentStanding, matches, matchDay);

                if (storeprev == "true")
                    storePrevisions(currentStanding);

                // res.send(previsionList);
                res.send(previsionList);
            })
        }
    })
}


function createMultiplePrevision(nextMatch, currentStanding, matches, matchDay, pawg) {
    let previsionList = []
    nextMatch.map(match => {
        //hometeam
        let homeTeam = homeTeamStatistics(match, currentStanding);
        homeTeam.matchList = matches.filter(data => {
            if ((data.homeTeam.id == homeTeam.id || data.awayTeam.id == homeTeam.id) && data.matchday != matchDay)
                return data;
        });
        //awayteam
        let awayTeam = awayTeamStatistics(match, currentStanding);
        awayTeam.matchList = matches.filter(data => {
            if ((data.homeTeam.id == awayTeam.id || data.awayTeam.id == awayTeam.id) && data.matchday != matchDay)
                return data;
        });
        homeTeam.statisticScore = calcolaAndamento(homeTeam, pawg);
        awayTeam.statisticScore = calcolaAndamento(awayTeam, pawg);
        // poisson calculator
        let prevision = calculateProbability(match, matchDay, homeTeam, awayTeam);
        // previsionList.push(prevision)
        previsionList.push({
            homeTeam: {
                id: homeTeam.id,
                name: homeTeam.name
            },
            awayTeam: {
                id: awayTeam.id,
                name: awayTeam.name
            },
            matchDay: matchDay,
            homeprev: homeTeam.statisticScore,
            awayprev: awayTeam.statisticScore,
            homeLast6: homeTeam.last6result,
            awayLast6: awayTeam.last6result,
            winHome: prevision.winHome.toFixed(3),
            draw: prevision.draw.toFixed(3),
            winAway: prevision.winAway.toFixed(3)
        });
    });
    return previsionList
}

function storePrevisions(currentStanding) {
    prevision_business.savePrevision({
        id: currentStanding[0].competitionId,
        name: currentStanding[0].competitionName
    }, previsionList, currentStanding[0].seasonId);
}

function getCurrentMatches(matches, matchDay) {
    return matches.filter(data => {
        if (data.matchday == matchDay)
            return data;
    });
}

function pointAwerageTeams(standing) {
    return standing.map(data => {
        let avgp = parseInt(data.points) / parseInt(data.playedGames)
        return obj = {
            team: {
                id: data.teamId,
                name: data.teamName
            },
            avgPoint: avgp
        }
    })
}

function getawgPointOfTeam(teamId, listAvgPoint) {

    let team = listAvgPoint.filter(data => {
        if (data.team.id == teamId)
            return data
    })[0]

    return team.avgPoint
}

function calcolaAndamento(team, listAvgPoint) {
    let totalScore = 0
    for (i = 0; i < 6; i++) {

        currentgame = parseInt(team.standing.playedGames) - i
        if (currentgame > 0) {
            let currentmatchday = team.matchList.filter(data => {
                if (data.matchday == currentgame) {
                    return data
                }
            })[0]

            // is home or away
            let moltipl = (6 - i) / 2
            if (currentmatchday.homeTeam.id == team.id) {
                // win draw or lose?
                let result = currentmatchday.score.fullTime
                if (result.homeTeam > result.awayTeam) {
                    totalScore = totalScore + 3 * moltipl * getawgPointOfTeam(currentmatchday.homeTeam.id, listAvgPoint)
                    team.last6result = team.last6result + 'V '
                }
                if (result.homeTeam == result.awayTeam) {
                    totalScore = totalScore + 1 * moltipl * getawgPointOfTeam(currentmatchday.homeTeam.id, listAvgPoint)
                    team.last6result = team.last6result + 'D '
                }
                if (result.homeTeam < result.awayTeam) {
                    totalScore = totalScore + 0
                    team.last6result = team.last6result + 'L '
                }
            }

            if (currentmatchday.awayTeam.id == team.id) {
                let result = currentmatchday.score.fullTime
                if (result.homeTeam > result.awayTeam) {
                    totalScore = totalScore + 0
                    team.last6result = team.last6result + 'L '
                }
                if (result.homeTeam == result.awayTeam) {
                    totalScore = totalScore + 1 * moltipl * getawgPointOfTeam(currentmatchday.awayTeam.id, listAvgPoint)
                    team.last6result = team.last6result + 'D '
                }
                if (result.homeTeam < result.awayTeam) {
                    totalScore = totalScore + 3 * moltipl * getawgPointOfTeam(currentmatchday.awayTeam.id, listAvgPoint)
                    team.last6result = team.last6result + 'V '
                }
            }

        }


    }

    return totalScore

}

function awayTeamStatistics(match, currentStanding) {
    let awayTeam = {
        id: match.awayTeam.id,
        name: match.awayTeam.name,
        standing: null,
        mediaGolFatti: null,
        mediaGolSubiti: null,
        matchList: null,
        statisticScore: null,
        last6result: ''
    };
    awayTeam.standing = currentStanding.filter(data => {
        if (data.teamId == awayTeam.id)
            return data;
    })[0];
    awayTeam.mediaGolFatti = parseInt(awayTeam.standing.goalsFor) / parseInt(awayTeam.standing.playedGames);
    awayTeam.mediaGolSubiti = parseInt(awayTeam.standing.goalsAgainst) / parseInt(awayTeam.standing.playedGames);
    return awayTeam;
}

function homeTeamStatistics(match, currentStanding) {
    let homeTeam = {
        id: match.homeTeam.id,
        name: match.homeTeam.name,
        standing: null,
        mediaGolFatti: null,
        mediaGolSubiti: null,
        matchList: null,
        statisticScore: null,
        last6result: ''
    };
    homeTeam.standing = currentStanding.filter(data => {
        if (data.teamId == homeTeam.id)
            return data;
    })[0];
    homeTeam.mediaGolFatti = parseInt(homeTeam.standing.goalsFor) / parseInt(homeTeam.standing.playedGames);
    homeTeam.mediaGolSubiti = parseInt(homeTeam.standing.goalsAgainst) / parseInt(homeTeam.standing.playedGames);

    return homeTeam;
}

function calculateProbability(match, matchDay, homeTeam, awayTeam) {
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
    };
    // calcolo sui gol fatti
    for (i = 0; i <= 5; i++) {
        for (y = 0; y <= 5; y++) {
            let poissonHome = poissonCalculator(i, parseFloat(homeTeam.mediaGolFatti));
            let poissonAwaysub = poissonCalculator(i, parseFloat(awayTeam.mediaGolSubiti));
            // probabilita che la squadra di casa segni due goal piu la probabilità che la squadra ospite prenda due goa
            let firstres = parseFloat(poissonHome) + parseFloat(poissonAwaysub)

            let poissonAway = poissonCalculator(y, parseFloat(awayTeam.mediaGolFatti));
            let poissonHomesub = poissonCalculator(y, parseFloat(awayTeam.mediaGolSubiti));
            let secondres = parseFloat(poissonAway) + parseFloat(poissonHomesub)


            if (i > y) {
                prevision.winHome = parseFloat(prevision.winHome) + (parseFloat(firstres) * parseFloat(secondres));
            }
            if (i < y) {
                prevision.winAway = parseFloat(prevision.winAway) + (parseFloat(firstres) * parseFloat(secondres));
            }
            if (i == y) {
                prevision.draw = parseFloat(prevision.draw) + (parseFloat(firstres) * parseFloat(secondres));
            }
        }
    }
    return prevision;
}



function calculateProbabilityfattisubiti(match, matchDay, homeTeam, awayTeam) {
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
    };
    // calcolo sui gol fatti
    for (i = 0; i <= 5; i++) {
        for (y = 0; y <= 5; y++) {
            let poissonHome = poissonCalculator(i, parseFloat(homeTeam.mediaGolFatti));
            let poissonAway = poissonCalculator(y, parseFloat(awayTeam.mediaGolFatti));
            if (i > y) {
                prevision.winHome = parseFloat(prevision.winHome) + (parseFloat(poissonHome) * parseFloat(poissonAway));
            }
            if (i < y) {
                prevision.winAway = parseFloat(prevision.winHome) + (parseFloat(poissonHome) * parseFloat(poissonAway));
            }
            if (i == y) {
                prevision.draw = parseFloat(prevision.winHome) + (parseFloat(poissonHome) * parseFloat(poissonAway));
            }
        }
    }
    return prevision;
}
