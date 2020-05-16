<template>
  <div>
    <div
      class="ingredients-contanier dark:border-gray-700 border py-5 pb-3 rounded-lg hover:shadow-xl trasition ease-in-out duration-300 transform md:hover:scale-125"
    >
      <div class="inner">
        <div class="ingredients-header mb-4 px-5">
          <h2
            class="capitalize text-2xl text-gray-900 dark:text-gray-300 leading-none"
          >ingredients</h2>
        </div>

        <div class="ingredients-list text-base xxl:text-lg">
          <ul>
            <li
              v-for="(ingredient, i) in recipe.ingredients"
              :key="i"
              class="border-b py-1 xxl:py-2 px-5 border-gray-300 dark:border-gray-700"
            >
              <Ingredient :ingredient="ingredient" />
            </li>
            <li
              v-if="recipe.ingredient_note"
              class="border-b py-2 xxl:pt-3 px-5 border-gray-300 dark:border-gray-700 text-sm"
            >
              <span class="text-gray-800 dark:text-gray-400">{{recipe.ingredient_note}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- ingredients-contanier end -->
  </div>
</template>

<script>
import Ingredient from "./Ingredient";

export default {
  components: {
    Ingredient
  },
  props: ["recipe"]
};
</script>
