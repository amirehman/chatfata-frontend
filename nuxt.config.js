require('dotenv').config();
export default {
    mode: "universal",
    debug: true,
    env: {
        baseUrl: process.env.BASE_URL || "http://localhost:3000"
    },
    /*
     ** Headers of the page
     */
    head: {
        title: "Pick Your Recipe | Chatfata.com",
        meta: [
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            {
                hid: "title",
                name: "title",
                content: "Pick Your Recipe | Chatfata.com"
            },
            {
                hid: "description",
                name: "description",
                content: "Inspire your love one with our daily recipes, tips."
            },
            {
                hid: "keywords",
                name: "keywords",
                content: "free recipes, easy recipes, indian recipes, pakistani recipes, step by step recipes, lunch recipes, dinner recies, breakfast recipes"
            }
        ],
        link: [
            { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css2?family=Comic+Neue:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap"
            },
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            },
            {
                rel: "stylesheet",
                href: "https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.css"
            },
            {
                rel: "stylesheet",
                type: "text/css",
                href: "https://cdnjs.cloudflare.com/ajax/libs/vue-select/3.4.0/vue-select.css"
            }
        ]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: "#e67e22" },
    /*
     ** Global CSS
     */
    css: [
        "vue-wysiwyg/dist/vueWysiwyg.css",
        "vue-croppa/dist/vue-croppa.css",
        "filepond/dist/filepond.min.css",
        "swiper/css/swiper.min.css",
        "~/assets/css/loader.scss",
        "~/assets/css/custom.scss"
    ],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        { src: "~/plugins/vue-awesome-swiper", ssr: false },
        { src: "~/plugins/v-lazy-image", ssr: false },
        { src: "~/plugins/vue-clickaway", ssr: false },
        { src: "~/plugins/vue-wysiwyg", ssr: false },
        { src: "~/plugins/vue-editor", ssr: false },
        { src: "~/plugins/vue-croppa", ssr: false },
        { src: "~/plugins/vue-laravel-errors", ssr: false },
        { src: "~/plugins/vue-filepond", mode: "client" },
        { src: "~/plugins/vue-toastify", mode: "client" }
    ],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: ["@nuxtjs/tailwindcss", "@nuxtjs/pwa", "@nuxtjs/dotenv"],
    /*
     ** Nuxt.js modules
     */
    modules: [
        "@nuxtjs/axios",
        "@nuxtjs/apollo",
        "nuxt-vue-select", [
            "nuxt-sweetalert2",
            {
                confirmButtonColor: "#fca311"
            }
        ]
    ],

    axios: {
        baseURL: process.env.SERVER_URL
    },

    router: {
        middleware: ["OnRouteChange"]
    },

    purgeCSS: {
        whitelistPatterns: [/^croppa/],
        whitelistPatterns: [/^filepond/],
        whitelist: [
            "v-lazy-image-loaded",
            "croppa-container",
            "croppa--has-target",
            "icon",
            "editr--toolbar",
            "editr",
            "editr--content",
            "icon-remove"
        ]
    },

    apollo: {
        includeNodeModules: true,
        introspection: true,
        tokenName: "apollo-token",
        errorHandler: "~/plugins/apollo-error-handler.js",
        clientConfigs: {
            default: {
                httpEndpoint: process.env.GRAPHQL_URL,
                wsEndpoint: null
            }
        }
    },
    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {}
    }
};