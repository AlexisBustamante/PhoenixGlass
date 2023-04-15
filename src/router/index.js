import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { auth } from '../firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',

    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../views/RegisterUser.vue')
  },
  {
    path: '/perfil',
    name: 'perfil',
    component: () => import(/* webpackChunkName: "about" */ '../views/PerfilView.vue'),
    meta: {
      authenticated: true
    }
  },
  {
    path: '/reservas',
    name: 'reservas',
    component: () => import(/* webpackChunkName: "about" */ '../views/ReservasView.vue'),
    meta: {
      authenticated: true
    }
  },
]




const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {

  let user = auth.currentUser;
  let autorizacion = to.matched.some(record => record.meta.authenticated);
  //console.log(user);
  //console.log(to);

  if (autorizacion && !user) {
    next('home');
  }
  else if (to.path == '/' && user) {
    next('perfil');
  }
  else {
    next();
  }


})

export default router
