/**
 * @module linksHere
 */

const { $progress, $link } = require('./_elements')
const { _msg } = require('./_msg')
const { mwApi, config } = require('./util')

/**
 * @function isFile
 * @returns {Boolean} Is file page?
 */
const isFile = (title) => {
  return mw.Title.newFromText(title).getNamespaceId() === 6
}

/**
 * @function getList
 * @param {Sting} title
 */
const getList = (title) => {
  const opt = {
    prop: isFile(title) ? 'fileusage' : 'linkshere',
    titles: title,
    formatversion: 2,
  }
  if (isFile(title)) {
    opt.fulimit = 'max'
  } else {
    opt.lhlimit = 'max'
  }
  return mwApi.get(opt)
}

/**
 * @function makeList
 * @param {Array} list
 */
const makeList = (list) => {
  const $list = $('<ol>', { class: 'ipe-links-here-list' })
  list.forEach(({ title, redirect }) => {
    $list.append(
      $('<li>').append(
        $link({ page: title }).attr('target', '_blank'),
        redirect !== undefined
          ? ' (<i>' + _msg('links-here-isRedirect') + '</i>)'
          : '',
        ' (',
        $link({ text: '← ' + _msg('links-here') }).on('click', function () {
          linksHere(title)
        }),
        ' | ',
        $link({ text: _msg('quick-edit') }).on('click', function () {
          require('./quickEdit').quickEdit({
            page: title,
            reload: false,
          })
        }),
        ')'
      )
    )
  })
  return $list
}

/**
 * @module linksHere
 * @param {string} title page title
 */
async function linksHere(title) {
  if (!title || typeof title !== 'string') {
    title = config.wgPageName
  }

  // 构建内容
  const $progressBar = $($progress)
  const $content = $('<div>').append($progressBar)

  // 构建模态框
  const modalObj = ssi_modal
    .show({
      className: 'in-page-edit ipe-links-here',
      center: true,
      sizeClass: 'dialog',
      title: _msg('links-here-title', title, 2),
      content: $content,
      onShow(modal) {
        mw.hook('InPageEdit.linksHere').fire({
          modal,
          $modal: modal.get$modal,
        })
      },
    })

  // 异步操作
  try {
    console.info('[InPageEdit] linksHere', '开始获取页面信息')
    const data = await getList(title)
    const { pages } = data.query
    const [page] = pages
    console.info('[InPageEdit] linksHere', '成功获取页面信息')
    let pageList = []
    // 判定为文件还是一般页面
    if (isFile(title)) {
      pageList = page.fileusage || []
    } else {
      pageList = page.linkshere || []
    }
    $progressBar.hide()
    // 如果存在页面，则插入列表，否则显示提示
    if (pageList.length > 0) {
      const $list = makeList(pageList)
      $content.append($list)
    } else {
      $content.append(
        $('<div>', {
          class: 'ipe-links-here-no-page',
          html: _msg('links-here-no-page', title),
        })
      )
    }
    // 配置西文单数名词
    if (pageList.length < 2) {
      modalObj.setTitle(_msg('links-here-title', title, 1))
    }
    if (page.missing) {
      $content.append(
        $('<div>', {
          html: _msg('links-here-not-exist', title),
          class: 'ipe-links-here-not-exist',
        })
      )
    }
    // 发射钩子
    mw.hook('InPageEdit.linksHere.pageList').fire(pageList)
    return pageList
  } catch (err) {
    $progressBar.hide()
    $content.append($('<p>', { class: 'error', html: err }))
    console.error('[InPageEdit] linksHere', '获取页面信息时出现问题', err)
    return err
  }
}

module.exports = {
  linksHere,
}
