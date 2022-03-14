var config = mw.config.get()

// 设置
const cacheTime = 2 * 60 * 60 * 1000
const funcName = 'InPageEdit'
const localCacheName = 'i18n-cache-' + funcName + '-content'
const localCacheTime = 'i18n-cache-' + funcName + '-timestamp'

/**
 * @method i18n Get i18n data
 * @param {Boolean} noCache true - forced no cache
 */
function syncI18nData(noCache) {
  const now = Date.now()
  // 如果语言为 qqx，不返回任何东西
  if (config.wgUserLanguage === 'qqx') {
    console.warn('[InPageEdit] User language is qqx')
    return true
  }
  // 缓存存在且缓存未过期
  if (
    localStorage.getItem(localCacheName) &&
    now - localStorage.getItem(localCacheTime) < cacheTime &&
    !noCache
  ) {
    var json = {}
    try {
      json = JSON.parse(localStorage.getItem(localCacheName))
    } catch (e) {
      console.warn('[InPageEdit] i18n 数据不合法')
      getOriginalData()
      return true
    }
    if (json.en) {
      return true
    } else {
      console.warn('[InPageEdit] i18n 数据可能已损坏')
      getOriginalData()
      return true
    }
  } else {
    getOriginalData()
    return true
  }
}

/**
 * @function saveToCache
 */
function saveToCache(data) {
  const now = Date.now()
  data = JSON.stringify(data)
  localStorage.setItem(localCacheName, data)
  localStorage.setItem(localCacheTime, now)
}

/**
 * @function getOriginalData
 */
function getOriginalData() {
  console.time('[InPageEdit] 从本地获取 i18n 数据')
  var data = require('../../i18n/languages.json')
  if (typeof data !== 'object') data = {}
  saveToCache(data)
  console.timeEnd('[InPageEdit] 从本地获取 i18n 数据')
  return data
}

module.exports = {
  syncI18nData,
}
