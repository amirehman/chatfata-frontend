<template>
  <section class="ingredients-section mt-8 lg:mt-12 px-5 lg:px-0">
    <div class="container mx-auto">
      <div class="section-header mb-3 lg:mb-6">
        <div class="flex items-center">
          <div class="w-full">
            <h1 class="text-3xl text-gray-800">Browse by ingredients</h1>
            <div class="w-auto text-base xxl:text-lg mt-2 text-gray-800">
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit numquam culpa
                repellat similique eligendi temporibus corrupti officiis vitae sunt nesciunt odit,
                rem, fugit ducimus, ipsum necessitatibus autem labore error magnam?
              </p>
            </div>
            <div class="ingredients-search my-5">
              <input
                type="search"
                v-model="search"
                class="border focus:outline-none border-gray-400 p-2 transition duration-300 ease-in-out tracking-wider rounded hover:border-gray-500 w-25rem"
                placeholder="Search ingredients"
              />
            </div>
            <!-- ingredients search -->
          </div>
        </div>
      </div>
      <!-- section header end  -->

      <div>
        <ul>
          <li class="ingred-alpha" v-for="(ingredient, i) in groupedIngrediets" :key="i">
            <span class="text-3xl uppercase text-gray-700 mb-3 mt-8 block">{{i}}</span>
            <ul
              class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 xxl:grid-cols-8 gap-4"
            >
              <li
                v-for="(ingred, key) in ingredient"
                :key="key"
                class="ingred-name grid-item border overflow-hidden transition duration-300 ease-out hover:border-gray-400"
              >
                <nuxt-link
                  :to="`/ingredients/${ingred.slug}`"
                  href
                  class="text-base xxl:text-lg text-center p-1 text-gray-800 block"
                >{{ingred.title}}</nuxt-link>
              </li>
            </ul>
            <!-- grid item end -->
          </li>
          <!-- ingred alpha end -->
        </ul>
      </div>
      <!-- flex end -->
    </div>
  </section>
</template>




<script>
import gql from "graphql-tag";
import _ from "lodash";

import IngredientsQuery from "~/gql/queries/GetAllIngredientsSorted";

import SingleRecipe from "~/components/recipes/SingleRecipe.vue";

export default {
  components: {
    SingleRecipe
  },
  data() {
    return {
      search: ""
    };
  },
  computed: {
    groupedIngrediets() {
      if (this.search === "") {
        return _.groupBy(this.ingredients, item => {
          return item.title.charAt(0);
        });
      } else {
        let ingredients = this.ingredients.filter(entry => {
          return entry.title.toLowerCase().includes(this.search.toLowerCase());
        });

        return _.groupBy(ingredients, item => {
          return item.title.charAt(0);
        });
      }
    }
  },
  async asyncData({ app }) {
    const client = app.apolloProvider.defaultClient;

    const ingredients = await client
      .query({
        query: IngredientsQuery
      })
      .then(({ data }) => data && data.GetAllIngredientsSorted);

    return {
      ingredients
    };
  }
};
</script>
