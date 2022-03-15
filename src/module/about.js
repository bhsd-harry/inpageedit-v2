const { _msg } = require('./_msg')

const { aboutUrl } = require('./api')

/**
 * @module about 关于插件模块
 * @description Show "What is" modal box of IPE2
 */
const about = function () {
  ssi_modal.show({
    title: _msg('preference-about-label'),
    className: 'in-page-edit in-page-edit-about',
    content: $('<section>').append(
      $('<iframe>', {
        src: aboutUrl,
      }).css({
        margin: 0,
        padding: 0,
        width: '100%',
        height: '80vh',
        border: 0,
      })
    ),
  })
}

module.exports = {
  about,
}
