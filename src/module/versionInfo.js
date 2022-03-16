const { _msg } = require('./_msg')
const version = require('./version')
const { updatelogsUrl, githubLink, aboutUrl } = require('./api')

/**
 * @module versionInfo 版本信息模块
 * @description Show Update Logs Modal box
 */
const versionInfo = () => {
  // 显示模态框
  ssi_modal.show({
    className: 'in-page-edit update-logs-modal',
    title: `${_msg(
      'updatelog-title'
    )} - <span id="yourVersion">${version}</span>`,
    content: $('<section>').append(
      $('<iframe>', {
        src: updatelogsUrl,
      }).css({
        margin: 0,
        padding: 0,
        width: '100%',
        height: '80vh',
        border: 0,
      })
    ),
    buttons: [
      {
        label: 'GitHub',
        className: 'btn btn-secondary',
        method() {
          window.open(githubLink)
        },
      },
      {
        label: _msg('updatelog-about'),
        className: 'btn btn-secondary',
        method() {
          window.open(aboutUrl)
        },
      },
      {
        label: _msg('close'),
        className: 'btn btn-primary',
        method(a, modal) {
          modal.close()
        },
      },
    ],
  })
}

module.exports = {
  versionInfo,
}
