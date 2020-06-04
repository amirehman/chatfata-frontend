<template>
  <section class="recipes-section lg:mt-5 px-5 lg:px-0">
    <div class="max-w-6xl xxl:max-w-screen-xl mx-auto" v-if="ingredient">
      <div class="section-header mb-3 lg:mb-16">
        <div class="flex flex-wrap md:flex-no-wrap">
          <div class="w-full lg:w-64">
            <div class="bg-gray-300 dark:bg-dark-mode-light overflow-hidden h-64 rounded-lg flex items-center justify-center">
              <div class="inner relative">
                <client-only v-if="ingredient.image">
                  <v-lazy-image
                    :alt="ingredient.title"
                    class="object-cover h-64 w-full"
                    :src="`${storageUrl}${mediumImage}`"
                    :src-placeholder="`${storageUrl}${smallImage}`"
                  />
                </client-only>
                <span v-else-if="wiki.thumbnail">
                  <img
                    :alt="ingredient.title"
                    class="object-cover h-64 w-full"
                    :src="`${wiki.thumbnail['source']}`"
                  />
                </span>

                <span v-else>
                  <svg class="fill-current text-gray-600 w-32 h-32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 48"><defs></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M56 0H8a8 8 0 00-8 8v32a7.27 7.27 0 00.48 2.64A8.05 8.05 0 004 46.91 8.1 8.1 0 008 48h48a8.08 8.08 0 006.72-3.65A8.18 8.18 0 0064 40V8a8 8 0 00-8-8zM33 42.67H8a2.35 2.35 0 01-.83-.16l14.48-19.76 11.87 11.86 3.76 3.76 4.27 4.3zM58.67 40A2.68 2.68 0 0156 42.67h-6.88l-8-8.06 6.82-6.74 10.78 12zm0-8.13L50 22.21a2.72 2.72 0 00-1.89-.88 2.53 2.53 0 00-1.95.78l-8.82 8.74-14.11-14.08a2.84 2.84 0 00-2.11-.77 2.76 2.76 0 00-1.95 1.09L5.33 36V8A2.68 2.68 0 018 5.33h48A2.68 2.68 0 0158.67 8z"/><circle class="cls-1" cx="37.33" cy="18.67" r="5.33"/></g></g></svg>
                </span>

              </div>
              <!-- inner end -->
            </div>
          </div>
          <!-- w-auto end -->
          <div class="hidden md:block w-16"></div>
          <div class="w-full flex">
            <div class="category-header-info pr-0 lg:pr-16 mt-6 md:mt-0">
              <div class="category-title">
                <h1
                  class="text-3xl font-normal capitalize text-gray-800 dark:text-gray-200"
                >{{ ingredient.title }}</h1>
              </div>
              <!-- category title end -->

              <div
                class="recipe-short-description text-gray-700 dark:text-gray-400 mt-3 text-base content"
              >
                <p v-if="ingredient.body" v-html="ingredient.body"></p>

                <p v-else>
                  {{wiki.extract}}
                  <a
                    :href="`${wiki.content_urls['desktop']['page']}`"
                    class="dark:text-white text-black hover:text-theme-yellow"
                    target="_blank"
                  >Wikipedia</a>
                </p>
              </div>
              <!-- recipe short description -->
            </div>
            <!-- recipe header info end -->
          </div>
        </div>
      </div>
      <!-- section header end  -->
      <div class="recipies-wrapper">
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 flex-wrapper"
        >
          <div v-if="ingredient.recipes.length < 1">
            <h2
              class="text-base tracking-widest text-gray-800 dark:text-gray-400"
            >Nothing here yet, working on it.</h2>
          </div>
          <div
            v-else
            class="pb-10 relative recipe-item border dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-xl transition duration-300 ease-in-out"
            v-for="(recipe, i) in ingredient.recipes"
            :key="i"
          >
            <SingleRecipe :recipe="recipe" />
          </div>
          <!-- recipe item end -->
        </div>
        <!-- grid end -->
      </div>
      <!-- recipies wrappper end -->
    </div>
    <!-- container end -->
  </section>
</template>




<script>
import gql from "graphql-tag";

import IngredientQuery from "~/gql/queries/Ingredient";

import SingleRecipe from "~/components/recipes/SingleRecipe.vue";

export default {
  components: {
    SingleRecipe
  },
  data() {
    return {
    };
  },
  computed: {
    mediumImage() {
      return this.ingredient.image.replace(/(\.[\w\d_-]+)$/i, "-medium$1");
    },
    smallImage() {
      return this.ingredient.image.replace(/(\.[\w\d_-]+)$/i, "-small$1");
    },
    storageUrl() {
      return this.$store.state.storageUrl;
    },
    wiki () {
      return this.$store.state.wiki
    }
  },
  async asyncData({ app, params }) {
    const client = app.apolloProvider.defaultClient;

    try {
      const ingredient = await client
        .query({
          query: IngredientQuery,
          variables: {
            slug: params.ingredient
          }
        })
        .then(({ data }) => data && data.ingredient);
         await app.store.dispatch("getWiki", ingredient.excerpt);
      return {
        ingredient
      }
    } catch (e) {
      // console.error(e);
      // this.error = e;
    }

  }
};
</script>



