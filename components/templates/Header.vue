<template>
  <div>
    <header class="px-5 main-header container mx-auto bg-gray-00 lg:px-0 p-5 py-6 relative">
      <div class="flex flex-wrap lg:flex-no-wrap items-center">
        <div class="w-64 lg:w-48 logo">
          <h1 class="text-xl uppercase font-semibold tracking-wider">
            <nuxt-link to="/">
              <img :src="`${storageUrl}custom/logo.png`" alt="Logo" class="w-full" />
            </nuxt-link>
          </h1>
        </div>
        <!-- logo end -->

        <div class="w-full top-search-wrapper mt-12 lg:mt-0">
          <SearchRecipes />
        </div>
        <!-- top search wrapper end -->

        <div class="w-full lg:w-auto absolute top-0 right-0 pr-5 pt-8 lg:static lg:p-0">
          <div class="inner">
            <div class="top-header-right-buttons">
              <ul class="flex justify-end">
                <li>
                  <span class="cursor-pointer" @click="openSideNav">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-8 h-8 fill-current dark:text-gray-400 text-gray-700"
                      viewBox="0 0 20 20"
                    >
                      <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- top search wrapper end -->
      </div>
      <!-- flex end -->
    </header>
    <!-- main header end -->
  </div>
</template>

<script>
import SearchRecipes from "./SearchRecipes.vue"
export default {
  components: {
    SearchRecipes
  },
  data() {
    return {};
  },
  computed: {
    storageUrl() {
      return this.$store.state.storageUrl;
    }
  },
  methods: {
    openSideNav() {
      this.$store.commit("mutateSideNavStatus", true);
    }
  }
};
</script>
