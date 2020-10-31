const updateTextElement = (prev, next, parent) => {
  if (prev !== next) {
    parent.textContent = next
  }
}
export {updateTextElement}
