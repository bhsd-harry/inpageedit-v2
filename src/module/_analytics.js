const { analyticsApi } = require('./api')
const { preference } = require('./preference')
const { config } = require('./util')
const version = require('./version')

/**
 * @module _analytics 提交统计信息模块
 * @param {string} featureID 模块ID，例如 quick_edit
 */
const _analytics = function (featureID) {
  if (preference.get('doNotCollectMyInfo') === true) {
    // console.info('[InPageEdit] 我们已不再收集您使用插件的信息。');
    // return;
  }
  const submitData = {
    siteUrl: config.wgServer + config.wgArticlePath.replace('$1', ''),
    siteName: config.wgSiteName,
    userName: config.wgUserName,
    featureID,
    ipeVersion: version,
  }
  $.ajax({
    url: `${analyticsApi}/submit`,
    data: submitData,
    type: 'post',
    dataType: 'json',
  }).done(function (data) {
    console.log('[InPageEdit] Analytics response', data)
  })
}

module.exports = {
  _analytics: _analytics,
}
