<template>
  <div>
    <section class="recipes-section lg:mt-5 px-5 lg:px-0">
      <ProfileHeader :user="user" />
      <div class="max-w-6xl xxl:max-w-screen-xl mx-auto">
        <div class="channel-recipies-wrapper mb-6 md:mb-12">
          <div
            class="grid grid-cols-1 border-b dark:border-gray-700"
          >
            <div v-if="user.allrecipes.length < 1">
              <h2 class="text-base tracking-widest text-gray-800">
                Nothing here yet, working on it.
              </h2>
            </div>
            <div
              v-else
              class="relative recipe-item border border-b-0 dark:border-gray-700 transition duration-300 ease-in-out"
              v-for="(recipe, i) in user.allrecipes"
              :key="i"
            >
              <SingleRecipe :recipe="recipe" :user="user" />
            </div>
            <!-- recipe item end -->
          </div>
          <!-- grid end -->
          <hr class="mt-6 dark:border-gray-700 md:mt-12" v-show="isValidUser" />
        </div>
        <!-- channels recipies wrappper end -->
      </div>
    </section>
  </div>
</template>


<script>
import gql from "graphql-tag";

import User from "~/gql/queries/user/UserWithAllRecipes";

import SingleRecipe from "~/components/profile/SingleRecipe";
import ProfileHeader from "~/components/profile/ProfileHeader";

export default {
  scrollToTop: true,
   middleware: ['isAuth'],
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
