const { mwApi } = require('./util')
const { _msg } = require('./_msg')
const { preference } = require('./preference')
const { $br, $progress } = require('./_elements')
const { _error } = require('./_error')

/**
 * @module quickDiff 快速页面差异模块
 * @param {Object} param standard MediaWiki API params
 */
const quickDiff = function (param) {
  mw.hook('InPageEdit.quickDiff').fire()
  mw.loader.load(['mediawiki.legacy.shared', 'mediawiki.diff.styles'])
  let $modalTitle, $diffArea, $loading
  let $quickDiff = $('.quick-diff')
  if ($quickDiff.length > 0) {
    console.info('[InPageEdit] Quick diff 正在加载新内容')
    $modalTitle = $quickDiff.find('.pageName')
    $diffArea = $quickDiff.find('.diffArea')
    $loading = $quickDiff.find('.ipe-progress')
    $modalTitle.text(_msg('diff-loading'))
    $diffArea.hide()
    $quickDiff.appendTo(document.body)
  } else {
    $modalTitle = $('<span>', { class: 'pageName', text: _msg('diff-loading') })
    $diffArea = $('<div>', { class: 'diffArea', style: 'display: none' })
    $loading = $($progress)

    ssi_modal.show({
      outSideClose: preference.get('outSideClose'),
      className: 'in-page-edit quick-diff',
      sizeClass: 'large',
      fixedHeight: true,
      fitScreen: true,
      title: $modalTitle,
      content: $('<div>').append($loading, $diffArea),
      buttons: [
        {
          label: _msg('diff-button-todiffpage'),
          className: 'btn btn-secondary toDiffPage',
        },
      ],
    })
    $quickDiff = $('.quick-diff')
  }
  $loading
    .show()
    .css('margin-top', $quickDiff.find('.ssi-modalContent').height() / 2)
  $quickDiff.find('.toDiffPage').off('click')
  param.action = 'compare'
  param.prop = 'diff|rel|ids|title|user|parsedcomment|size'
  param.formatversion = 2
  param.errorformat = 'html'
  if (param.totext) {
    param.topst = true
  } else if (param.fromtext) {
    param.frompst = true
  }
  mwApi
    .post(param)
    .done(function ({ compare, warnings }) {
      const diffTable = compare.body
      let toTitle
      $loading.hide()
      if (param.pageName === undefined) {
        toTitle = compare.totitle
      } else {
        toTitle = param.pageName
      }
      function userLink(user) {
        return (
          '<a class="diff-user" href="' +
          mw.util.getUrl('User:' + user) +
          '">' +
          user +
          '</a> (<a href="' +
          mw.util.getUrl('User_talk:' + user) +
          '">' +
          _msg('diff-usertalk') +
          '</a> | <a href="' +
          mw.util.getUrl('Special:Contributions/' + user) +
          '">' +
          _msg('diff-usercontrib') +
          '</a> | <a href="' +
          mw.util.getUrl('Special:Block/' + user) +
          '">' +
          _msg('diff-userblock') +
          '</a>)'
        )
      }
      $modalTitle.html(_msg('diff-title') + ': <u>' + toTitle + '</u>')
      $diffArea
        .show()
        .empty()
        .append(
          $('<table>', { class: 'diff difftable' }).append(
            $('<colgroup>').append(
              $('<col>', { class: 'diff-marker' }),
              $('<col>', { class: 'diff-content' }),
              $('<col>', { class: 'diff-marker' }),
              $('<col>', { class: 'diff-content' })
            ),
            $('<tbody>').append(
              $('<tr>').append(
                $('<td>', { colspan: 2, class: 'diff-otitle' }).append(
                  $('<a>', {
                    href: mw.util.getUrl('', { oldid: compare.fromrevid }),
                    text: compare.fromtitle,
                  }),
                  ' (',
                  $('<span>', {
                    class: 'diff-version',
                    text: _msg('diff-version') + compare.fromrevid,
                  }),
                  ') (',
                  $('<a>', {
                    class: 'editLink',
                    href: mw.util.getUrl(compare.fromtitle, {
                      action: 'edit',
                      oldid: compare.fromrevid,
                    }),
                    text: _msg('diff-edit'),
                  }),
                  ')',
                  $br,
                  userLink(compare.fromuser),
                  $br,
                  ' (',
                  $('<span>', {
                    class: 'diff-comment',
                    html: compare.fromparsedcomment,
                  }),
                  ') ',
                  $br,
                  $('<a>', {
                    class: 'prevVersion',
                    href: '#',
                    text: '←' + _msg('diff-prev'),
                  })
                    .toggle(Boolean(compare.prev))
                    .on('click', (e) => {
                      e.preventDefault()
                      quickDiff({
                        fromrev: compare.prev,
                        torev: compare.fromrevid,
                      })
                    })
                ),
                $('<td>', { colspan: 2, class: 'diff-ntitle' }).append(
                  $('<a>', {
                    href: mw.util.getUrl('', { oldid: compare.torevid }),
                    text: compare.totitle,
                  }),
                  ' (',
                  $('<span>', {
                    class: 'diff-version',
                    text: _msg('diff-version') + compare.torevid,
                  }),
                  ') (',
                  $('<a>', {
                    class: 'editLink',
                    href: mw.util.getUrl(compare.totitle, {
                      action: 'edit',
                      oldid: compare.torevid,
                    }),
                    text: _msg('diff-edit'),
                  }),
                  ')',
                  $br,
                  userLink(compare.touser),
                  $br,
                  ' (',
                  $('<span>', {
                    class: 'diff-comment',
                    html: compare.toparsedcomment,
                  }),
                  ') ',
                  $br,
                  $('<a>', {
                    class: 'nextVersion',
                    href: '#',
                    text: _msg('diff-nextv') + '→',
                  })
                    .toggle(Boolean(compare.next))
                    .on('click', (e) => {
                      e.preventDefault()
                      quickDiff({
                        fromrev: compare.torevid,
                        torev: compare.next,
                      })
                    })
                )
              ),
              diffTable,
              $('<tr>', {
                class: 'diffSize',
                style: 'text-align: center',
              }).append(
                $('<td>', {
                  colspan: '2',
                  text: compare.fromsize + _msg('diff-bytes'),
                }),
                $('<td>', {
                  colspan: '2',
                  text: compare.tosize + _msg('diff-bytes'),
                })
              )
            )
          )
        )
      $quickDiff.find('button.toDiffPage').on('click', function () {
        location.href = mw.util.getUrl('', {
          oldid: compare.fromrevid,
          diff: compare.torevid,
        })
      })
      require('./articleLink').articleLink($quickDiff.find('.editLink'))
      if (param.isPreview === true) {
        $quickDiff.find('button.toDiffPage').hide()
        $diffArea
          .find('.diff-otitle')
          .html('<b>' + _msg('diff-title-original-content') + '</b>')
        $diffArea
          .find('.diff-ntitle')
          .html('<b>' + _msg('diff-title-your-content') + '</b>')
      }
      if (compare.fromsize === undefined || compare.tosize === undefined) {
        $diffArea.find('.diffSize').hide()
      }
      // 无上一版本或下一版本
      if (!compare.fromrevid && !param.isPreview) {
        $diffArea
          .find('.diff-otitle')
          .empty()
          .append(
            $('<span>', {
              class: 'noPrevVerson',
              text: warnings?.compare?.warnings || 'Previous version not exist',
            })
          )
      }
      if (!compare.torevid && !param.isPreview) {
        $diffArea
          .find('.diff-otitle')
          .empty()
          .append(
            $('<span>', {
              class: 'noNextVerson',
              text: warnings?.compare?.warnings || 'Next version not exist',
            })
          )
      }
      // GitHub@issue#5 修复被隐藏版本的问题
      if (compare.fromtexthidden !== undefined) {
        $diffArea
          .find('.diff-otitle .diff-version')
          .addClass('diff-hidden-history')
      }
      if (compare.totexthidden !== undefined) {
        $diffArea
          .find('.diff-ntitle .diff-version')
          .addClass('diff-hidden-history')
      }
      if (compare.fromuserhidden !== undefined) {
        $diffArea
          .find('.diff-otitle .diff-user')
          .addClass('diff-hidden-history')
      }
      if (compare.touserhidden !== undefined) {
        $diffArea
          .find('.diff-ntitle .diff-user')
          .addClass('diff-hidden-history')
      }
      if (compare.fromcommenthidden !== undefined) {
        $diffArea.find('.diff-comment').addClass('diff-hidden-history')
      }
      if (compare.tocommenthidden !== undefined) {
        $diffArea
          .find('.diff-ntitle .diff-comment')
          .addClass('diff-hidden-history')
      }
    })
    .fail(function (errorCode, errorThrown) {
      console.warn('[InPageEdit] 快速差异获取失败')
      const html = _error(errorCode, errorThrown)
      $loading.hide()
      if (errorThrown.errors) {
        $diffArea
          .show()
          .html(
            _msg('diff-error') +
              ': ' +
              html +
              '(<code>' +
              errorCode +
              '</code>)'
          )
      } else {
        $diffArea.show().html(_msg('diff-error'))
      }
    })
}

module.exports = {
  quickDiff,
}
