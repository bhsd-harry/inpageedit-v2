// 导入方法
const { loadStyles } = require('./loadStyles')
const { syncI18nData } = require('./syncI18nData')

const version = require('../module/version')

/**
 * @method initMain
 * @return {Object} InPageEdit
 */
async function init() {
  mw.hook('InPageEdit.init.before').fire()
  await mw.loader.using([
    'mediawiki.api',
    'mediawiki.Title',
    'mediawiki.Uri',
  ])
  // 是否需要刷新缓存
  const noCache = Boolean(
    mw.util.getParamValue('dev') ||
    version !== localStorage.getItem('InPageEditVersion')
  )
  const { initQueryData } = require('./initQueryData')
  // 加载样式表
  loadStyles()
  // 等待前置项目
  require('../../../Plugins/lib/ssi-modal/ssi-modal.js')
  syncI18nData(noCache)
  await initQueryData()

  mw.hook('InPageEdit.init.modal').fire({ ssi_modal: window.ssi_modal })

  const { _msg } = require('../module/_msg')
  mw.hook('InPageEdit.init.i18n').fire({ _msg })

  // 导入全部模块
  const { about } = require('../module/about')
  const api = require('../module/api')
  const { articleLink } = require('../module/articleLink')
  const { linksHere } = require('../module/linksHere')
  const { loadQuickDiff } = require('../module/loadQuickDiff')
  const { preference } = require('../module/preference')
  const { pluginStore } = require('../module/pluginStore')
  const { progress } = require('../module/progress')
  const { quickDelete } = require('../module/quickDelete')
  const { quickDiff } = require('../module/quickDiff')
  const { quickEdit } = require('../module/quickEdit')
  const { quickPreview } = require('../module/quickPreview')
  const { quickRedirect } = require('../module/quickRedirect')
  const { quickRename } = require('../module/quickRename')
  const { specialNotice } = require('../module/specialNotice')
  const { versionInfo } = require('../module/versionInfo')
  const { updateNotice } = require('./updateNotice')

  // 初始化前置模块
  preference.set()
  mw.hook('wikipage.content').add(loadQuickDiff)
  await $.ready
  articleLink()
  updateNotice()

  // !暂定，触发用户插件
  pluginStore.initUserPlugin()

  // 写入模块
  var InPageEdit = {
    about,
    api,
    articleLink,
    linksHere,
    loadQuickDiff,
    preference,
    progress,
    quickDelete,
    quickDiff,
    quickEdit,
    quickPreview,
    quickRedirect,
    quickRename,
    specialNotice,
    version,
    versionInfo,
    // 别名 Alias
    delete: quickDelete,
    diff: quickDiff,
    edit: quickEdit,
    preview: quickPreview,
    redirect: quickRedirect,
    quickMove: quickRename,
    rename: quickRename,
  }

  // 锁定重要变量
  const importantVariables = ['api', 'version']
  importantVariables.forEach((key) => {
    try {
      Object.freeze(InPageEdit[key])
    } catch (e) {
      // Do nothing
    }
  })

  // 触发钩子，传入上下文
  mw.hook('InPageEdit').fire({
    _analysis() {},
    _msg,
    InPageEdit,
  })

  // 花里胡哨的加载提示
  console.info(
`    ____      ____                   ______    ___ __ 
   /  _/___  / __ \\____ _____ ____  / ____/___/ (_) /_
   / // __ \\/ /_/ / __ \`/ __ \`/ _ \\/ __/ / __  / / __/
 _/ // / / / ____/ /_/ / /_/ /  __/ /___/ /_/ / / /_  
/___/_/ /_/_/    \\__,_/\\__, /\\___/_____/\\__,_/_/\\__/  
                      /____/                v${version}`
  )

  // 传回InPageEdit
  return InPageEdit
}

module.exports = init
