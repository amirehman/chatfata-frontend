<template>
  <div>
    <div v-if="(recipe && recipe.status === 'PUBLISHED') || isValidUser">
      <div v-if="!recipe">loading...</div>
      <section v-else class="single-recipe-section px-5 lg:px-0">
        <div class="max-w-6xl xxl:max-w-screen-xl mx-auto">
          <div class="recipe-wrapper">
            <div class="recipe-hero-header">
              <div class="flex flex-wrap">
                <div
                  class="md:flex md:items-center mb-6 md:mb-0"
                  :class="
                    images.length != 0 ? 'w-full md:w-1/2' : 'w-full md:w-2/3'
                  "
                >
                  <div class="recipe-header-info pr-0 lg:pr-16">
                    <div
                      class="recipe-type font-medium tracking-widest text-sm text-gray-800 tracking-wide dark:text-gray-400"
                    >
                      by
                      <nuxt-link
                        :to="`/${recipe.author.username}`"
                        href="#"
                        class="inline-block hover:text-orange-600"
                      >
                        {{ recipe.author.name }}
                      </nuxt-link>
                    </div>
                    <!-- recipe type end -->

                    <div class="recipe-title mt-2 mb-0">
                      <h1
                        class="text-3xl font-semibold capitalize text-gray-800 dark:text-gray-200 leading-tight"
                      >
                        {{ recipe.title }}
                        <div v-if="isValidUser && recipe.status === 'DRAFT'">
                          <span
                            class="normal-case rounded-full bg-red-600 text-white text-sm py-1 px-3"
                            >Recipe is not published, only you can see this
                            recipe</span
                          >
                        </div>
                      </h1>
                    </div>
                    <!-- recipe title end -->

                    <div class="lg:flex lg:items-center lg:justify-between">
                      <div class="flex-1 min-w-0">
                        <div
                          class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap"
                        >
                          <div
                            v-if="recipe.country.length > 0"
                            class="mt-2 flex items-center text-sm leading-5 text-gray-600 sm:mr-6"
                          >
                            {{ recipe.country[0].emoji }} &nbsp; {{ recipe.country[0].name }}
                          </div>
                          <div
                            class="mt-2 flex items-center text-sm leading-5 text-gray-600 sm:mr-6"
                          >
                            <ChiefIcon width="w-4" height="h-4" />
                            &nbsp;
                            {{ recipe.difficulty }}
                          </div>
                          <div
                            class="mt-2 flex items-center text-sm leading-5 text-gray-600 sm:mr-6"
                          >
                              <ClockIcon width="w-4" height="h-4" />
                            &nbsp;
                            {{ recipe.prep_time }} min
                          </div>
                          <div
                            class="mt-2 flex items-center text-sm leading-5 text-gray-600"
                          >
                            <GlassIcon width="w-3" height="h-3" />
                            &nbsp;
                            <span
                              v-for="(meal, i) in recipe.meals"
                              :key="i"
                            >
                              <span v-if="i != 0">, </span>
                              {{ meal.title }}
                            </span>
                          </div>
                          <div
                          class="ml-5 cursor-pointer text-theme-yellow capitalize font-medium tracking-widest mt-2 flex items-center text-sm leading-5 text-gray-600"
                          v-if="!editingMode && isValidUser"
                          @click="editingModeOn(true)"
                          >
                          Edit recipe
                          </div>
                        </div>
                      </div>
                    </div>


                    <div
                      class="recipe-short-description text-gray-700 dark:text-gray-400 text-base xxl:text-lg font-normal tracking-wide mt-6"
                      v-html="recipe.body"
                    ></div>
                    <a
                      target="_blank"
                      :href="recipe.video"
                      class="flex items-center border border-gray-400 text-gray-800 rounded py-2 font-medium text-lg block mt-4 w-48 justify-center hover:bg-theme-yellow hover:border-theme-yellow transition ease-in-out duration-300 dark:border-gray-700 dark:text-gray-400"
                      v-if="images.length === 0 && recipe.video"
                    >
                      <svg
                        class="fill-current w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M4 4l12 6-12 6z" />
                      </svg>
                      <span class="inline-block ml-2">Watch video</span>
                    </a>
                    <!-- recipe short description -->
                  </div>
                  <!-- recipe header info end -->
                </div>
                <div class="w-full md:w-1/2" v-if="images.length != 0">
                  <recipe-images
                    :video="recipe.video"
                    :title="recipe.title"
                    :images="recipe.images"
                    :authorid="recipe.author.id"
                  />
                </div>
                <div v-else>
                  <div v-show="isChannel && isValidUser">
                    <span
                      @click="$store.commit('recipe/isUserImageSideBar', true)"
                      class="text-xl text-gray-700 bg-gray-100 rounded mt-10 h-64 flex items-center cursor-pointer block transitin ease-in-out duration-300 border px-24"
                    >
                      Add Images
                    </span>
                  </div>
                </div>

                <div v-if="isValidUser">
                  <add-recipe-images
                    :currenUser="currentUser.id"
                    :rname="recipe.title"
                    :rid="recipe.id"
                    :images="recipe.images"
                  />
                </div>
              </div>
            </div>
            <!-- recipe hero header end-->

            <div class="prep-ingredients-wrapper mt-12 md:mt-24">
              <div class="flex flex-wrap lg:flex-no-wrap">
                <div class="w-full lg:w-3/4 mb-6 lg:mb-0 md:pr-16">
                  <div class="preparation-contanier">
                    <div class="inner">
                      <div class="prep-header">
                        <h2
                          class="capitalize text-2xl text-gray-900 dark:text-gray-300 leading-none"
                        >
                          Method
                        </h2>
                      </div>
                      <!-- prep header -->

                      <RecipeSteps :recipeid="recipe.id" />
                    </div>
                  </div>
                  <!-- preparation-contanier end -->
                </div>

                <div class="w-full lg:w-1/3">
                  <RecipeIngredient :recipe="recipe" />
                </div>
              </div>
            </div>
            <!-- prep-ingredients-wrapper end -->
          </div>
          <!-- recipe wrapper end -->
        </div>
        <!-- container end -->
      </section>
      <!-- single rceipe section -->

      <RecipeSlider :recipe="recipe" />

      <div
        v-if="editingMode"
        @click="editingModeOn(false)"
        class="bar bg-white dark:bg-dark-mode-light py-3 border-t fixed bottom-0 left-0 w-full text-center text-sm z-20"
      >
        <div>
          <span
            class="tracking-wider font-medium dark:text-gray-400 text-gray-900"
            >Editing mode is on</span
          >
          <span
            class="transition duration-300 ease-in-out cursor-pointer border px-3 py-1 inline-block ml-2 rounded bg-theme-orange text-white border-theme-orange hover:bg-white hover:text-black"
            >Turn off</span
          >
          <nuxt-link
            class="transition duration-300 ease-in-out cursor-pointer border px-3 py-1 inline-block ml-2 rounded hover:bg-theme-orange text-gray-900 border-theme-orange hover:bg-theme-yellow hover:text-white dark:text-gray-400"
            :to="`/${recipe.author.username}/recipes/${recipe.slug}`"
            >Go to edit page</nuxt-link
          >
          <span
            @click="ChangeStatus(recipe.status)"
            class="transition duration-300 ease-in-out cursor-pointer border px-3 py-1 inline-block ml-2 rounded hover:dark:text-white hover:text-gray-900 text-white hover:bg-transparent"
            :class="
              recipe.status === 'PUBLISHED'
                ? 'bg-green-500 border-green-500'
                : 'bg-red-600 border-red-600'
            "
          >
            <template v-if="recipe.status === 'DRAFT'">
              Publish this recipe
            </template>
            <template v-else>
              Unpublish this recipe
            </template>
          </span>
        </div>
      </div>
    </div>
    <div v-else>
      <div
        class="h-screen px-10 md:h-25rem w-full flex items-center justify-center"
      >
        <div class="text-center">
          <span
            class="text-6xl font-hairline text-gray-800 uppercase tracking-widest block"
            >Recipe Not Found!</span
          >
          <span class="text-xl font-light block text-gray-700"
            >The recipe may deleted or private</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

