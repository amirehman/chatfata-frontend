<template>
  <section class="recipes-section mt-8 lg:mt-12 px-5 lg:px-0">
    <div class="container mx-auto">
      <div class="section-header mb-3 lg:mb-16">
        <div class="flex flex-wrap md:flex-no-wrap">
          <div class="w-full lg:w-64">
            <div class="bg-gray-500 overflow-hidden h-64 rounded-lg">
              <div class="inner relative">
                <client-only>
                  <v-lazy-image
                    :alt="ingredient.title"
                    class="object-cover h-64 w-full"
                    :src="`${storageUrl}${mediumImage}`"
                    :src-placeholder="`${storageUrl}${smallImage}`"
                  />
                </client-only>
              </div>
              <!-- inner end -->
            </div>
          </div>
          <!-- w-auto end -->
          <div class="hidden md:block w-16"></div>
          <div class="w-full flex">
            <div class="category-header-info pr-0 lg:pr-16 mt-6 md:mt-0">
              <div class="category-title">
                <h1 class="text-3xl font-normal capitalize text-gray-800 dark:text-gray-200">{{ ingredient.title }}</h1>
              </div>
              <!-- category title end -->

              <div
                class="recipe-short-description text-gray-700 dark:text-gray-400 mt-3 text-base xxl:text-lg content"
              >
                <p>{{ingredient.excerpt}}</p>
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
            <h2 class="text-base tracking-widest text-gray-800">Nothing here yet, working on it.</h2>
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
    return {};
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
    }
  },
  async asyncData({ app, params }) {
    const client = app.apolloProvider.defaultClient;

    const ingredient = await client
      .query({
        query: IngredientQuery,
        variables: {
          slug: params.ingredient
        }
      })
      .then(({ data }) => data && data.ingredient);

    return {
      ingredient
    };
  }
};
</script>
