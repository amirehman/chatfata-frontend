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
            <p class="text-sm pt-2">
              By
              <nuxt-link
                :to="`/${recipe.author.username}`"
                href
                class="hover:underline hover:text-orange-700 dark:hover:text-orange-400 transition duration-300"
                >{{ recipe.author.name }}</nuxt-link
              >
            </p>
          </div>
          <div class="w-auto">
            <span
              class="inline-block leading-none -mt-1 text-3xl"
              name="flag"
              v-if="recipe.country.length > 0"
              >{{ recipe.country[0].emoji }}
            </span>
          </div>
        </div>
      </div>
      <!-- ri info end -->

      <div
        class="absolute bottom-0 left-0 text-xs w-full border-t dark:border-gray-700 ri-footer p-3 py-2 tracking-wider text-gray-900 dark:text-gray-400"
      >
        <div class="flex justify-between">
          <div class="flex items-center">
            <span>
              <a href class="hover:text-orange-700 transition duration-300"
                >{{ recipe.difficulty }}
              </a> </span
            >,
            <span>
              <a
                href
                class="ml-1 hover:text-orange-700 transition duration-300"
              >
                <span v-for="(meal, i) in recipe.meals" :key="i">
                  <span v-if="i != 0">, </span>
                  {{ meal.title }}
                </span>
              </a>
            </span>
          </div>
          <div class="flex items-center">
            <span class>
              <i
                data-vi="clock"
                data-vi-primary="#2d3748"
                data-vi-accent="#fff"
                data-vi-size="20"
              ></i>
            </span>
            <span>{{ recipe.prep_time }} min</span>
          </div>
        </div>
      </div>
      <!-- ri footer end -->
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
