import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _8dcfbeb4 = () => interopDefault(import('../pages/about.vue' /* webpackChunkName: "pages/about" */))
const _6e5d2571 = () => interopDefault(import('../pages/add-recipe.vue' /* webpackChunkName: "pages/add-recipe" */))
const _53e1390e = () => interopDefault(import('../pages/contact.vue' /* webpackChunkName: "pages/contact" */))
const _5268b444 = () => interopDefault(import('../pages/forgot-password.vue' /* webpackChunkName: "pages/forgot-password" */))
const _07baf644 = () => interopDefault(import('../pages/ingredients/index.vue' /* webpackChunkName: "pages/ingredients/index" */))
const _bb10c2fc = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _09a36a4e = () => interopDefault(import('../pages/privacy-policy.vue' /* webpackChunkName: "pages/privacy-policy" */))
const _8c607cfe = () => interopDefault(import('../pages/recipes/index.vue' /* webpackChunkName: "pages/recipes/index" */))
const _3c87d31a = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _26236942 = () => interopDefault(import('../pages/search.vue' /* webpackChunkName: "pages/search" */))
const _5aacfd7c = () => interopDefault(import('../pages/ingredients/_ingredient.vue' /* webpackChunkName: "pages/ingredients/_ingredient" */))
const _c09dc7c8 = () => interopDefault(import('../pages/recipes/_recipe.vue' /* webpackChunkName: "pages/recipes/_recipe" */))
const _4e60092a = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _4c87d324 = () => interopDefault(import('../pages/_profile/index.vue' /* webpackChunkName: "pages/_profile/index" */))
const _089b5ba8 = () => interopDefault(import('../pages/_profile/edit.vue' /* webpackChunkName: "pages/_profile/edit" */))
const _2534d03a = () => interopDefault(import('../pages/_profile/recipes/index.vue' /* webpackChunkName: "pages/_profile/recipes/index" */))
const _73e53ed6 = () => interopDefault(import('../pages/_profile/recipes/_recipe.vue' /* webpackChunkName: "pages/_profile/recipes/_recipe" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _8dcfbeb4,
    name: "about"
  }, {
    path: "/add-recipe",
    component: _6e5d2571,
    name: "add-recipe"
  }, {
    path: "/contact",
    component: _53e1390e,
    name: "contact"
  }, {
    path: "/forgot-password",
    component: _5268b444,
    name: "forgot-password"
  }, {
    path: "/ingredients",
    component: _07baf644,
    name: "ingredients"
  }, {
    path: "/login",
    component: _bb10c2fc,
    name: "login"
  }, {
    path: "/privacy-policy",
    component: _09a36a4e,
    name: "privacy-policy"
  }, {
    path: "/recipes",
    component: _8c607cfe,
    name: "recipes"
  }, {
    path: "/register",
    component: _3c87d31a,
    name: "register"
  }, {
    path: "/search",
    component: _26236942,
    name: "search"
  }, {
    path: "/ingredients/:ingredient",
    component: _5aacfd7c,
    name: "ingredients-ingredient"
  }, {
    path: "/recipes/:recipe",
    component: _c09dc7c8,
    name: "recipes-recipe"
  }, {
    path: "/",
    component: _4e60092a,
    name: "index"
  }, {
    path: "/:profile",
    component: _4c87d324,
    name: "profile"
  }, {
    path: "/:profile/edit",
    component: _089b5ba8,
    name: "profile-edit"
  }, {
    path: "/:profile/recipes",
    component: _2534d03a,
    name: "profile-recipes"
  }, {
    path: "/:profile/recipes/:recipe",
    component: _73e53ed6,
    name: "profile-recipes-recipe"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
