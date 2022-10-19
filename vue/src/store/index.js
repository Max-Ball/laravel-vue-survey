import { createStore } from 'vuex'
import axiosClient from '../axios'

const tmpSurveys = [
  {
    id: 100,
    title: "Max Survey",
    slug: "my survey me max",
    status: "draft",
    image: "https://www.thiscatdoesnotexist.com",
    description: "It's a survey by me",
    created_at: "2022-10-28 17:10:00",
    updated_at: "2022-10-28 17:10:00",
    expire_date: "2022-11-28 17:10:00",
    questions: [
      {
        id: 1,
        type: "select",
        question: "From which country are you?",
        description: null,
        data: {
          options: [
            { uuid: "f8af96f2-1d80-4632-9e9e-b560670e52ea", text: "USA" },
            { uuid: "d8af43s2-1d80-4632-9e9e-g564070e52fc", text: "China" }
          ]
        }
      },
      {
        id: 2,
        type: "checkbox",
        question: "Which language do you speak?",
        description: "what a dumb question",
        data: {
          options: [
            {
              uuid: "x8af46f2-1d80-4632-9e9e-b560670e52ea",
              text: "English"
            },
            {
              uuid: "t4af46f2-1d80-4632-3x4z-b560670e52ea",
              text: "Chinese"
            }
          ]
        }
      }
    ]
  },
  {
    id: 200,
    title: "Another Survey",
    slug: "another survey by me max",
    status: "draft",
    image: "https://www.thiscatdoesnotexist.com",
    description: "It's another survey by me",
    created_at: "2022-10-28 17:10:00",
    updated_at: "2022-10-28 17:10:00",
    expire_date: "2022-11-28 17:10:00",
    questions: [
      {
        id: 3,
        type: "select",
        question: "From which city are you?",
        description: null,
        data: {
          options: [
            { uuid: "s8af96f2-1d80-4632-9e9e-b560670e52ea", text: "Boise" },
            { uuid: "p8af43s2-1d80-4632-9e9e-g564070e52fc", text: "Portland" }
          ]
        }
      },
      {
        id: 4,
        type: "checkbox",
        question: "Which language do you write?",
        description: "what a dumb question",
        data: {
          options: [
            {
              uuid: "t8af46f2-1d80-4632-9e9e-b560670e52ea",
              text: "English"
            },
            {
              uuid: "m4af46f2-1d80-4632-3x4z-b560670e52ea",
              text: "Mandarin"
            }
          ]
        }
      }
    ]
  }
]

const store = createStore(
  {
    state: {
      user: {
        data: {},
        token: sessionStorage.getItem('TOKEN')
      },
      surveys: [...tmpSurveys],
      questionTypes: ["text", "select", "radio", "checkbox", "textarea"],
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