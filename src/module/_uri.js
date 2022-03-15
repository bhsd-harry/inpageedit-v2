function _uri(anchor) {
  const href = anchor.getAttribute('href')
  if (href === null || href.startsWith('#')) {
    return null
  }
  try {
    const uri = new mw.Uri(anchor.href),
      query = uri.query,
      conf = mw.config.values
    if (uri.host !== conf.wgServerName) {
      return null
    } else if (query.title) {
      // skip
    } else if (uri.path.startsWith(conf.wgScript + '/')) {
      query.title = uri.path.slice(conf.wgScript.length + 1) || undefined
    } else {
      const articlePath = new RegExp(
          '^' + conf.wgArticlePath.replace('$1', '(.+)') + '$'
        ),
        article = uri.path.match(articlePath)
      if (article) {
        query.title = decodeURIComponent(article[1])
      }
    }
    return query
  } catch {
    return null
  }
}

module.exports = {
  _uri,
}
