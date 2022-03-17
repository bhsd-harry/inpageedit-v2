const { config } = require('./util'),
  { wgServerName, wgScript, wgArticlePath } = config

function _uri(anchor) {
  const href = anchor.getAttribute('href')
  if (href === null || href.startsWith('#')) {
    return null
  }
  try {
    const uri = new mw.Uri(anchor.href),
      { query } = uri
    if (uri.host !== location.host && uri.host !== wgServerName) {
      return null
    } else if (query.title) {
      // skip
    } else if (uri.path.startsWith(`${wgScript}/`)) {
      query.title = decodeURIComponent(uri.path.slice(wgScript.length + 1))
    } else if (uri.path.startsWith(wgArticlePath.slice(0, -2))) {
      query.title = decodeURIComponent(uri.path.slice(wgArticlePath.length - 2))
    }
    return query
  } catch (e) {
    return null
  }
}

module.exports = {
  _uri,
}
