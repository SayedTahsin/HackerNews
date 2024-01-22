function dhm(t) {
  const date = new Date(t * 1000)
  const now = new Date()
  let diffInMiliSeconds = Math.floor(now - date)

  var cy = 24 * 60 * 60 * 1000 * 365,
    cd = 24 * 60 * 60 * 1000,
    ch = 60 * 60 * 1000,
    y = Math.floor(diffInMiliSeconds / cy),
    d = Math.floor(diffInMiliSeconds / cd),
    h = Math.floor((diffInMiliSeconds - d * cd) / ch),
    m = Math.round((diffInMiliSeconds - d * cd - h * ch) / 60000)
  if (m === 60) {
    h++
    m = 0
  }
  if (h === 24) {
    d++
    h = 0
  }
  if (y) return `created ${y} years ago`
  else if (d != 0) return `created ${d} days ago`
  else if (h != 0) return `created ${h} hours ago`
  else return `created ${m} minutes ago`
}

function extractDomain(url) {
  const domainRegex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n]+)/im
  const matches = url.match(domainRegex)
  if (matches && matches[1]) {
    return matches[1]
  }
  return null
}

export { dhm, extractDomain }
