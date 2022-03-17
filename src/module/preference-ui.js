const { _msg } = require('./_msg')
const { $br, $hr, $progress, $checkbox, $radio, $link } = require('./_elements')
const { githubLink, pluginGithub, pluginCDN } = require('./api')
const version = require('./version')

function saveLocal() {
  // 永久保存（本地用户页）
  const $saveLocalModal = $('<section>').append(
    _msg('preference-savelocal-popup'),
    $br,
    $('<textarea>', {
      readonly: true,
    })
      .css({
        'font-size': '12px',
        resize: 'none',
        width: '100%',
        height: '10em',
      })
      .click(function () {
        this.select()
      }).val(`/** InPageEdit Preferences */
;(window.InPageEdit = window.InPageEdit || {}).myPreference = ${JSON.stringify(
      $modalContent.data(),
      null,
      2
    )}`)
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

const $localWarning = $('<div>', {
  class: 'has-local-warn',
  html: _msg('preference-savelocal-popup-haslocal'),
}).css({
  'padding-left': '8px',
  'border-left': '6px solid orange',
  'font-size': 'small',
})

/** 定义模态框内部结构 */
const $tabList = $('<ul>', { class: 'tab-list' }).append(
  ...['editor', 'plugin', 'another', 'about'].map((val) =>
    $('<li>').append(
      $('<a>', { text: _msg(`preference-tab-${val}`), href: `#${val}` })
    )
  )
)

const $tabContent = $('<div>', {
  class: 'tab-content',
})
  .css('position', 'relative')
  .append(
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
        html: _msg('preference-editSummary'),
      }).css({
        'padding-left': 0,
        'font-size': 'small',
      }),
      $('<input>', {
        id: 'editSummary',
        placeholder: 'Edit via InPageEdit, yeah~',
      }).css('width', '96%')
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
      $('<div>', {
        class: 'plugin-footer',
        html: _msg('preference-plugin-footer', pluginGithub),
      })
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
            value: `${pluginCDN}/skins/ipe-default.css`,
          }).css('width', 'calc(96% - 30px)')
        )
      ),
      $('<h4>', { text: _msg('preference-savelocal-popup-title') }),
      $('<button>', {
        class: 'btn btn-secondary',
        id: 'ipeSaveLocalShow',
        text: _msg('preference-savelocal-btn'),
      }).click(saveLocal)
    ),
    $('<section>', { id: 'about' }).append(
      $('<h3>', { text: _msg('preference-about-label') }),
      $('<div>', {
        html: version.includes('-')
          ? `v${version} (Canary)<br>${_msg('version-notice-canary')}`
          : `v${version}`,
      }).css({
        'font-size': '12px',
        'font-style': 'italic',
      }),
      $('<h4>', { text: 'Portal' }),
      $('<button>', {
        class: 'btn btn-secondary btn-single',
        onclick: 'InPageEdit.about()',
        text: _msg('preference-aboutAndHelp'),
      }),
      $('<button>', {
        class: 'btn btn-secondary btn-single',
        onclick: 'InPageEdit.versionInfo()',
        text: _msg('preference-updatelog'),
      }).css('margin-top', '0.5em'),
      $('<h4>', { text: 'Join us' }),
      $('<p>').append(
        $('<strong>', { text: 'GitHub' }),
        ': ',
        $link({ href: githubLink })
      ),
      $('<p>').append($('<strong>', { text: 'QQ Group' }), ': ', '1026023666'),
      $hr,
      $('<p>', {
        // eslint-disable-next-line max-len
        text: 'InPageEdit is a useful MediaWiki JavaScript Plugin written with jQuery',
      }),
      $('<p>').append(
        '© InPageEdit Copyright (C)',
        ` 2019 - ${new Date().getFullYear()}`,
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
$tabList.find('a').click(function (e) {
  e.preventDefault()
  const $this = $(this)
  const tab = $this.attr('href')
  if (tab) {
    $tabList.find('a.active').removeClass('active')
    $tabContent.find('section.active').removeClass('active')
    $this.addClass('active')
    $tabContent.find(tab).addClass('active')
  }
})

// 绑定input事件
$tabContent.find('input').change(function () {
  const $this = $(this)
  const key = $this.attr('id') || $this.attr('name')
  let val
  if ($this.attr('type') === 'checkbox') {
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

module.exports = {
  $localWarning,
  $tabContent,
  $modalContent,
}
