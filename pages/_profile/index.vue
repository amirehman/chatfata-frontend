<template>
  <div>
    <div v-if="user">
      <section class="recipes-section lg:mt-5 px-5 lg:px-0">
        <ProfileHeader :user="user" />
        <div class="max-w-6xl xxl:max-w-screen-xl mx-auto">
          <div class="channel-recipies-wrapper mb-6 md:mb-12">
            <div
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xxl:grid-cols-5 gap-6 flex-wrapper"
            >
              <div v-if="user.recipes.length < 1">
                <h2 class="text-base tracking-widest text-gray-800">
                  Nothing here yet, working on it.
                </h2>
              </div>
              <div
                v-else
                class="relative recipe-item border dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-xl transition duration-300 ease-in-out"
                v-for="(recipe, i) in user.recipes"
                :key="i"
              >
                <SingleRecipe :recipe="recipe" />
              </div>
              <!-- recipe item end -->
            </div>
            <!-- grid end -->
            <hr
              class="mt-6 dark:border-gray-700 md:mt-12"
              v-show="isValidUser"
            />
          </div>
          <!-- channels recipies wrappper end -->

          <div class="saved-recipies-wrapper" v-show="isValidUser">
            <div class="section-header mb-5">
              <h2
                class="capitalize text-2xl text-gray-900 dark:text-gray-300 leading-none"
              >
                Saved recipes
              </h2>
            </div>
            <div
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xxl:grid-cols-5 gap-6 flex-wrapper"
            >
              <div v-if="user.recipes.length < 1">
                <h2 class="text-base tracking-widest text-gray-800">
                  No saved recipes.
                </h2>
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
    </div>
    <div v-else>
      <div
        class="h-screen px-10 md:h-25rem w-full flex items-center justify-center"
      >
        <div class="text-center">
          <span
            class="text-xl leading-none md:text-6xl font-light md:font-hairline text-gray-800 uppercase tracking-widest block"
            >page Not Found!</span
          >
          <span
            class="text-xs md:mt-0 mt-1 md:text-xl font-light block text-gray-700"
            >The page may deleted or private</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

import User from "~/gql/queries/Userbyname";

import SingleRecipe from "~/components/profile/SingleRecipe";
import ProfileHeader from "~/components/profile/ProfileHeader";

export default {
  head() {
    return {
      title: this.user.name + " | Chatfata.com"
    };
  },
  scrollToTop: true,
  components: {
    SingleRecipe,
    ProfileHeader
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
    isVerified() {
      return this.$store.getters["user/isVerified"];
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
    },
    isThisProfileChannel() {
      if (this.user.roles) {
        let roles = this.user.roles.map(e => {
          return e.name;
        });
        return roles.includes("channel");
      }
    }
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
