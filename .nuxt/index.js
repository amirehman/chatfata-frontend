import Vue from 'vue'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from './components/nuxt-error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_workbox_794c7b2f from 'nuxt_plugin_workbox_794c7b2f' // Source: ./workbox.js (mode: 'client')
import nuxt_plugin_nuxticons_fcfbf356 from 'nuxt_plugin_nuxticons_fcfbf356' // Source: ./nuxt-icons.js (mode: 'all')
import nuxt_plugin_srcplugin2a16b417_ab0764e8 from 'nuxt_plugin_srcplugin2a16b417_ab0764e8' // Source: ./src.plugin.2a16b417.js (mode: 'client')
import nuxt_plugin_nuxtvueselect_665fb53c from 'nuxt_plugin_nuxtvueselect_665fb53c' // Source: ./nuxt-vue-select.js (mode: 'client')
import nuxt_plugin_apollomodule_4d8e90c2 from 'nuxt_plugin_apollomodule_4d8e90c2' // Source: ./apollo-module.js (mode: 'all')
import nuxt_plugin_axios_8647225a from 'nuxt_plugin_axios_8647225a' // Source: ./axios.js (mode: 'all')
import nuxt_plugin_vueawesomeswiper_4af85e3f from 'nuxt_plugin_vueawesomeswiper_4af85e3f' // Source: ../plugins/vue-awesome-swiper (mode: 'client')
import nuxt_plugin_vlazyimage_2c5129ef from 'nuxt_plugin_vlazyimage_2c5129ef' // Source: ../plugins/v-lazy-image (mode: 'client')
import nuxt_plugin_vueclickaway_ccb3558e from 'nuxt_plugin_vueclickaway_ccb3558e' // Source: ../plugins/vue-clickaway (mode: 'client')
import nuxt_plugin_vuewysiwyg_35b20b90 from 'nuxt_plugin_vuewysiwyg_35b20b90' // Source: ../plugins/vue-wysiwyg (mode: 'client')
import nuxt_plugin_vueeditor_3c5040ec from 'nuxt_plugin_vueeditor_3c5040ec' // Source: ../plugins/vue-editor (mode: 'client')
import nuxt_plugin_vuecroppa_4193bac4 from 'nuxt_plugin_vuecroppa_4193bac4' // Source: ../plugins/vue-croppa (mode: 'client')
import nuxt_plugin_vuelaravelerrors_370eee1c from 'nuxt_plugin_vuelaravelerrors_370eee1c' // Source: ../plugins/vue-laravel-errors (mode: 'client')
import nuxt_plugin_vuefilepond_400a1a4e from 'nuxt_plugin_vuefilepond_400a1a4e' // Source: ../plugins/vue-filepond (mode: 'client')
import nuxt_plugin_vuetoastify_19c1a652 from 'nuxt_plugin_vuetoastify_19c1a652' // Source: ../plugins/vue-toastify (mode: 'client')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

