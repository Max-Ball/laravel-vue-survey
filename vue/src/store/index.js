import { createStore } from 'vuex'
import axiosClient from '../axios'



const store = createStore(
  {
    state: {
      user: {
        data: {},
        token: sessionStorage.getItem('TOKEN')
      },
      currentSurvey: {
        loading: false,
        data: {}
      },
      surveys: {
        loading: false,
        data: [],
        links: []
      },
      questionTypes: ["text", "select", "radio", "checkbox", "textarea"],
      notification: {
        show: false,
        type: null,
        message: null
      }
    },
    getters: {},
    actions: {
      getSurvey({ commit }, id) {
        commit("setCurrentSurveyLoading", true)
        return axiosClient.get(`/survey/${id}`).then((res) => {
            commit("setCurrentSurvey", res.data)
            commit("setCurrentSurveyLoading", false)
            return res
          }).catch((err) => {
            commit("setCurrentSurveyLoading", false)
            throw err
        })
      },
      saveSurvey({ commit }, survey) {
        delete survey.image_url
        let response;
        if (survey.id) {
          console.log(survey.id);
          response = axiosClient
            .put(`/survey/${survey.id}`, survey)
            .then((res) => {
              commit("setCurrentSurvey", res.data)
              return res
          })
        } else {
          response = axiosClient.post("/survey", survey).then((res) => {
            commit("setCurrentSurvey", res.data)
            return res
          })
        }
        return response
      },
      deleteSurvey({ }, id) {
        console.log(id);
        return axiosClient.delete(`/survey/${id}`)
      },
      getSurveys({ commit }, { url = null } = {}) {
        url = url || '/survey'
        commit('setSurveysLoading', true)
        return axiosClient.get(url).then((res) => {
          commit('setSurveysLoading', false)
          commit('setSurveys', res.data)
          return res
        })
      },
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
      setCurrentSurveyLoading: (state, loading) => {
        state.currentSurvey.loading = loading
      },
      setSurveysLoading: (state, loading) => {
        state.surveys.loading = loading
      },
      setCurrentSurvey: (state, survey) => {
        state.currentSurvey.data = survey.data
      },
      setSurveys: (state, surveys) => {
        state.surveys.data = surveys.data
        state.surveys.links = surveys.meta.links
      },
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
      },
      notify: (state, {message, type}) => {
        state.notification.show = true;
        state.notification.type = type;
        state.notification.message = message;
        setTimeout(() => {
          state.notification.show = false
        }, 3000)
      },
    },
    modules: {}
  }
)

export default store