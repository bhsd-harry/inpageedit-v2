const { config } = require('./util')

function getSiteID() {
  return `${config.wgServer}${config.wgArticlePath.replace('$1', '')}`
}

module.exports = {
  getSiteID,
}
