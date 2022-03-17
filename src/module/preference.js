const { _msg, getObject } = require('./_msg')
const ipe = window.InPageEdit
const version = require('./version')
const { pluginStore } = require('./pluginStore')
const { $link } = require('./_elements')
const { $localWarning, $tabContent, $modalContent } = require('./preference-ui')

// 总是使用 preference.get() 或 preference.set() 访问这个变量
let local = getObject('InPageEditPreference')

/**
 * @module preference 个人设置模块
 */
const preference = {
  /**
   * @name 预设值
   * @return {object}
   */
  _defaults: {
    editMinor: false,
    editSummary: _msg('preference-summary-default'),
    lockToolBox: false,
    redLinkQuickEdit: true,
    outSideClose: true,
    watchList: 'preferences',
    noConfirmEdit: false,
    plugins: ['toolbox.js', 'wiki-editor.js'],
  },
  /**
   * @name 获取设置
   * @description 合并保存在用户页的设置以及localStorage的设置，有容错机制
   * @param {string} setting 返回相应的设置，为空时返回全部设置
   * @return {object|string}
   */
  get(setting) {
    if (typeof ipe.myPreference === 'object') {
      Object.assign(local, ipe.myPreference)
    }
    local = $.extend({}, this._defaults, local)
    /**
     * < 14.3.0 版本中的 watchList 语义与现在不同
     * 需要统一转换为 'preferences'
     * @bhsd-harry @Dragon-Fish 2022年3月15日
     */
    if (
      !['watch', 'unwatch', 'preferences', 'nochange'].includes(local.watchList)
    ) {
      local.watchList = 'preferences'
    }
    if (typeof setting === 'string' && setting !== '') {
      return local[setting] || null
    }
    return local
  },
  /**
   * @name 保存设置
   * @param {Object|string} settingKey
   * @param {any} settingValue
   * @example 可以 preference.set({ key: value }) 也可以 preference.set('key', value)
   */
  set(settingKey = {}, settingValue = undefined) {
    let options = {}
    if (typeof settingKey === 'string' && settingValue !== undefined) {
      options[settingKey] = settingValue
    } else if (typeof settingKey === 'object') {
      options = settingKey
    } else {
      return
    }
    local = $.extend({}, this.get(), options)
    const json = JSON.stringify(local)
    localStorage.setItem('InPageEditPreference', json)
  },
  /**
   * @name 用户图形界面
   * @description 打开可视化设置窗口
   */
  modal() {
    mw.hook('pluginPreference').fire()

    function showPreference(obj) {
      $.each(obj, (key, val) => {
        if (key === 'plugins') {
          $modalContent.data(key, val.concat([]))
          $tabContent.find('.plugin-checkbox').each(function () {
            this.checked = val.includes(this.id)
          })
          return
        }
        $modalContent.data(key, val)
        const $input = $tabContent.find(`#${key}`)
        if ($input.length > 0) {
          if (typeof val === 'string') {
            $input.val(val)
          } else if (typeof val === 'boolean') {
            $input.prop('checked', val)
          }
        } else {
          $tabContent.find(`input[name=${key}]`).each(function () {
            this.checked = this.value === val
          })
        }
      })
    }

    // 显示模态框
    ssi_modal.show(
      {
        sizeClass: 'dialog',
        className: 'in-page-edit ipe-preference',
        outSideClose: false,
        title: `${_msg('preference-title')} - ${version}`,
        content: $modalContent,
        keepContent: true,
        buttons: [
          {
            label: _msg('preference-reset'),
            className: 'btn btn-danger',
            method: (a, modal) => {
              ssi_modal.confirm(
                {
                  title: _msg('preference-reset-confirm-title'),
                  content: _msg('preference-reset-confirm'),
                  className: 'in-page-edit',
                  center: true,
                  okBtn: {
                    label: _msg('ok'),
                    className: 'btn btn-danger',
                  },
                  cancelBtn: {
                    label: _msg('cancel'),
                    className: 'btn',
                  },
                },
                (res) => {
                  if (res) {
                    if (ipe.myPreference !== undefined) {
                      showPreference(this._defaults)
                    } else {
                      this.set(this._defaults)
                      modal.close()
                    }
                  } else {
                    return false
                  }
                }
              )
            },
          },
          {
            label: _msg('preference-save'),
            className: 'btn btn-primary',
            method: (a, modal) => {
              if (ipe.myPreference !== undefined) {
                $('#ipeSaveLocalShow').triggerHandler('click')
              } else {
                this.set($modalContent.data())
                modal.close()
              }
            },
          },
        ],
        onShow: ($modal) => {
          const $modalWindow = $(document.getElementById($modal.modalId))
          mw.hook('InPageEdit.preference.modal').fire({
            $modal,
            $modalWindow,
          })

          $localWarning.toggle(ipe.myPreference !== undefined)

          // 将现有设定反映到选项中
          showPreference(this.get())

          // 获取插件列表
          const usedPlugin = this.get().plugins
          if ($tabContent.find('#plugin-container > ul').length === 0) {
            const pluginCache = pluginStore.loadCache()
            if (pluginCache) {
              showPluginList(pluginCache)
            } else {
              pluginStore.get().then((list) => {
                pluginStore.saveCache(list)
                showPluginList(list)
              })
            }
          }
          function showPluginList(list) {
            const $container = $tabContent.find('#plugin-container').empty()
            const $ul = $('<ul>').appendTo($container)
            $.each(list, (key, val) => {
              const name = val.name || 'Unknown'
              const description = val.description || ''
              const author = val.author
                ? $link({
                    href: `https://github.com/${val.author}`,
                    text: `@${val.author}`,
                  })
                : '-'
              $ul.append(
                $('<li>').append(
                  $('<label>').append(
                    $('<input>', {
                      class: 'plugin-checkbox',
                      id: key,
                      type: 'checkbox',
                      checked: Boolean(
                        usedPlugin.includes(key) || val._force === true
                      ), // 勾选当前正在使用以及强制启用的插件
                      disabled: val._force === true, // 强制启用时禁止改变
                    }).change(function () {
                      // 当插件选择框变化时，暂存设定档
                      const $this = $(this)
                      const checked = $this.prop('checked')
                      const original = $modalContent.data('plugins')
                      const index = original.indexOf(key)
                      // 勾选且暂未启用
                      if (checked && index < 0) {
                        original.push(key)
                      }
                      // 取消勾选且已启用
                      if (!checked && index >= 0) {
                        original.splice(index, 1)
                      }
                    }),
                    $('<span>'), // checkbox框框
                    $('<div>', { class: 'plugin-name', text: name }),
                    $('<div>', { class: 'plugin-author', html: author }),
                    $('<div>', {
                      class: 'plugin-description',
                      text: description,
                    })
                  )
                )
              )
            })
          }
        },
      },
      $tabContent
    )
  },
}

module.exports = {
  preference,
}
