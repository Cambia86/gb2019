class Prevision {
  constructor() {
    this.homeTeam = {
      under: null,
      over: null
    }
    this.awayTeam = {
      under: null,
      over: null
    }
  }
}


Prevision.prototype.setBasicInfo = function (currStanding,matchDay) {
  this.competitionId = currStanding.competitionId
  this.competitionName=currStanding.competitionName
  this.seasonId=currStanding.seasonId
  this.matchDay=matchDay
}

// Home Team Function
Prevision.prototype.setHomeTeamStat = function (homeStats) {
  this.homeTeam = homeStats
}
Prevision.prototype.setHomeMatchList= function (matchList) {
  this.homeTeam.matchList = matchList
}
Prevision.prototype.setHomeStatisticScore= function (sc) {
  this.homeTeam.statisticScore = sc
  this.homeprev=sc
  this.homeLast6=this.homeTeam.last6result
}
Prevision.prototype.setHomeUnderOver = function (u, o) {
  this.homeTeam.under = u
  this.homeTeam.over = o
}

// Away Team Function
Prevision.prototype.setAwayTeamStat = function (awayStats) {
  this.awayTeam = awayStats
}
Prevision.prototype.setAwayMatchList= function (matchList) {
  this.awayTeam.matchList = matchList
}
Prevision.prototype.setAwayStatisticScore= function (sc) {
  this.awayTeam.statisticScore = sc
  this.awayprev=sc
  this.awayLast6=this.awayTeam.last6result
}
Prevision.prototype.setAwayUnderOver = function (u, o) {
  this.awayTeam.under = u
  this.awayTeam.over = o
}

Prevision.prototype.setProbability=function(winHome,winAway,draw,mostLikelyOutcomeProbability,mostLikelyOutcome){
  this.winHome=winHome
  this.winAway=winAway
  this.draw=draw
  this.mostLikelyOutcomeProbability=mostLikelyOutcomeProbability
  this.mostLikelyOutcome=mostLikelyOutcome
}

module.exports = Prevision
