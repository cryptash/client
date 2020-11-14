const matchPath = (pathname, options) => {
  const {exact = false, path} = options

  if (!path) {
    return {
      path: null,
      url: pathname,
      isExact: true,
    }
  }

  const match = new RegExp(`^${path.split(':')[0]}`).exec(pathname)
  // console.log(match)
  if (!match) {
    return null
  }

  const url = match[0]
  const isExact = pathname === url
  if (exact && !isExact) {
    return null
  }
  let param = {}
  if (path.includes(':')) {
    param = {
      [path.split(':')[1]]: pathname.split(match)[1],
    }
  }
  return {
    param,
    path,
    url,
    isExact,
  }
}

export {matchPath}
