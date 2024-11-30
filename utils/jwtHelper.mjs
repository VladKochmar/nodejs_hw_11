import jwt from 'jsonwebtoken'
import config from '../config/default.mjs'

const expiresIn = '60m'

const tokenKey = config.tokenKey

export function parseBearer(bearer, headers) {
  let token

  if (bearer.startsWith('Bearer ')) token = bearer.slice(7)

  try {
    const decoded = jwt.verify(token, prepareSecret(headers))
    return decoded
  } catch (err) {
    console.error(err)
    throw new Error('Invalid token')
  }
}

export function prepareToken(data, headers) {
  return jwt.sign(data, prepareSecret(headers), {
    expiresIn,
  })
}

function prepareSecret(headers) {
  return tokenKey + headers['user-agent'] + headers['accept-language']
}