import AddRecipeImages from "~/components/recipes/AddRecipeImages";
import RecipeImages from "~/components/recipes/RecipeImages";
import RecipeSlider from "~/components/recipes/Slider";
import RecipeIngredient from "~/components/recipes/Ingredients";
import RecipeSteps from "~/components/recipes/Steps";

import RecipeQuery from "~/gql/queries/Recipe";

export default {
  head() {
    return {
      title: this.recipe.title + " | Chatfata.com"
    };
  },
  scrollToTop: true,
  components: {
    RecipeIngredient,
    RecipeSteps,
    RecipeSlider,
    AddRecipeImages,
    RecipeImages
  },
  data() {
    return {};
  },
  created() {
    if (this.recipe) {
      this.$store.commit("recipe/steps", this.recipe.steps);
      this.$store.commit("recipe/ingredients", this.recipe.ingredients);
    }
  },
  computed: {
    editingMode() {
      return this.$store.state.user.editingMode;
    },
    storageUrl() {
      return this.$store.state.storageUrl;
    },

    images() {
      return this.$store.state.recipe.images;
    },
    isChannel() {
      return this.$store.getters["user/isChannel"];
    },
    currentUser() {
      return this.$store.state.user.loggedInUser;
    },
    isValidUser() {
      if (this.currentUser) {
        return this.recipe.author.id == this.currentUser.id ? true : false;
      }
    }
  },
  methods: {
    ChangeStatus(status) {
      this.isLoading = true;
      this.$store
        .dispatch("recipe/changeStatus", {
          id: this.recipe.id,
          status: status
        })
        .then(res => {
          if (status === "PUBLISHED") {
            this.recipe.status = "DRAFT";
          } else {
            this.recipe.status = "PUBLISHED";
          }
          this.$vToastify.success("Status updated");
          this.isLoading = false;
        })
        .catch(error => {
          this.isLoading = false;
        });
    },
    editingModeOn(bol) {
      this.$store.commit("user/editingMode", bol);
    }
  },
  async asyncData({ app, params, redirect }) {
    const client = app.apolloProvider.defaultClient;

    const recipe = await client
      .query({
        query: RecipeQuery,
        prefech: true,
        variables: {
          slug: params.recipe
        }
      })
      .then(({ data }) => data && data.recipe);

    if (recipe && recipe.images) {
      let images = recipe.images.map(e => {
        return {
          id: e.id,
          image: e.file
        };
      });
      app.store.commit("recipe/images", images);
    }
    return {
      recipe
    };
  }
};
</script>
