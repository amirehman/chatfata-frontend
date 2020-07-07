import Vue from "vue";

import infoIcon from "~/components/icons/Info.vue";
import DragIcon from "~/components/icons/Drag.vue";
import YoutubeIcon from "~/components/icons/Youtube.vue";
import FacebookIcon from "~/components/icons/Facebook.vue";
import InstagramIcon from "~/components/icons/Instagram.vue";
import TiktokIcon from "~/components/icons/Instagram.vue";
import ChiefIcon from "~/components/icons/Chief.vue";
import ClockIcon from "~/components/icons/Clock.vue";
import GlassIcon from "~/components/icons/Glass.vue";
import CloseIcon from "~/components/icons/Close.vue";
import Loader from "~/components/templates/Loader";


const components = {
    infoIcon,
    DragIcon,
    YoutubeIcon,
    FacebookIcon,
    InstagramIcon,
    TiktokIcon,
    ChiefIcon,
    GlassIcon,
    ClockIcon,
    CloseIcon,
    Loader
};

Object.entries(components).forEach(([name, component]) => {
    Vue.component(name, component);
});
