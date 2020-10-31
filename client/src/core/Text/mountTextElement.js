const mountTextElement = (vText, parent) => {
  const domNode = document.createTextNode(vText)
  parent.appendChild(domNode)
  return domNode
}
export {mountTextElement}
