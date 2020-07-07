<template>
  <div>
    <div class="categories-wrapper w-full p-12">
      <h1 class="capitalize text-xl font-medium text-gray-900 dark:text-gray-300 mb-5">
        All Categories
      </h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 gap-6 w-full">
        <div v-for="(category, index) in categories.data" :key="index">
          <SingleCategory :category="category" />
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import gql from "graphql-tag";

import CategoriesQuery from "~/gql/queries/category/Categories.gql";

import SingleCategory from "~/components/category/SingleCategory.vue";

export default {
  components: {
    SingleCategory
  },
  apollo: {
    categories() {
      return {
        query: CategoriesQuery
      };
    }
  }
};
</script>
