import { createRouter, createWebHistory } from "vue-router"
// @ts-ignore
import Dashboard from '../views/Dashboard.vue'
// @ts-ignore
import Login from '../views/Login.vue'
// @ts-ignore
import Register from '../views/Register.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router