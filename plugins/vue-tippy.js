import Vue from "vue";
import VueTippy, { TippyComponent } from "vue-tippy";

Vue.use(VueTippy, {
    touch: true,
    maxWidth: 400
});

Vue.component("tippy", TippyComponent);