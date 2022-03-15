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

module.exports = {
  $br,
  br: $br,
  $hr,
  hr: $hr,
  $link,
  $progress,
  progress: $progress,
}
