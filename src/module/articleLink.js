var config = mw.config.get()
const { _msg } = require('./_msg')

const { preference } = require('./preference')
const { quickEdit } = require('./quickEdit')
const { _uri } = require('./_uri')

/**
 * @module articleLink 获取段落编辑以及编辑链接
 * @param {string | HTMLAnchorElement | JQuery<HTMLAnchorElement>} el Anchors to inject edit links
 */
function articleLink(el) {
  if (!el) {
    if (preference.get('redLinkQuickEdit') === true) {
      el = $('#mw-content-text a')
    } else {
      el = $('#mw-content-text a:not(.new)')
    }
  }
  /** @type {JQuery<HTMLAnchorElement>} */
  const $el = $(el)
  $el.each(function () {
    const uri = _uri(this)
    if (uri === null || uri.title === undefined) {
      return
    }

    let action = uri.action || uri.veaction,
      title = uri.title,
      section = uri.section
        ? uri.section.replace(/T-/, '')
        : null,
      revision = uri.oldid

    // 暂时屏蔽 undo
    if (uri.undo) {
      return
    }

    if (['edit', 'editsource'].includes(action)) {
      $(this).addClass('ipe-articleLink-resolved').after(
        $('<span>', {
          class: 'in-page-edit-article-link-group',
        }).append(
          $('<a>', {
            href: '#',
            class: 'in-page-edit-article-link',
            text: _msg('quick-edit'),
          }).click(function (e) {
            e.preventDefault()
            var options = { page: title }
            if (revision !== null) {
              options.revision = revision
            } else if (section !== null) {
              options.section = section
            }
            if (!config.wgIsArticle) {
              options.reload = false
            }
            quickEdit(options)
          })
        )
      )
    }
  })
}

module.exports = {
  articleLink,
}
