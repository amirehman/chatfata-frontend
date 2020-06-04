import Vue from 'vue';
import wysiwyg from "vue-wysiwyg";
Vue.use(wysiwyg, {
    hideModules: {
        image: true,
        code: true,
        orderedList: true,
        unorderedList: true,
        table: true,
        headings: true
    }
}); // config is optional. more below