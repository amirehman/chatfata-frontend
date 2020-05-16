<template>
  <section class="recipes-section lg:mt-5 px-5 lg:px-0">
    <div class="max-w-6xl xxl:max-w-screen-xl mx-auto">
      <div class="section-header mb-6 md:mb-12 text-center md:text-left">
        <div class="flex flex-wrap md:flex-no-wrap">
          <div
            class="border w-48 md:w-64 h-48 mx-auto md:mr-auto bg-gray-200 dark:bg-dark-mode-light-1 overflow-hidden rounded-lg flex items-end justify-center"
            :class="user.avatar ? 'pb-0' : 'pb-3'"
          >
            <div class="inner relative">
              <span class="text-gray-500" v-if="!user.avatar">
                <svg
                  class="fill-current w-32 h-32"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M5 5a5 5 0 0110 0v2A5 5 0 015 7V5zM0 16.68A19.9 19.9 0 0110 14c3.64 0 7.06.97 10 2.68V20H0v-3.32z"
                  />
                </svg>
              </span>
              <client-only v-else>
                <v-lazy-image
                  :alt="user.name"
                  class="object-cover w-48 md:w-64 h-48"
                  :src="`${storageUrl}${user.avatar}`"
                  :src-placeholder="`${storageUrl}${smallAvatar}`"
                />
              </client-only>
            </div>
          </div>

          <!-- w-auto end -->
          <div class="hidden md:block w-16"></div>
          <div class="w-full flex flex-col md:justify-between">
            <div class="category-header-info pr-0 lg:pr-16 mt-6 md:mt-0">
              <div class="category-title flex items-center justify-center md:justify-start">
                <h1
                  class="text-2xl tracking-wide leading-snug capitalize text-gray-900 dark:text-gray-200"
                >{{user.name}}</h1>
                <span
                  class="block ml-2 text-gray-700 dark:text-gray-400"
                  v-if="isAuthenticated && isValidUser"
                >
                  <nuxt-link
                    v-if="currentUser"
                    class="text-sm lowercase"
                    :to="`/${currentUser.username}/edit`"
                  >
                    <svg
                      class="fill-current w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M12.3 3.7l4 4L4 20H0v-4L12.3 3.7zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z" />
                    </svg>
                  </nuxt-link>
                </span>
              </div>
              <!-- category title end -->
              <div
                v-if="user.info"
                class="recipe-short-description text-gray-700 dark:text-gray-400 mt-3 text-base xxl:text-lg content"
              >
                <p>{{user.info.about}}</p>
              </div>
              <!-- recipe short description -->

              <div class="profile-social" v-show="isChannel && isValidUser">
                <p class="text-base mb-2">Watch my recipes on</p>
                <ul class="flex items-center justify-center md:justify-start text-gray-800 dark:text-gray-400">
                  <li
                    class="hover:text-orange-500 mr-3"
                    v-for="(social, i) in user.social"
                    :key="i"
                    :title="social.media.name"
                  >
                    <a :href="social.link" target="_blank">
                      <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        class="fill-current"
                        :class="social.media.name === 'Facebook' ? ' w-6 h-6' : ' w-1.7rem h-1.7rem' "
                        v-html="social.media.icon"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <!-- recipe header info end -->
            <div
                v-show="isValidUser && !isChannel"
            >
              <button
                title="Apply for a channel if you want to upload your own recipes"
                class="mt-5 md:mt-0 border-2 border-theme-yellow py-2 px-3 rounded bg-transparent cursor-pointer hover:bg-theme-yellow text-theme-yellow-dark dark:text-theme-yellow hover:text-gray-800 transition ease-in-out duration-300"
              >Apply for Channel</button>
            </div>
          </div>
        </div>
      </div>
      <!-- section header end  -->

        <hr class="mb-6 md:mb-12 dark:border-gray-700" />

      <div class="channel-recipies-wrapper mb-6 md:mb-12" v-show="isChannel">
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xxl:grid-cols-5 gap-6 flex-wrapper"
        >
          <div v-if="user.recipes.length < 1">
            <h2 class="text-base tracking-widest text-gray-800">Nothing here yet, working on it.</h2>
          </div>
          <div
            v-else
            class="pb-10 relative recipe-item border dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-xl transition duration-300 ease-in-out"
            v-for="(recipe, i) in user.recipes"
            :key="i"
          >
            <SingleRecipe :recipe="recipe" />
          </div>
          <!-- recipe item end -->
        </div>
        <!-- grid end -->
        <hr class="mt-6 md:mt-12" v-show="isValidUser" />
      </div>
      <!-- channels recipies wrappper end -->

      <div class="saved-recipies-wrapper" v-show="isValidUser">
        <div class="section-header mb-5">
          <h2
            class="capitalize text-2xl text-gray-900 dark:text-gray-300 leading-none"
          >Saved recipes</h2>
        </div>
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xxl:grid-cols-5 gap-6 flex-wrapper"
        >
          <div v-if="user.recipes.length < 1">
            <h2 class="text-base tracking-widest text-gray-800">No saved recipes.</h2>
          </div>
          <div
            v-else
            class="pb-10 relative recipe-item border dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-xl transition duration-300 ease-in-out"
            v-for="(recipe, i) in user.recipes"
            :key="i"
          >
            <SingleRecipe :recipe="recipe" />
          </div>
          <!-- recipe item end -->
        </div>
        <!-- grid end -->
      </div>
      <!-- channels recipies wrappper end -->
    </div>

    <!-- container end -->
  </section>
</template>




<script>
import gql from "graphql-tag";

import User from "~/gql/queries/Userbyname";

import SingleRecipe from "~/components/recipes/SingleRecipe.vue";

export default {
  scrollToTop: true,
  components: {
    SingleRecipe
  },
  data() {
    return {};
  },
  computed: {
    smallAvatar() {
      if (this.currentUser) {
        return this.user.avatar.replace(/(\.[\w\d_-]+)$/i, "-small$1");
      }
    },
    storageUrl() {
      return this.$store.state.storageUrl;
    },
    isAuthenticated() {
      return this.$store.getters["user/isAuthenticated"];
    },
    isChannel() {
      return this.$store.getters["user/isChannel"];
    },
    currentUser() {
      return this.$store.state.user.loggedInUser;
    },
    isValidUser() {
      if (this.currentUser) {
        return this.user.id == this.currentUser.id ? true : false;
      }
    }
    // userRoles () {
    //   if (this.currentUser) {
    //     return this.currentUser.roles.map(e => {
    //       return e.name
    //     })
    //   }
    // }
  },
  methods: {
    onLogout() {
      this.$store.dispatch("user/removeToken");
    }
  },
  async asyncData({ app, params }) {
    const client = app.apolloProvider.defaultClient;

    const user = await client
      .query({
        query: User,
        variables: {
          username: params.profile
        }
      })
      .then(({ data }) => data && data.userbyname);

    return {
      user
    };
  }
};
</script>
