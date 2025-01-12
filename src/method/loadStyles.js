const { pluginCDN } = require('../module/api')

function loadStyles() {
  // 放在越上面优先级越高
  const styleFiles = [
    // ssi-modal Style
    `${pluginCDN}/src/lib/ssi-modal/ssi-modal.css`,
    // FontAwesome
    'https://fastly.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css',
  ]

  styleFiles.forEach((link) => {
    $('head').prepend(
      $('<link>', { href: link, rel: 'stylesheet', 'data-ipe': 'style' })
    )
  })
  require('../../../Plugins/src/skins/ipe-default.js')
}

module.exports = {
  loadStyles,
}
