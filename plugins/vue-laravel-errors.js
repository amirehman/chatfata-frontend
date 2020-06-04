import Vue from "vue";
import vueLaravelErrors from "vue-laravel-errors";
Vue.use(vueLaravelErrors, { type: "object" || "array" }) //if options are omitted returns default laravel error object