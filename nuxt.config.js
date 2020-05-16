export default {
    mode: "universal",
    /*
     ** Headers of the page
     */
    head: {
        title: process.env.npm_package_name || "",
        meta: [
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            {
                hid: "description",
                name: "description",
                content: process.env.npm_package_description || ""
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
            }
        ],
        script: [{
            src: "https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js"
        }]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: "#e67e22" },
    /*
     ** Global CSS
     */
    css: ["swiper/css/swiper.min.css", "~/assets/css/custom.scss"],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        { src: "~/plugins/vue-awesome-swiper", ssr: false },
        { src: "~/plugins/v-lazy-image", ssr: false }
    ],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: ["@nuxtjs/tailwindcss", "@nuxtjs/pwa"],
    /*
     ** Nuxt.js modules
     */
    modules: ["@nuxtjs/apollo"],

    router: {
        middleware: ["OnRouteChange"]
    },

    purgeCSS: {
        whitelist: ["v-lazy-image-loaded"]
    },

    apollo: {
        includeNodeModules: true,
        introspection: true,
        tokenName: 'apollo-token',
        errorHandler: '~/plugins/apollo-error-handler.js',
        clientConfigs: {
            default: {
                // httpEndpoint: "http://127.0.0.1:8000/graphql",
                httpEndpoint: "https://manage.chatfata.com/graphql",
                wsEndpoint: null,
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