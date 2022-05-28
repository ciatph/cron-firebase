const TyphoonAdvisory = require('./typhoonadvisory')
const TA = new TyphoonAdvisory()

const scrapetyphooninfo = TA.scrapetyphooninfo.bind(TA)
const settyphooninformation = TA.settyphooninformation.bind(TA)
const fetchdata = TA.fetchdata.bind(TA)

module.exports = {
  scrapetyphooninfo,
  settyphooninformation,
  fetchdata
}
