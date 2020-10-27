export const createStore = (rootReducer, initialState ={}) => {
  let state = rootReducer(initialState, {type: '__INIT__'})

  let listeners = []
  return {
    subscribe(callback) {
      listeners.push(callback)
      return {
        unsubscribe() {
          listeners = listeners.filter((fn) => fn !== callback)
        },
      }
    },
    dispatch(action) {
      state = rootReducer(state, action)
      listeners.forEach((fn) => fn(state))
    },
    getState() {
      return state
    },
  }
}
