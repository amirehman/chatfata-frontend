<template>
  <div>
    <span class="dark:text-gray-300 inline-block w-auto">{{
      ingredient.amount
    }}</span>
    <nuxt-link
      v-if="ingredient.ingredient"
      :to="`/ingredients/${ingredient.ingredient.slug}`"
      class="border-b border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 leading-8 hover:text-theme-orange font-medium "
      >{{ ingredient.ingredient.title }}</nuxt-link
    >
    <span
      class="text-gray-500 dark:text-gray-400 font-light"
      v-if="ingredient.note"
      >|</span
    >
    <span class="text-sm text-gray-600 dark:text-gray-400">{{
      ingredient.note
    }}</span>
    <span class="cursor-move move-ingredients-handle flex items-center h-full absolute right-0 top-0 justify-center hover:bg-gray-200 dark:hover:bg-dark-mode-light-1">
      <DragIcon
        v-if="editingMode"
        width="w-6"
        height="h-6"
        class="pl-4 text-gray-600"
      />
    </span>

  </div>
</template>

<script>
export default {
  props: ["ingredient"],
  computed: {
    editingMode() {
      return this.$store.state.user.editingMode;
    }
  }
};
</script>
