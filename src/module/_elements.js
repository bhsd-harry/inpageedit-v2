/**
 * @module _elements 常用html元素
 */

var { getUrl } = mw.util

var $br = '<br>'
var $button = ({ type, text, html, href, link }) => {
  html = html || mw.html.escape(text || '')
  href = href || link
  var $btn = $('<button>', { class: type ? 'btn btn-' + type : 'btn', html })
  if (href) {
    var target = ''
    if (/^https?:\/\//.test(href)) target = '_blank'
    var $a = $('<a>', { target, href })
    $btn.appendTo($a)
  }
  return $btn
}
var $hr = '<hr>'
var $link = ({ page, link, href, text, html }) => {
  if (page) {
    href = getUrl(page)
  } else {
    href = href || link || 'javascript:void(0);'
  }
  html = html || mw.html.escape(text || '') || page || href
  var target = ''
  if (/^https?:\/\//.test(href)) {
    target = '_blank'
  }
  return $('<a>', { href, target, html })
}
var $progress =
  '<div class="ipe-progress" style="width: 100%"><div class="ipe-progress-bar"></div></div>'
var $checkbox = ({ label, checked, id, className }) => {
  return $('<label>', { class: className })
    .append(
      $('<input>', { type: 'checkbox', checked, id }),
      $('<span>', { class: 'ipe-checkbox-box' }),
      $('<span>', { html: label })
    )
    .css('display', 'block')
}

module.exports = {
  $br,
  br: $br,
  $button,
  $hr,
  hr: $hr,
  $link,
  $progress,
  progress: $progress,
  $checkbox,
}
