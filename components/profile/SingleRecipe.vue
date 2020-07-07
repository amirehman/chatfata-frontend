<template>
  <div>
    <div class="inner">
      <div class="ri-img">
        <nuxt-link :to="`/recipes/${recipe.slug}`">
          <client-only>
            <v-lazy-image
              :alt="recipe.title"
              class="w-full object-cover"
              :src="`${storageUrl}${mediumImage}`"
              :src-placeholder="`${storageUrl}${smallImage}`"
            />
          </client-only>
        </nuxt-link>
      </div>
      <!-- ri img -->

      <div class="ri-info p-3">
        <div
          class="flex xxl:text-lg text-base capitalize leading-tight font-normal text-gray-900 dark:text-gray-400"
        >
          <div class="w-full">
            <h3>
              <nuxt-link
                :to="`/recipes/${recipe.slug}`"
                class="hover:text-orange-500 transition duration-300"
                >{{ recipe.title }}</nuxt-link
              >
            </h3>
          </div>

        </div>
      </div>
      <!-- ri info end -->


    </div>
    <!-- inner end -->
  </div>
</template>

<script>
export default {
  props: ["recipe"],
  computed: {
    mediumImage() {
      return this.recipe.image.replace(/(\.[\w\d_-]+)$/i, "-medium$1");
    },
    smallImage() {
      return this.recipe.image.replace(/(\.[\w\d_-]+)$/i, "-small$1");
    },
    storageUrl() {
      return this.$store.state.storageUrl;
    },
    currentUser() {
      return this.$store.state.user.loggedInUser;
    },
    validUser() {
      if (this.currentUser) {
        return this.recipe.author.id == this.currentUser.id ? true : false;
      }
    }
  }
};
</script>
