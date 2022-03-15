const { config } = require('../module/util')

// 设置
const cacheTime = 2 * 60 * 60 * 1000
const funcName = 'InPageEdit'
const localCacheName = `i18n-cache-${funcName}-content`
const localCacheTime = `i18n-cache-${funcName}-timestamp`

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
  let json = localStorage.getItem(localCacheName)
  if (
    json &&
    now - localStorage.getItem(localCacheTime) < cacheTime &&
    !noCache
  ) {
    try {
      json = JSON.parse(json)
    } catch (e) {
      console.warn('[InPageEdit] i18n 数据不合法')
      getOriginalData()
      return true
    }
    if (json.en) {
      return true
    }
    console.warn('[InPageEdit] i18n 数据可能已损坏')
  }
  getOriginalData()
  return true
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
  const data = require('../../i18n/languages.json')
  saveToCache(data)
  return data
}

module.exports = {
  syncI18nData,
}
