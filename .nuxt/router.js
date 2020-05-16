import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _8dcfbeb4 = () => interopDefault(import('../pages/about.vue' /* webpackChunkName: "pages/about" */))
const _6e5d2571 = () => interopDefault(import('../pages/add-recipe.vue' /* webpackChunkName: "pages/add-recipe" */))
const _53e1390e = () => interopDefault(import('../pages/contact.vue' /* webpackChunkName: "pages/contact" */))
const _07baf644 = () => interopDefault(import('../pages/ingredients/index.vue' /* webpackChunkName: "pages/ingredients/index" */))
const _bb10c2fc = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _09a36a4e = () => interopDefault(import('../pages/privacy-policy.vue' /* webpackChunkName: "pages/privacy-policy" */))
const _8c607cfe = () => interopDefault(import('../pages/recipes/index.vue' /* webpackChunkName: "pages/recipes/index" */))
const _5aacfd7c = () => interopDefault(import('../pages/ingredients/_ingredient.vue' /* webpackChunkName: "pages/ingredients/_ingredient" */))
const _c09dc7c8 = () => interopDefault(import('../pages/recipes/_recipe.vue' /* webpackChunkName: "pages/recipes/_recipe" */))
const _4e60092a = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _4c87d324 = () => interopDefault(import('../pages/_profile/index.vue' /* webpackChunkName: "pages/_profile/index" */))
const _089b5ba8 = () => interopDefault(import('../pages/_profile/edit.vue' /* webpackChunkName: "pages/_profile/edit" */))

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
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
