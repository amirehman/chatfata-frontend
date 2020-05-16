<template>
  <div>
    <section class="categories-section lg:mt-5 py-6">
      <div class="max-w-6xl xxl:max-w-screen-xl mx-auto px-5 lg:px-0">
        <div class="section-header mb-5">
          <h1 class="capitalize text-xl font-medium text-gray-900 dark:text-gray-300">Browse Recipe by Category</h1>
        </div>
        <!-- section header end -->

        <template v-if="$apollo.queries.GetFeaturedCategoriesRandomly.loading">
          <ContentLoader height="h-25rem" gap="3" numbers="5" grid="5" />
        </template>

        <div v-else v-swiper:mySwiper="swiperOption" ref="mySwiper" class="swiper">
          <div class="swiper-wrapper relative">
            <div
              class="swiper-slide"
              v-for="(category, i) in GetFeaturedCategoriesRandomly"
              :key="i"
            >
              <SingleCategory :category="category" />
            </div>
          </div>
        </div>
      </div>
      <!-- container end -->
    </section>
    <!-- cotegories section end -->

    <section class="recipes-section mt-12 px-5 lg:px-0">
      <div class="max-w-6xl xxl:max-w-screen-xl mx-auto">
        <div class="section-header mb-3 lg:mb-5">
          <h1 class="capitalize text-xl font-medium text-gray-900 dark:text-gray-300">
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
              class="pb-10 relative recipe-item border dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-xl transition duration-300 ease-in-out"
              v-for="(recipe, i) in recipes"
              :key="i"
            >
              <SingleRecipe :recipe="recipe" />
            </div>
            <!-- recipe item end -->

            <nuxt-link to="/recipes"
              class="pb-10 relative recipe-item border dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-xl transition duration-300 ease-in-out flex items-center justify-center text-4xl uppercase text-center font-thin tracking-wider text-gray-600 bg-gray-100 py-10 md:py-0"
            >
            Explore
             <br>
             All
             <br>
             Recipes
            </nuxt-link>
            <!-- explore grid item -->
          </div>
          <!-- flex end -->
        </div>
        <!-- recipes wrappper end -->
      </div>
      <!-- container end -->
    </section>

  </div>
</template>


<script>
import gql from "graphql-tag";

import GetFeaturedCategoriesRandomlyQuery from "~/gql/queries/GetFeaturedCategoriesRandomly";
import RecipesQuery from "~/gql/queries/recipes";

import SingleRecipe from "~/components/recipes/SingleRecipe.vue";
import SingleCategory from "~/components/category/SingleCategory.vue";
import ContentLoader from "~/components/templates/ContentLoader";

export default {
  components: {
    SingleCategory,
    SingleRecipe,
    ContentLoader
  },
  data() {
    return {
      isMenuOpen: false,
      swiperOption: {
        slidesPerView: 5,
        spaceBetween: 12,
        freeMode: true,
        breakpoints: {
          1024: {
            slidesPerView: 3,
            spaceBetween: 12
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 12
          },
          480: {
            slidesPerView: 1,
            spaceBetween: 12
          }
        }
      }
    };
  },
  async asyncData({ app }) {
    const client = app.apolloProvider.defaultClient;

    // const categories = await client
    //   .query({
    //     query: GetFeaturedCategoriesRandomlyQuery
    //   })
    //   .then(({ data }) => data && data.GetFeaturedCategoriesRandomly);

    const recipes = await client
      .query({
        query: RecipesQuery
      })
      .then(({ data }) => data && data.recipes.data);

    return {
      recipes
    };
  },
  apollo: {
    GetFeaturedCategoriesRandomly() {
      return {
        query: GetFeaturedCategoriesRandomlyQuery
      };
    }
  }
};
</script>
