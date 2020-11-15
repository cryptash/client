import {box} from 'tweetnacl'
import nacl_util from 'tweetnacl-util'

export const generateKeyPair = () => {
  const {publicKey, secretKey} = box.keyPair()
  return {
    public_key: nacl_util.encodeBase64(publicKey),
    private_key: nacl_util.encodeBase64(secretKey),
  }
}
