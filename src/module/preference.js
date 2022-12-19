const InPageEdit = window.InPageEdit

const { _msg, getObject } = require('./_msg')
const { $br, $hr, $progress, $checkbox, $radio, $link } = require('./_elements')

const {
  githubLink,
  pluginGithub,
  pluginCDN,
} = require('./api')
const version = require('./version')
const { pluginStore } = require('./pluginStore')

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
    if (typeof InPageEdit.myPreference === 'object') {
      Object.assign(local, InPageEdit.myPreference)
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
   * @example 可以这样 preference.set({ key: 'value' }) 也可以 preference.set('key', 'value')
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

    const $localWarning = $('<div>', {
      class: 'has-local-warn',
      style:
        'padding-left: 8px; border-left: 6px solid orange; font-size: small',
      html: _msg('preference-savelocal-popup-haslocal'),
    })

    /** 定义模态框内部结构 */
    const $tabList = $('<ul>', { class: 'tab-list' }).append(
      ...['editor', 'plugin', 'another', 'about'].map((val) =>
        $('<li>').append(
          $('<a>', { text: _msg(`preference-tab-${val}`), href: `#${val}` })
        )
      )
    )

    function saveLocal() {
      // 永久保存（本地用户页）
      const $saveLocalModal = $('<section>').append(
        _msg('preference-savelocal-popup'),
        $br,
        $('<textarea>', {
          style:
            'font-size: 12px; resize: none; width: 100%; height: 10em;',
          readonly: true,
        })
          .on('click', function () {
            this.select()
          })
          .val(
            `/** InPageEdit Preferences */\n;(window.InPageEdit = window.InPageEdit || {}).myPreference = ${JSON.stringify(
              $modalContent.data(),
              null,
              2
            )}`
          )
      )
      ssi_modal.dialog({
        className: 'in-page-edit',
        center: true,
        title: _msg('preference-savelocal-popup-title'),
        content: $saveLocalModal,
        okBtn: {
          className: 'btn btn-primary btn-single',
          label: _msg('ok'),
        },
      })
    }

    const $tabContent = $('<div>', {
      class: 'tab-content',
      style: 'position: relative;',
    }).append(
      $('<section>', { id: 'editor' }).append(
        $('<h3>', { text: _msg('preference-editor-title') }),
        $('<h4>', { text: _msg('preference-editHobits-label') }),
        $checkbox({ label: _msg('preference-setMinor'), id: 'editMinor' }),
        $checkbox({ label: _msg('preference-outSideClose'), id: 'outSideClose' }),
        $checkbox({
          label: _msg('preference-noConfirmEdit'),
          id: 'noConfirmEdit',
        }),
        $('<h4>', { text: _msg('preference-watchList-label') }),
        ...['nochange', 'preferences', 'unwatch', 'watch'].map((value) =>
          $radio({
            label: _msg(`preference-watchList-${value}`),
            name: 'watchList',
            value,
          })
        ),
        $('<h4>', { text: _msg('preference-summary-label') }),
        $('<label>', {
          for: 'editSummary',
          style: 'padding-left: 0; font-size: small',
          html: _msg('preference-editSummary'),
        }),
        $('<input>', {
          id: 'editSummary',
          style: 'width: 96%',
          placeholder: 'Edit via InPageEdit, yeah~',
        })
      ),
      $('<section>', { id: 'plugin' }).append(
        $('<h3>', { text: _msg('preference-plugin-title') }),
        $('<div>', {
          id: 'plugin-container',
          html: $($progress).css({
            width: '96%',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
          }),
        }),
        $('<div>', { class: 'plugin-footer' }).html(
          _msg('preference-plugin-footer', pluginGithub)
        )
      ),
      $('<section>', { id: 'another' }).append(
        $('<h3>', { text: _msg('preference-another-title') }),
        $('<h4>', { text: _msg('preference-display-label') }),
        $checkbox({
          label: _msg('preference-redLinkQuickEdit'),
          id: 'redLinkQuickEdit',
        }),
        $('<div>').append(
          $('<h4>', { text: 'Custom skin (Not available yet)' }),
          $('<label>', { class: 'choose-skin' }).append(
            $('<input>', {
              type: 'checkbox',
              id: 'customSkinEnable',
              disabled: true,
            }),
            $('<span>'),
            $('<input>', {
              id: 'customSkinUrl',
              disabled: true,
              style: 'width: calc(96% - 30px)',
              value: `${pluginCDN}/skins/ipe-default.css`,
            })
          )
        ),
        $('<h4>', { text: _msg('preference-savelocal-popup-title') }),
        $('<button>', {
          class: 'btn btn-secondary',
          id: 'ipeSaveLocalShow',
          text: _msg('preference-savelocal-btn'),
        }).on('click', saveLocal)
      ),
      $('<section>', { id: 'about' }).append(
        $('<h3>', { text: _msg('preference-about-label') }),
        $('<div>', { style: 'font-size: 12px; font-style: italic;' }).html(
          function () {
            const isCanary = version.includes('-')
            return isCanary
              ? `v${version} (Canary)<br>${_msg('version-notice-canary')}`
              : `v${version}`
          }
        ),
        $('<h4>', { text: 'Portal' }),
        $('<button>', {
          class: 'btn btn-secondary btn-single',
          text: _msg('preference-aboutAndHelp'),
        }).on('click', InPageEdit.about),
        $('<button>', {
          class: 'btn btn-secondary btn-single',
          style: 'margin-top: .5em;',
          text: _msg('preference-updatelog'),
        }).on('click', InPageEdit.versionInfo),
        $('<h4>', { text: 'Join us' }),
        $('<p>').append(
          $('<strong>', { text: 'GitHub' }),
          ': ',
          $link({ href: githubLink })
        ),
        $('<p>').append(
          $('<strong>', { text: 'QQ Group' }),
          ': ',
          '1026023666'
        ),
        $hr,
        $('<p>', {
          text: 'InPageEdit is a useful MediaWiki JavaScript Plugin written with jQuery',
        }),
        $('<p>').append(
          '© InPageEdit Copyright (C)',
          ' 2019 - ' + new Date().getFullYear(),
          ' Wjghj Project (机智的小鱼君), ',
          $link({
            href: 'https://www.gnu.org/licenses/gpl-3.0-standalone.html',
            text: 'GNU General Public License 3.0',
          })
        )
      )
    )

    const $modalContent = $('<div>', { class: 'preference-tabber' }).append(
      $localWarning,
      $tabList,
      $tabContent
    )

    // 绑定tab-list按钮事件
    $tabList.find('a').on('click', function (e) {
      e.preventDefault()
      const $this = $(this)
      const tab = $this.attr('href')
      if (tab) {
        $tabList.find('a').removeClass('active')
        $tabContent.find('section').removeClass('active')
        $this.addClass('active')
        $tabContent.find(tab).addClass('active')
      }
    })

    // 绑定input事件
    $tabContent.find('input').on('change', function () {
      const $this = $(this)
      const key = $this.attr('id') || $this.attr('name')
      let val
      if ($this.prop('type') === 'checkbox') {
        val = $this.prop('checked')
      } else {
        val = $this.val()
      }
      $modalContent.data(key, val)
      console.log('[InPageEdit] Preset preference', $modalContent.data())
    })

    // 预先选中第一个tab
    $tabList.find('a').first().addClass('active')
    $tabContent.find('section').first().addClass('active')

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
        const $input = $tabContent.find('#' + key)
        if ($input.length > 0) {
          if (typeof val === 'string') {
            $input.val(val)
          } else if (typeof val === 'boolean') {
            $input.prop('checked', val)
          }
        } else {
          $tabContent
            .find('input[name=' + key + ']')
            .each(function () {
              this.checked = this.value === val
            })
        }
      })
    }

    // 显示模态框
    ssi_modal.show({
      sizeClass: 'dialog',
      className: 'in-page-edit ipe-preference',
      outSideClose: false,
      title: _msg('preference-title') + ' - ' + version,
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
                  if (InPageEdit.myPreference !== undefined) {
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
            if (InPageEdit.myPreference !== undefined) {
              saveLocal()
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

        $localWarning.toggle(InPageEdit.myPreference !== undefined)

        // 将现有设定反映到选项中
        showPreference(this.get())

        // 获取插件列表
        const usedPlugin = this.get('plugins')
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
                href: 'https://github.com/' + val.author,
                text: '@' + val.author,
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
                  }).on('change', function () {
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
                  $('<div>', { class: 'plugin-description', text: description })
                )
              )
            )
          })
        }
      },
    }, $tabContent)
  },
}

module.exports = {
  preference,
}
