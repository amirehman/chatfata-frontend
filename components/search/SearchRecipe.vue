<template>
  <div>
    <nuxt-link
      :to="`/recipes/${recipe.slug}`"
      class="block pl-5 border-b dark:border-gray-700 focus:outline-none focus:bg-gray-100 dark:focus:dark-mode-light hover:bg-gray-100 dark:hover:bg-dark-mode-light text-left flex items-center justify-between"
      :class="mobile === 'true' ? 'text-sm' : ''"
    >
      <span class="w-full">{{recipe.title}}</span>
      <span
      :class="mobile === 'true' ? 'w-16' : 'w-24'"
      >
        <client-only>
          <v-lazy-image
            :alt="recipe.title"
            class="w-full rounded"
            :src="`${storageUrl}${smallImage}`"
          />
        </client-only>
      </span>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: ["recipe", 'mobile'],
  computed: {
    smallImage() {
      return this.recipe.image.replace(/(\.[\w\d_-]+)$/i, "-small$1");
    },
    storageUrl() {
      return this.$store.state.storageUrl;
    }
  }
};
</script>
