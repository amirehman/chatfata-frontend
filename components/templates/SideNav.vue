<template>
  <div>
    <client-only>
      <Keypress key-event="keydown" :key-code="27" @success="closeSideNav" />
    </client-only>
    <div
      class="full-screen-menu-wrapper fixed w-full h-screen transition duration-500 ease-out overflow-scroll bg-gray-100 dark:bg-dark-mode-light"
      :class="isMenuOpen ? 'z-50 block' : 'hidden z--50'"
    >
      <div class="hidden sm:flex w-1/2 lg:w-2/3  xl:w-3/4 ml-auto ">
        <Categories />
      </div>
      <div
        class="fixed top-0 -left-32 opacity-0 w-5/6 sm:w-1/2 lg:w-1/3 xl:w-1/4 dark:bg-dark-mode bg-white h-screen shadow-xl dark:border-gray-700 border-l transition duration-300 ease-out transform "
        :class="
          isMenuOpen ? 'z-50 translate-x-32rem opacity-100' : 'translate-x-0'
        "
      >
        <div class="z-50 absolute top-0 right-0 pr-5 pt-5 smw-close-button">
          <div class="inner">
            <ul class>
              <li>
                <span
                  class="cursor-pointer text-gray-700 dark:text-gray-400"
                  @click="closeSideNav"
                >
                  <CloseIcon width="w-6 xxl:w-8" height="h-6 xxl:h-8" />
                </span>
              </li>
            </ul>
          </div>
        </div>
        <!-- smw close button end -->

        <div class="here p-5 absolute w-full  mt-12">
          <SearchRecipes mobile="true" />
        </div>

        <div class="navbar-wrapper h-screen flex items-center w-full">
          <ul
            class="text-lg xxl:text-xl capitalize text-gray-800 dark:text-gray-400 w-full"
          >
            <li class="">
              <nuxt-link
                to="/recipes"
                class="transition duration-300 pl-12 p-3 xxl:p-5 block border-b hover:bg-gray-100 dark:hover:dark-mode-light dark:border-gray-700"
                >All Recipes.</nuxt-link
              >
            </li>
            <li class="">
              <nuxt-link
                to="/ingredients"
                class="transition duration-300 pl-12 p-3 xxl:p-5 block border-b hover:bg-gray-100 dark:hover:dark-mode-light dark:border-gray-700"
              >
                Browse By ingredients.
              </nuxt-link>
            </li>
            <li class="">
              <nuxt-link
                to="/about"
                class="transition duration-300 pl-12 p-3 xxl:p-5 block border-b hover:bg-gray-100 dark:hover:dark-mode-light dark:border-gray-700"
                >About.</nuxt-link
              >
            </li>
            <li class="">
              <nuxt-link
                to="/contact"
                class="transition duration-300 pl-12 p-3 xxl:p-5 block border-b hover:bg-gray-100 dark:hover:dark-mode-light dark:border-gray-700"
                >Contact</nuxt-link
              >
            </li>

            <li class="">
              <span
                v-if="isAuthenticated"
                @click="logout"
                class="cursor-pointer transition duration-300 pl-12 p-3 xxl:p-5 block border-b hover:bg-gray-100 dark:hover:dark-mode-light dark:border-gray-700"
                >Signout</span
              >
              <nuxt-link
                v-else
                to="/login"
                class="transition duration-300 pl-12 p-3 xxl:p-5 block border-b hover:bg-gray-100 dark:hover:dark-mode-light dark:border-gray-700"
                >login</nuxt-link
              >
            </li>
            <li
              class="socia-links pl-12 p-3 xxl:p-5 transition duration-300 border-b hover:bg-gray-100 dark:hover:dark-mode-light dark:border-gray-700"
            >
              <ul class="flex items-center justify-start">
                <li class="mr-3">
                  <a href>
                    <FacebookIcon width="w-5 xxl:w-6" height="w-5 xxl:h-6" />
                  </a>
                </li>
                <li class="mx-3">
                  <a href>
                    <InstagramIcon width="w-5 xxl:w-6" height="w-5 xxl:h-6" />
                  </a>
                </li>
                <li class="mx-3">
                  <a href>
                    <YoutubeIcon width="w-6 xxl:w-8" height="w-6 xxl:h-8" />
                  </a>
                </li>
              </ul>
            </li>
            <!-- social link end -->
            <li>
              <a
                class="text-base tracking-widest transition duration-300 pl-12 p-3 xxl:p-5 block hover:bg-gray-100 dark:hover:dark-mode-light dark:border-gray-700 lowercase"
                href="mailto:hi@amirr.net"
                >info@shallos-fry.com</a
              >
            </li>
          </ul>
        </div>
        <!-- navbar-wrapper end -->
      </div>
    </div>
    <!-- full screen menu wrapper end -->
  </div>
</template>

<script>
import SearchRecipes from "../search/SearchRecipes.vue";
import Categories from "../category/MegaMenuCategories.vue";

export default {
  components: {
    Keypress: () => import("vue-keypress"),
    SearchRecipes,
    Categories
  },
  data() {
    return {};
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters["user/isAuthenticated"];
    },
    storageUrl() {
      return this.$store.state.storageUrl;
    },
    isMenuOpen() {
      return this.$store.state.sideNav;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("user/removeToken");
    },
    closeSideNav() {
      this.$store.commit("mutateSideNavStatus", false);
    }
  }
};
</script>
