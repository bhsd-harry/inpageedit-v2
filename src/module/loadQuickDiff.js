const config = mw.config.get()
const { _msg } = require('./_msg')
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
      if (diff === undefined && title.getNamespaceId() === -1) {
        const specialDiffName = (
          mw.config
            .get('wgSpecialPageAliases', [])
            .find(({ realname }) => realname === 'Diff')
            .aliases || ['Diff']
        ).join('|')
        const specialDiffReg = new RegExp(
          `^(?:${specialDiffName})/(\\d+|${RELATIVE_TYPES.join(
            '|'
          )})(?:/(\\d+|${RELATIVE_TYPES.join('|')}))?$`,
          'i'
        )
        const specialDiffMatch = title.getMainText().match(specialDiffReg)
        if (specialDiffMatch) {
          // 可能出现 [[Special:Diff/123]]，这种情况应该当做与前一版本比较
          diff = specialDiffMatch[2] || specialDiffMatch[1]
          oldid = !specialDiffMatch[2] ? 'prev' : specialDiffMatch[1]
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
      // 少数情况下可能只存在 diff，这种情况应该当做与前一版本比较
      if (!oldid && !curid) {
        oldid = 'prev'
      }
      /**
       * 描述型关系只能出现在 torelative 参数中
       * fromrelative 是不被接受的，所以进行翻转
       */
      if (RELATIVE_TYPES.includes(oldid)) {
        // eslint-disable-next-line no-extra-semi
        ;[diff, oldid] = [oldid, diff]
      }

      // 进行状态标记
      const $this = $(this).addClass('ipe-diff-mounted')

      // 构建请求参数
      const params = {}
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
        return quickDiff(params)
      })
    })
}

const loadQuickDiff = function (container) {
  /**
   * 此处原本使用 setInterval 处理开启了自动刷新的最近更改带来的问题
   * 现发现 wikipage.content 钩子似乎会在列表刷新时触发，因此不再需要 setInterval
   * @Dragon-Fish 2022年3月15日
   */
  injectLinks(container)

  // 查看历史页面的比较按钮与快速编辑
  if (config.wgAction === 'history') {
    $('.historysubmit.mw-history-compareselectedversions-button').after(
      $('<button>', { text: _msg('quick-diff') })
        .click((e) => {
          e.preventDefault()
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