async function createApp (ssrContext) {
  const router = await createRouter(ssrContext)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Fix SSR caveat https://github.com/nuxt/nuxt.js/issues/3757#issuecomment-414689141
  const registerModule = store.registerModule
  store.registerModule = (path, rawModule, options) => registerModule.call(store, path, rawModule, Object.assign({ preserveState: process.client }, options))

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"title":"Pick Your Recipe | Chatfata.com","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"title","name":"title","content":"Pick Your Recipe | Chatfata.com"},{"hid":"description","name":"description","content":"Inspire your love one with our daily recipes, tips."},{"hid":"keywords","name":"keywords","content":"free recipes, easy recipes, indian recipes, pakistani recipes, step by step recipes, lunch recipes, dinner recies, breakfast recipes"},{"hid":"mobile-web-app-capable","name":"mobile-web-app-capable","content":"yes"},{"hid":"apple-mobile-web-app-title","name":"apple-mobile-web-app-title","content":"chatfata"},{"hid":"author","name":"author","content":"chatfata.com"},{"hid":"theme-color","name":"theme-color","content":"#e67e22"},{"hid":"og:type","name":"og:type","property":"og:type","content":"website"},{"hid":"og:title","name":"og:title","property":"og:title","content":"chatfata"},{"hid":"og:site_name","name":"og:site_name","property":"og:site_name","content":"chatfata"},{"hid":"og:description","name":"og:description","property":"og:description","content":"Inspire your love one with our daily recipes, tips."}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.ico"},{"rel":"stylesheet","href":"https:\u002F\u002Ffonts.googleapis.com\u002Fcss2?family=Comic+Neue:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap"},{"rel":"stylesheet","href":"https:\u002F\u002Ffonts.googleapis.com\u002Fcss2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"},{"rel":"stylesheet","href":"https:\u002F\u002Fcdn.bootcss.com\u002Ffont-awesome\u002F4.7.0\u002Fcss\u002Ffont-awesome.css"},{"rel":"stylesheet","type":"text\u002Fcss","href":"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fvue-select\u002F3.4.0\u002Fvue-select.css"},{"rel":"manifest","href":"\u002F_nuxt\u002Fmanifest.eddb2a8a.json"},{"rel":"shortcut icon","href":"\u002F_nuxt\u002Ficons\u002Ficon_64.99190b.png"},{"rel":"apple-touch-icon","href":"\u002F_nuxt\u002Ficons\u002Ficon_512.99190b.png","sizes":"512x512"}],"style":[],"script":[],"htmlAttrs":{"lang":"en"}},

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  const inject = function (key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Plugin execution

  if (process.client && typeof nuxt_plugin_workbox_794c7b2f === 'function') {
    await nuxt_plugin_workbox_794c7b2f(app.context, inject)
  }

  if (typeof nuxt_plugin_nuxticons_fcfbf356 === 'function') {
    await nuxt_plugin_nuxticons_fcfbf356(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_srcplugin2a16b417_ab0764e8 === 'function') {
    await nuxt_plugin_srcplugin2a16b417_ab0764e8(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_nuxtvueselect_665fb53c === 'function') {
    await nuxt_plugin_nuxtvueselect_665fb53c(app.context, inject)
  }

  if (typeof nuxt_plugin_apollomodule_4d8e90c2 === 'function') {
    await nuxt_plugin_apollomodule_4d8e90c2(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_8647225a === 'function') {
    await nuxt_plugin_axios_8647225a(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vueawesomeswiper_4af85e3f === 'function') {
    await nuxt_plugin_vueawesomeswiper_4af85e3f(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vlazyimage_2c5129ef === 'function') {
    await nuxt_plugin_vlazyimage_2c5129ef(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vueclickaway_ccb3558e === 'function') {
    await nuxt_plugin_vueclickaway_ccb3558e(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vuewysiwyg_35b20b90 === 'function') {
    await nuxt_plugin_vuewysiwyg_35b20b90(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vueeditor_3c5040ec === 'function') {
    await nuxt_plugin_vueeditor_3c5040ec(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vuecroppa_4193bac4 === 'function') {
    await nuxt_plugin_vuecroppa_4193bac4(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vuelaravelerrors_370eee1c === 'function') {
    await nuxt_plugin_vuelaravelerrors_370eee1c(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vuefilepond_400a1a4e === 'function') {
    await nuxt_plugin_vuefilepond_400a1a4e(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vuetoastify_19c1a652 === 'function') {
    await nuxt_plugin_vuetoastify_19c1a652(app.context, inject)
  }

  // If server-side, wait for async component to be resolved first
  if (process.server && ssrContext && ssrContext.url) {
    await new Promise((resolve, reject) => {
      router.push(ssrContext.url, resolve, () => {
        // navigated to a different route in router guard
        const unregister = router.afterEach(async (to, from, next) => {
          ssrContext.url = to.fullPath
          app.context.route = await getRouteData(to)
          app.context.params = to.params || {}
          app.context.query = to.query || {}
          unregister()
          resolve()
        })
      })
    })
  }

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
