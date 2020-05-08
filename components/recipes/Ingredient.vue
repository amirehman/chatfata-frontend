<template>
  <div>
    <span class="font-semibold dark:text-gray-300 inline-block w-auto">{{ingredient.amount}}</span>
    <nuxt-link :to="`/ingredients/${ingredient.ingredient.slug}`" class="text-gray-800 dark:text-gray-200 leading-8 hover:text-theme-orange">{{ingredient.ingredient.title}}</nuxt-link>
    <span class="text-gray-500 dark:text-gray-400 font-light" v-if="ingredient.note">|</span>
    <span class="text-sm text-gray-600 dark:text-gray-400">{{ingredient.note}}</span>
  </div>
</template>

<script>
export default {
  props: ["ingredient"]
};
</script>
