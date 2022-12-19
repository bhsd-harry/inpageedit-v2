const { _msg } = require('./_msg')
const { $progress } = require('./_elements')
const { preference } = require('./preference')
const { mwApi } = require('./util')

/**
 * @module quickPreview 快速预览文章页
 * @param params {Object}
 */
const quickPreview = function (params, modalSize = 'large', center = false) {
  const defaultOptions = {
    action: 'parse',
    preview: true,
    disableeditsection: true,
    disablelimitreport: true,
    prop: 'text',
    formatversion: 2,
  }
  const options = $.extend({}, defaultOptions, params)
  mw.hook('InPageEdit.quickPreview').fire()
  console.time('[InPageEdit] Request preview')
  ssi_modal.show({
    outSideClose: preference.get('outSideClose'),
    sizeClass: (
      /dialog|small|smallToMedium|medium|mediumToLarge|large|full|auto/
    ).test(modalSize)
      ? modalSize
      : 'large',
    center: Boolean(center),
    className: 'in-page-edit previewbox',
    title: _msg('preview-title'),
    content: $('<section>').append(
      $progress,
      $('<div>', {
        class: 'InPageEditPreview',
        style: 'display:none',
        text: _msg('preview-placeholder'),
      })
    ),
    fixedHeight: true,
    fitScreen: true,
    buttons: [{ label: '', className: 'hideThisBtn' }],
    onShow(modal) {
      $('.previewbox .ipe-progress').css(
        'margin-top',
        $('.previewbox .ipe-progress').parent().height() / 2
      )
      $('.previewbox .hideThisBtn').hide()
      mwApi
        .post(options)
        .then(function (data) {
          console.timeEnd('[InPageEdit] Request preview')
          const content = data.parse.text,
            $content = $(document.getElementById(modal.modalId))
          $content.find('.ipe-progress').hide(150)
          $content.find(`.InPageEditPreview`)
            .fadeIn(500)
            .html(content)
        })
        .fail(function () {
          console.timeEnd('[InPageEdit] Request preview')
          console.warn('[InPageEdit] 预览失败')
          const $content = $(document.getElementById(modal.modalId))
          $content.find('.ipe-progress').hide(150)
          $content.find(`.InPageEditPreview`)
            .fadeIn(500)
            .html(_msg('preview-error'))
        }
      )
    },
  })
}

module.exports = {
  quickPreview,
}
