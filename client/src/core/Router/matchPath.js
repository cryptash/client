const matchPath = (pathname, options) => {
  const {exact = false, path} = options

  if (!path) {
    return {
      path: null,
      url: pathname,
      isExact: true,
    }
  }

  const match = new RegExp(`^${path}`).exec(pathname)

  if (!match) {
    return null
  }

  const url = match[0]
  const isExact = pathname === url
  if (exact && !isExact) {
    return null
  }
  return {
    path,
    url,
    isExact,
  }
}

export {matchPath}
