const createElement = (type, props, ...children) => {
  if (typeof type === 'string') {
    return {
      type,
      props: {
        ...props,
        children: children,
      },
      dom: null,
    }
  }
  if (typeof type === 'function') {
    return {
      type,
      props,
      dom: null,
    }
  }
}

export {createElement}
