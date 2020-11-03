import {decodeBase64} from 'tweetnacl-util'
export const formatKey = (key) => {
  if (typeof key === 'array') {
    return key
  }
  if (typeof key === 'string') {
    return decodeBase64(key)
  }
}
