const { pluginCDN } = require('../module/api')

function loadStyles(purge) {
  // 放在越上面优先级越高
  const styleFiles = [
    // ssi-modal Style
    `${pluginCDN}/lib/ssi-modal/ssi-modal.css`,
    // FontAwesome
    'https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css',
  ]

  styleFiles.forEach((link) => {
    if (purge) {
      link += '?timestamp' + Date.now()
    }
    $('head').prepend(
      $('<link>', { href: link, rel: 'stylesheet', 'data-ipe': 'style' })
    )
  })
  require('../skin/ipe-default.js')
}

module.exports = {
  loadStyles,
}
