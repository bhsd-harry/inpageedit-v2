/**
 * @module _elements 常用html元素
 */

const { getUrl } = mw.util

const $br = '<br>'
const $hr = '<hr>'
const $link = ({ page, link, href, text, html }) => {
  if (page) {
    href = getUrl(page)
  } else {
    // eslint-disable-next-line no-script-url
    href = href || link || 'javascript:void(0);'
  }
  html = html || mw.html.escape(text || page || href || '')
  let target
  if (/^https?:\/\//.test(href)) {
    target = '_blank'
  }
  return $('<a>', { href, target, html })
}
const $progress =
  // eslint-disable-next-line max-len
  '<div class="ipe-progress" style="width:100%"><div class="ipe-progress-bar"></div></div>'
const $iframe = (src) =>
  $('<section>').append(
    $('<iframe>', { src }).css({
      margin: 0,
      padding: 0,
      width: '100%',
      height: '80vh',
      border: 0,
    })
  )

module.exports = {
  $br,
  br: $br,
  $hr,
  hr: $hr,
  $link,
  $progress,
  progress: $progress,
  $iframe,
}
