import Vue from "vue";
import wysiwyg from "vue-wysiwyg";
Vue.use(wysiwyg, {
    hideModules: {
        image: false,
        code: true,
        orderedList: true,
        unorderedList: true,
        table: true,
        headings: true,
        justifyLeft: true,
        justifyCenter: true,
        justifyRight: true
    }
}); // config is optional. more below