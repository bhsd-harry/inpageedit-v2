async function initQueryData() {
  // Init
  mw.config.set('wgUserRights', [])
  mw.config.set('wgUserIsBlocked', false)
  mw.config.set('wgSpecialPageAliases', [])

  const {
    query: { userinfo, specialpagealiases },
  } = await new mw.Api().get({
    meta: ['userinfo', 'siteinfo'],
    uiprop: ['blockinfo', 'rights'],
    siprop: 'specialpagealiases',
    formatversion: 2,
  })
  // Blockinfo
  if (userinfo.blockid) {
    mw.config.set('wgUserIsBlocked', true)
  }
  // Rights
  mw.config.set('wgUserRights', userinfo?.rights || [])
  // Special page aliases
  mw.config.set('wgSpecialPageAliases', specialpagealiases)

  return
}

module.exports = {
  initQueryData,
}
