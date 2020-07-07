<template>
  <section class="ingredients-section lg:mt-5 px-5 lg:px-0">
    <div class="max-w-6xl xxl:max-w-screen-xl mx-auto">
      <div class="section-header mb-3 lg:mb-6">
        <div class="flex items-center">
          <div class="w-full">
            <h1
              class="capitalize text-2xl text-gray-900 dark:text-gray-300"
            >Browse recipes by ingredients</h1>
            <div class="w-auto text-base xxl:text-lg mt-2 text-gray-800 dark:text-gray-400">
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
                class="dark:bg-dark-mode dark:border-gray-700 dark:hover:border-gray-700 dark:focus:bg-dark-mode-light border focus:outline-none border-gray-400 p-2 transition duration-300 ease-in-out tracking-wider rounded hover:border-gray-500 w-25rem"
                placeholder="Search ingredients"
              />
            </div>
            <!-- ingredients search -->
          </div>
        </div>
      </div>
      <!-- section header end  -->

      <!-- {{groupedIngrediets}} -->
      <div>
        <ul>
          <li class="ingred-alpha" v-for="(ingredient, i) in groupedIngrediets" :key="i">
          <span class="text-3xl uppercase text-gray-800 dark:text-gray-400 mb-3 mt-8 block">{{i}}</span>
          <ul class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            <li
                v-for="(ingred, key) in ingredient"
                :key="key"
                class="ingred-name grid-item overflow-hidden transition duration-300 ease-out"
              >
                <nuxt-link
                  :to="`/ingredients/${ingred.ingredient.slug}`"
                  href
                  class="text-base text-center text-gray-800 dark:text-gray-400 block dark:focus:text-orange-500 focus:text-orange-500 hover:text-orange-500 capitalize"
                >{{ingred.ingredient.title}}</nuxt-link>
            </li>
          </ul>
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
        let uniqueArr = _.uniqBy(this.ingredients, function(e) {
          return e.ingredient.id;
        });

        return _.groupBy(uniqueArr, item => {
          return item.ingredient.title.charAt(0);
        });

      } else {

        let uniqueArr = _.uniqBy(this.ingredients, function(e) {
          return e.ingredient.id;
        });

        let ingredients = uniqueArr.filter(entry => {
          return entry.ingredient.title.toLowerCase().includes(this.search.toLowerCase());
        });

        return _.groupBy(ingredients, item => {
          return item.ingredient.title.charAt(0);
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
