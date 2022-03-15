const config = mw.config.get()
const { _msg } = require('./_msg')
const { _analytics } = require('./_analytics')
const { _uri } = require('./_uri')

const { quickDiff } = require('./quickDiff')
const { quickEdit } = require('./quickEdit')

function injectLinks(container) {
  $(container || '#mw-content-text')
    .find('a[href]:not(.ipe-diff-mounted, .extiw)')
    .each(function () {
      const uri = _uri(this)
      if (uri === null) {
        return
      }
      /** @type {'prev' | 'next' | 'cur' | '0' | `${number}`} */
      let diff = uri.diff,
        /** @type {`${number}` | null} */
        curid = uri.curid,
        /** @type {'prev' | 'next' | 'cur' | `${number}`} */
        oldid = uri.oldid
      const RELATIVE_TYPES = ['prev', 'next', 'cur']

      // 形如 Special:Diff/[oldid]/[diff]
      const title = mw.Title.newFromText(uri.title || '')
      if (diff === undefined && title?.getNamespaceId() === -1) {
        const specialDiffName = mw.config
          .get('wgSpecialPageAliases', [])
          .find(({ realname }) => realname === 'Diff')
          ?.aliases || ['Diff']
        const specialDiffReg = new RegExp(
          `^(?:${specialDiffName.join('|')})/(\\d+|${RELATIVE_TYPES.join(
            '|'
          )})(?:/(\\d+|${RELATIVE_TYPES.join('|')}))?$`,
          'i'
        )
        const specialDiffMatch = title.getMainText().match(specialDiffReg)
        if (specialDiffMatch) {
          oldid = specialDiffMatch[1]
          diff = specialDiffMatch[2]
          if (diff === undefined) {
            diff = 'prev'
          }
        }
      }

      // 进行例外排除
      if (
        // 没有 diff 参数一般不是比较链接
        diff === undefined ||
        // Special:Undelete 中的比较链接
        config.wgCanonicalSpecialPageName === 'Undelete'
      ) {
        return
      }
      // 进行状态标记
      const $this = $(this).addClass('ipe-diff-mounted')
      // 缓存请求参数
      const params = {}
      // relative 只能出现在 to 参数中，需要特殊处理
      if (RELATIVE_TYPES.includes(oldid)) {
        // eslint-disable-next-line no-extra-semi
        ;[diff, oldid] = [oldid, diff]
      }
      const getParamType = (i) => {
        if (RELATIVE_TYPES.includes(i) || i === null) {
          return 'relative'
        } else if (i === '0') {
          return 'id'
        } else {
          return 'rev'
        }
      }
      params[`from${getParamType(oldid)}`] = oldid
      params[`to${getParamType(diff)}`] = diff !== '0' ? diff : curid

      // Debug
      $this.attr('ipe-diff-params', JSON.stringify(params))

      // 点击事件
      $this.click((e) => {
        e.preventDefault()
        _analytics('quick_diff_recentchanges')
        return quickDiff(params)
      })
    })
}

const loadQuickDiff = function (container) {
  // 最近更改
  injectLinks(container)

  // 查看历史页面的比较按钮与快速编辑
  if (config.wgAction === 'history') {
    $('.historysubmit.mw-history-compareselectedversions-button').after(
      $('<button>', { text: _msg('quick-diff') })
        .click((e) => {
          e.preventDefault()
          _analytics('quick_diff_history_page')
          const before = $('.selected.before').data('mw-revid'),
            after = $('.selected.after').data('mw-revid')
          quickDiff({ fromrev: after, torev: before })
        })
    )
    $('li[data-mw-revid]').each(function () {
      var $this = $(this),
        oldid = $this.data('mw-revid')
      $this.find('.mw-history-undo').after(
        $('<span>').append(
          ' | ',
          $('<a>', {
            href: '#',
            class: 'in-page-edit-article-link',
            text: _msg('quick-edit'),
          }).click((e) => {
            e.preventDefault()
            quickEdit({
              page: config.wgPageName,
              revision: oldid,
            })
          })
        )
      )
    })
  }
}

module.exports = {
  loadQuickDiff,
}
