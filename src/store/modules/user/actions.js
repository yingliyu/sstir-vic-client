import { loginApi } from '@/service'
import * as MutationTypes from './mutation-types'
import { removeToken, setToken } from '@/utils/auth'

export default {
  getUserInfo ({ commit, state }) {
    return new Promise(async (resolve, reject) => {
      // 调用Api获取用户角色
      try {
        // 获取角色
        // const { roleList } = await loginApi.GetUserRole()
        // const roles = roleList instanceof Array ? [...roleList] : [roleList]
        const roles = ['admin']
        commit(MutationTypes.SET_USER_ROLES, roles)
        const temp = await loginApi.getUserInfo()
        console.log(temp)
        commit(MutationTypes.SET_USER_INFO, { ...temp })
        console.log(state)
        resolve(roles)
      } catch (err) {
        console.log('getuserinfo error')
        reject(err)
      }
    })
  },

  // 前端 登出
  fedLogOut ({ commit }) {
    return new Promise((resolve) => {
      commit(MutationTypes.SET_TOKEN, '')
      removeToken()
      resolve()
    })
  },

  logOut ({ commit }) {
    return new Promise((resolve, reject) => {
      commit(MutationTypes.SET_TOKEN, '')
      commit(MutationTypes.SET_USER_ROLES, [])
      removeToken()
      resolve()
    })
  },

  logIn ({ commit }, userInfo) {
    return new Promise(async (resolve, reject) => {
      try {
        const token = await loginApi.checkLogin(userInfo)
        const userName = userInfo.userName // userName: email

        if (token) {
          commit(MutationTypes.SET_TOKEN, token)
          commit(MutationTypes.SET_USER_INFO, { userName, token })
          setToken(token, userInfo.remeberPwd ? 30 : null)
        }
        resolve(token)
      } catch (err) {
        reject(err)
      }
    })
  }
}
