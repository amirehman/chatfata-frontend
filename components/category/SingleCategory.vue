<template>
  <div>
    <div
      class="category-item swiper-slide bg-gray-100 overflow-hidden h-25rem rounded-lg cursor-pointer transition duration-500 ease-in-out transform sm:hover:scale-105 sf-z-12-hover hover:shadow-xl"
    >
      <div class="inner relative">
        <!-- <span class="text-white absolute w-full h-full left-0 top-0">
          <svg class="fill-current w-16 h-16 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 59 59"><path d="M54.221 44.616c.182 1.218.279 2.463.279 3.732a107.125 107.125 0 01-50 0c0-1.269.096-2.514.279-3.732C2.067 46.076.5 47.602.5 48.848c0 3.59 12.984 6.5 29 6.5s29-2.91 29-6.5c0-1.246-1.567-2.772-4.279-4.232z" fill="#d2d5d7"/><path d="M29.5 55.848c-14.301 0-29.5-2.453-29.5-7 0-1.84 2.47-3.557 4.541-4.673l.879-.474-.147.988a24.842 24.842 0 00-.27 3.264c16.034 3.783 32.959 3.783 48.993 0a24.842 24.842 0 00-.27-3.264l-.147-.988.879.474C56.53 45.291 59 47.008 59 48.848c0 4.547-15.199 7-29.5 7zM4.154 45.546C2.162 46.745 1 47.95 1 48.848c0 2.838 11.705 6 28.5 6s28.5-3.162 28.5-6c0-.897-1.162-2.103-3.154-3.302.102.933.154 1.871.154 2.802v.395l-.383.092c-16.432 3.943-33.802 3.943-50.233 0L4 48.742v-.395c0-.93.052-1.868.154-2.801z" fill="#e6e6e6"/><path d="M4.5 48.348c0-13.807 11.193-25 25-25s25 11.193 25 25a107.125 107.125 0 01-50 0z" fill="#e6e6e6"/><path d="M29.5 51.792c-8.451 0-16.901-.986-25.117-2.958L4 48.742v-.395c0-14.061 11.439-25.5 25.5-25.5S55 34.287 55 48.348v.395l-.383.092A107.781 107.781 0 0129.5 51.792zM5.003 47.953c16.035 3.785 32.959 3.785 48.994 0-.212-13.327-11.12-24.105-24.497-24.105S5.215 34.626 5.003 47.953z" fill="#d2d5d7"/><path d="M18.557 21.348a.997.997 0 01-.707-.293 4.61 4.61 0 010-6.512c.492-.492.764-1.146.764-1.842s-.271-1.35-.764-1.842a.999.999 0 111.414-1.414c.87.87 1.35 2.026 1.35 3.256s-.479 2.386-1.35 3.256a2.61 2.61 0 000 3.684.999.999 0 01-.707 1.707zM40.557 21.348a.997.997 0 01-.707-.293 4.61 4.61 0 010-6.512c.492-.492.764-1.146.764-1.842s-.271-1.35-.764-1.842a.999.999 0 111.414-1.414c.87.87 1.35 2.026 1.35 3.256s-.479 2.386-1.35 3.256a2.61 2.61 0 000 3.684.999.999 0 01-.707 1.707zM29.557 15.348a.997.997 0 01-.707-.293 4.61 4.61 0 010-6.512c.492-.492.764-1.146.764-1.842s-.271-1.35-.764-1.842a.999.999 0 111.414-1.414c.87.87 1.35 2.026 1.35 3.256s-.479 2.386-1.35 3.256a2.61 2.61 0 000 3.684.999.999 0 01-.707 1.707z" fill="#e6e6e6"/><path d="M33.947 24.744l-.825-.124a24.356 24.356 0 00-7.243 0l-.825.124-.27-.79a4.926 4.926 0 01-.283-1.606c0-2.757 2.243-5 5-5s5 2.243 5 5c0 .523-.093 1.049-.283 1.606l-.271.79zM29.5 22.348c.996 0 2 .058 2.994.172a3.004 3.004 0 00-2.994-3.172 3.004 3.004 0 00-2.994 3.172 26.107 26.107 0 012.994-.172z" fill="#d2d5d7"/><path d="M24.845 28.86a1 1 0 01-.219-1.975 22.17 22.17 0 014.86-.537c.557.043 1.014.443 1.013 1.001a1 1 0 01-1 .999h-.013c-1.496 0-2.982.164-4.421.488a.97.97 0 01-.22.024zM9.501 45.348a1 1 0 01-.985-1.18c1.142-6.26 4.931-11.838 10.134-14.921a1 1 0 111.019 1.721c-4.713 2.792-8.147 7.861-9.186 13.56a.999.999 0 01-.982.82z" /></svg>
        </span> -->
        <nuxt-link :to="`ingredients/${category.slug}`">
          <client-only>
            <v-lazy-image
              :alt="category.title"
              class="object-cover h-25rem w-full"
              :src="`${storageUrl}${mediumImage}`"
              :src-placeholder="`${storageUrl}${smallImage}`"
            />
          </client-only>

          <div
            class="category-item-info absolute bottom-0 left-0 w-full h-full text-white transition duration-500"
          >
            <div class="inner absolute bottom-0 left w-full p-3">
              <h2 class="cii-title opacity-100 text-xl dark:text-gray-300 leading-tight mb-2">{{category.title}}</h2>

              <div class="flex items-center">
                <div class="w-full">
                  <p
                    class="cii-title tracking-widest opacity-100 dark:text-gray-300 text-sm tracking-wide"
                  >{{category.recipes.length}} Recipes</p>
                </div>
                <div class="w-auto">
                  <span class="cii-icon my-2">
                    <i data-vi="arrow-right" data-vi-primary="#ffffff" data-vi-size="32"></i>
                  </span>
                </div>
              </div>
            </div>
            <!-- inner -->
          </div>
          <!-- category item info end -->
        </nuxt-link>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: ["category"],
  computed: {
    mediumImage() {
      return this.category.image.replace(/(\.[\w\d_-]+)$/i, "-medium$1");
    },
    smallImage() {
      return this.category.image.replace(/(\.[\w\d_-]+)$/i, "-small$1");
    },
    storageUrl() {
      return this.$store.state.storageUrl;
    }
  }
};
</script>
