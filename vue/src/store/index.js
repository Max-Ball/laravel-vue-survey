import { createStore } from 'vuex'
import axiosClient from '../axios'

const store = createStore(
  {
    state: {
      user: {
        data: {},
        token: sessionStorage.getItem('TOKEN')
      }
    },
    getters: {},
    actions: {
      register({ commit }, user) {
        return axiosClient.post('/register', user)
          .then((data) => {
            commit('setUser', data)
            return data
          })
      },
      login({ commit }, user) {
        return axiosClient.post('/login', user)
          .then((data) => {
            commit('setUser', data)
            console.log(data);
            return data

          })
      },
      logout({ commit }) {
        console.log(this.state.user, 'user info');
        return axiosClient.post('/logout')
          .then(response => {
            commit('logout')
            return response
          })
      }
    },
    mutations: {
      logout: (state) => {
        // @ts-ignore
        state.user.data = {}
        state.user.token = null
      },
      setUser: (state, userData) => {
        state.user.token = userData.data.token
        state.user.data = userData.data.user
        sessionStorage.setItem('TOKEN', userData.data.token)
        console.log('token Data', userData.data.token);
        console.log('user Data', userData.data.user);
        console.log('token state', state.user.token);
        console.log('user state', state.user.data);
      }
    },
    modules: {}
  }
)

export default store