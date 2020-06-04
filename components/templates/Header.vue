<template>
  <div>
    <header
      class="main-header max-w-6xl xxl:max-w-screen-xl mx-auto px-5 py-3 md:p-5 md:py-6 relative pb-0 mb-8"
    >
      <div class="flex justify-between lg:flex-no-wrap items-center">
        <div class="w-16 md:w-24 logo">
          <Logo />
        </div>
        <!-- logo end -->

        <div class="w-full lg:w-1/2 top-search-wrapper hidden lg:block">
          <SearchRecipes mobile="false" />
        </div>
        <!-- top search wrapper end -->
        <div class="flex items-center">
          <div>
            <nuxt-link v-show="isChannel" class="hidden sm:inline text-sm border dark:border-gray-500 p-1 px-5 rounded-full dark:hover:bg-dark-mode-light" to="/add-recipe">Add Recipe</nuxt-link>
            <!-- add recipe button -->
            <div class="relative inline-block text-left">
              <Dropdown :user="currentUser" />
            </div>
          </div>

          <div class="w-10">
            <div class="inner">
              <div class="top-header-right-buttons">
                <ul class="flex justify-end">
                  <li>
                    <span class="cursor-pointer" @click="openSideNav">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-6 xxl:w-8 h-6 xxl:h-8 fill-current dark:text-gray-400 text-gray-700"
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
        </div>
        <!-- top search wrapper end -->
      </div>
      <!-- flex end -->
    </header>
    <!-- main header end -->
  </div>
</template>

<script>
import SearchRecipes from "../search/SearchRecipes.vue";
import Dropdown from "./header/Dropdown.vue";
import Logo from "./Logo.vue";
export default {
  components: {
    SearchRecipes,
    Dropdown,
    Logo
  },
  data() {
    return {};
  },
  computed: {
    isChannel() {
      return this.$store.getters["user/isChannel"];
    },
    currentUser() {
      return this.$store.state.user.loggedInUser;
    }
  },
  methods: {
    openSideNav() {
      this.$store.commit("mutateSideNavStatus", true);
    }
  }
};
</script>
