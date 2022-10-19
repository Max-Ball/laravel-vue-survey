import { createRouter, createWebHistory } from "vue-router"
// @ts-ignore
import DefaultLayout from '../components/DefaultLayout.vue'
// @ts-ignore
import AuthLayout from '../components/AuthLayout.vue'
// @ts-ignore
import Login from '../views/Login.vue'
// @ts-ignore
import Register from '../views/Register.vue'
// @ts-ignore
import Dashboard from '../views/Dashboard.vue'
// @ts-ignore
import Surveys from '../views/Surveys.vue'
// @ts-ignore
import SurveyView from '../views/SurveyView.vue'
import store from "../store"

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '/dashboard', name: 'Dashboard', component: Dashboard },
      { path: '/surveys', name: 'Surveys', component: Surveys },
      { path: '/surveys/create', name: 'SurveyCreate', component: SurveyView },
      { path: '/surveys/:id', name: 'SurveyView', component: SurveyView }
    ]
  },
  {
    path: '/auth',
    redirect: '/login',
    name: 'Auth',
    meta: { isGuest: true },
    component: AuthLayout,
    children: [
      {
        path: '/login',
        name: 'Login',
        component: Login
      },
      {
        path: '/register',
        name: 'Register',
        component: Register
      }
    ]

  }
];
const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({ name: 'Login' })
  } else if (store.state.user.token && to.meta.isGuest) {
    next({ name: 'Dashboard' })
  } else {
    next()
  }
})

export default router