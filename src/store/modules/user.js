// initial state
import { getUserInfo, login, logout } from '@/api/user'
import { tokenName } from '@/config/setting.config.js'
import { resetRouter } from '@/router'

import {
  getAccessToken,
  removeAccessToken,
  setAccessToken
} from '@/utils/accessToken'

const state = () => ({
  accessToken: getAccessToken(),
  permissions: [],
  username: '',
  avatar: ''
})

// getters
const getters = {
  accessToken: (state) => state.accessToken,
  permissions: (state) => state.permissions,
  username: (state) => state.username,
  avatar: (state) => state.avatar
}

// actions
const actions = {
  setPermissions({ commit }, permissions) {
    commit('setPermissions', permissions)
  },
  // 获取个人信息
  async getUserInfo({ commit, state }) {
    const { data } = await getUserInfo(state.accessToken)
    if (!data) {
      // Vue.prototype.$baseMessage('验证失败，请重新登录...', 'error')
      return false
    }
    let { permissions, username, avatar } = data
    if (permissions && username && Array.isArray(permissions)) {
      commit('setPermissions', permissions)
      commit('setUsername', username)
      commit('setAvatar', avatar)
      return permissions
    } else {
      // console.log('用户信息接口异常', 'error')
      return false
    }
  },
  resetAccessToken({ commit }) {
    commit('setPermissions', [])
    commit('setAccessToken', '')
    removeAccessToken()
  },
  async login({ commit }, userInfo) {
    const { data } = await login(userInfo)
    const accessToken = data[tokenName]
    if (accessToken) {
      commit('setAccessToken', accessToken)
    }
  },
  async logout({ dispatch }) {
    await logout(state.accessToken)
    await dispatch('resetAccessToken')
    await resetRouter()
  }
}

// mutations
const mutations = {
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken
    setAccessToken(accessToken)
  },
  setUsername(state, username) {
    state.username = username
  },
  setAvatar(state, avatar) {
    state.avatar = avatar
  },
  setPermissions(state, permissions) {
    state.permissions = permissions
  }
}

export default { state, getters, mutations, actions }

