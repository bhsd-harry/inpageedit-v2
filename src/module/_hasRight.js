const { config } = require('./util')

/**
 * @module _hasRight 是否拥有权限
 * @param {String} right
 * @return {Boolean}
 */
const _hasRight = (right) => {
  return !config.wgUserIsBlocked && config.wgUserRights.includes(right)
}

module.exports = {
  _hasRight,
}
