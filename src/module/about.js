const { _msg } = require('./_msg')
const { $iframe } = require('./_elements')
const { aboutUrl } = require('./api')

/**
 * @module about 关于插件模块
 * @description Show "What is" modal box of IPE2
 */
const about = function () {
  ssi_modal.show({
    title: _msg('preference-about-label'),
    className: 'in-page-edit in-page-edit-about',
    content: $iframe(aboutUrl),
  })
}

module.exports = {
  about,
}
