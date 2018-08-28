const Match = require('../models/prevision.model');
const prevision_business = require('../business/prevision.business');
const ofootbalBusiness = require('../oFootball/ofootballbusiness')

exports.get_prevision = function (req, res) {
    let idcomp = req.params.id

    // prevision_business.getPrevision(idcomp,datalocal=>{
    //     res.send(datalocal)

    // })

    res.send(prevision_business.getPrevision(idcomp,null))
}