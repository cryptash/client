const patchContent = (oldNode, newNode) => {
  const oldContent = oldNode.textContent
  const newContent = newNode.textContent
  console.log([oldContent, newContent])
  if (oldContent !== newContent) {
    oldNode.innerText = newContent
  }
}

const diffAttrs = (oldAttrs, newAttrs, $node) => {
  // if (!newAttrs) return
  // setting newAttrs
  for (const attr of newAttrs) { // (4) весь список
    console.log(`${attr.name} = ${attr.value}`)
    $node.setAttribute(attr.name, attr.value)
  }

  // removing attrs
  for (const k of oldAttrs) {
    if (!(k in newAttrs)) {
      $node.removeAttribute(k)
    }
  }
}

const diffChildren = (oldVChildren, newVChildren, $parent) => {
  oldVChildren.forEach((oldVChild, i) => {
    checkDiff(oldVChild, newVChildren[i])
  })
  for (const additionalVChild of newVChildren.slice(oldVChildren.length)) {
    $parent.appendChild(additionalVChild)
  }
}

const checkDiff = (oldTree, newVTree) => {
  console.log(oldTree, newVTree)
  if (oldTree.tagName !== newVTree.tagName) {
    console.log('aa')
    // we assume that they are totally different and
    // will not attempt to find the differences.
    // simply render the newVTree and mount it.
    oldTree.replaceWith(newVTree)
  }
  patchContent(oldTree, newVTree)
  diffAttrs(oldTree.attributes, newVTree.attributes, oldTree)
  // eslint-disable-next-line max-len
  diffChildren(Array.from(oldTree.children), Array.from(newVTree.children), oldTree)
}

export default checkDiff
