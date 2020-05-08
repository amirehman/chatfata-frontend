<template>
  <div>
    <section class="categories-section mt-8 lg:mt-12 py-6">
      <div class="container mx-auto px-5 lg:px-0">
        <div class="section-header mb-5">
          <h1 class="capitalize text-2xl text-gray-800">Browse Recipe by Category</h1>
        </div>
        <!-- section header end -->

        <client-only>
          <swiper class="swiper" :options="swiperOption">
            <swiper-slide v-for="(category, i) in categories" :key="i">
              <SingleCategory :category="category" />
            </swiper-slide>
          </swiper>
        </client-only>
      </div>
      <!-- container end -->
    </section>
    <!-- cotegories section end -->

    <section class="recipes-section mt-12 px-5 lg:px-0">
      <div class="container mx-auto">
        <div class="section-header mb-3 lg:mb-5">
          <h1 class="capitalize text-2xl text-gray-800">
            Just For you
            <span class="tracking-widest">...</span>
          </h1>
        </div>
        <!-- section header end  -->

        <div class="recipes-wrapper">
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 flex-wrapper"
          >
            <div
              class="pb-10 relative recipe-item border dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-xl transition duration-300 ease-in-out "
              v-for="(recipe, i) in recipes"
              :key="i"
            >
              <SingleRecipe :recipe="recipe" />
            </div>
            <!-- recipe item end -->
          </div>
          <!-- flex end -->
        </div>
        <!-- recipes wrappper end -->
      </div>
      <!-- container end -->
    </section>

    <section class="laod-more-section text-center my-16 md:my-16">
        <nuxt-link to="recipes" class="w-64 focus:outline-none dark:border-gray-700 border cursor-pointer flex items-center mx-auto uppercase px-2 py-4 justify-center pb-3 transition cursor-pointer duration-300 hover:shadow rounded-lg text-gray-700 dark:text-gray-400 tracking-wide dark:hover:bg-dark-mode-light">Explore All Recipes</nuxt-link>
    </section>
    <!-- load more section end -->
  </div>
</template>


<script>
import gql from "graphql-tag";

import GetFeaturedCategoriesRandomlyQuery from "~/gql/queries/GetFeaturedCategoriesRandomly";
import RecipesQuery from "~/gql/queries/recipes";

import SingleRecipe from "~/components/recipes/SingleRecipe.vue";
import SingleCategory from "~/components/category/SingleCategory.vue";

export default {
  components: {
    SingleCategory,
    SingleRecipe
  },
  data() {
    return {
      isMenuOpen: false,
      swiperOption: {
        slidesPerView: 6,
        spaceBetween: 12,
        freeMode: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      }
    };
  },
  async asyncData({ app }) {
    const client = app.apolloProvider.defaultClient;

    const categories = await client
      .query({
        query: GetFeaturedCategoriesRandomlyQuery
      })
      .then(({ data }) => data && data.GetFeaturedCategoriesRandomly);

    const recipes = await client
      .query({
        query: RecipesQuery
      })
      .then(({ data }) => data && data.recipes.data);

    return {
      categories,
      recipes
    };
  }
};
</script>
