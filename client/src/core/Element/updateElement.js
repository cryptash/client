const updateElement = (prevElement, nextElement) => {
  const dom = prevElement.dom
  nextElement.dom = dom
  const nextStyle = nextElement.props.style
  if (prevElement.style !== nextStyle) {
    Object.keys(nextStyle).forEach((s) => dom.style[s] = nextStyle[s])
  }
}
export {updateElement}
