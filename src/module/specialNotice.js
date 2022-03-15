const { _msg } = require('./_msg')

/**
 * @module specialNotice 特别通知
 */
const specialNotice = function () {
  ssi_modal.notify(
    'dialog',
    {
      className: 'in-page-edit ipe-special-notice',
      title: _msg('version-notice-title'),
      content: _msg('version-notice'),
      okBtn: {
        label: _msg('updatelog-dismiss'),
        className: 'btn btn-primary',
      },
    },
    (e, modal) => {
      localStorage.setItem('InPageEditNoticeId', _msg('noticeid'))
      modal.close()
    }
  )
}

module.exports = {
  specialNotice,
}
