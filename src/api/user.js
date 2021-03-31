import request from '@/axios/request'
import { encryptedData } from '@/utils/encrypt'
import { loginRSA, tokenName } from '@/config'

export async function login(data) {
  if (loginRSA) {
    // data = await encryptedData(data)
  }
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getUserInfo(accessToken) {
  return request.post('/userInfo', {
    [tokenName]: accessToken
  })
}

export function logout() {
  return request.post('/logout')
}

export function register() {
  return request.post('/register')
}

export function getPublicKey() {
  return request.post('/publicKey')
}

export function getRouterList(data) {
  return request.post('/menu/navigate', data)
}
