const { _msg } = require('./_msg')

const { $progress } = require('./_elements')

/**
 * @module progress 载入中模块
 * @param {Boolean|String} title
 * @default "Loading..."
 * @returns
 * - true: Mark top progress box as done
 * - false: Close top progress box
 * - String: Show new progress box with title
 */
const progress = function (title) {
  const $loadingbox = $('.in-page-edit.loadingbox')
  if (title === true) {
    $loadingbox.find('.ssi-modalTitle').html(_msg('done'))
    $loadingbox.find('.ipe-progress').addClass('done')
  } else if (title === false) {
    if ($loadingbox.length > 0) {
      ssi_modal.close($loadingbox)
    }
  } else {
    if ($loadingbox.length > 0) {
      return
    }
    title = title === undefined ? 'Loading...' : title
    ssi_modal.show({
      title,
      content: $progress,
      className: 'in-page-edit loadingbox',
      center: true,
      sizeClass: 'dialog',
      closeIcon: false,
      outSideClose: false,
    })
  }
}

module.exports = {
  progress,
}
