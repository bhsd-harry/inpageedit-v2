const { pluginCDN } = require('./api')
const ipe = window.InPageEdit

/**
 * @module pluginStore 加载InPageEdit插件
 */
const pluginStore = {
  /**
   * @module pluginStore.get 获取官方插件
   */
  get() {
    return $.ajax({
      url: pluginCDN + '/index.json',
      dataType: 'json',
      crossDomain: true,
      cache: false,
    })
  },
  saveCache(data) {
    ipe.cache = ipe.cache || {}
    ipe.cache.pluginList = data
  },
  loadCache() {
    ipe.cache = ipe.cache || {}
    return ipe.cache.pluginList
  },
  /**
   * @module pluginStore.load 载入插件
   * @param {String} name
   */
  load(name) {
    if (/^https?:\/\//.test(name)) {
      mw.loader.load(
        name,
        `text/${name.endsWith('.css') ? 'css' : 'javascript'}`
      )
      console.info('[InPageEdit] 从远程加载非官方插件', name)
    } else {
      require(`../../../Plugins/src/plugins/${name}`)
      console.info('[InPageEdit] 从本地加载插件', name)
    }
  },
  /**
   * @module pluginStore.initUserPlugin 初始化用户插件
   */
  initUserPlugin() {
    const { preference } = require('./preference')
    const userPlugins = preference.get('plugins')
    if (Array.isArray(userPlugins) && userPlugins.length > 0) {
      userPlugins.forEach((val) => {
        pluginStore.load(val)
      })
    }
  },
}

module.exports = {
  pluginStore,
}
