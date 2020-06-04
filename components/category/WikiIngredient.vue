<template>
  <div>
    <div class="flex flex-wrap md:flex-no-wrap">
      <div class="w-full lg:w-64">
        <div class="bg-gray-500 overflow-hidden h-64 rounded-lg">
          <div class="inner relative">
            <client-only>
              <v-lazy-image
                :alt="ingredient.title"
                class="object-cover h-64 w-full"
                :src="`${storageUrl}${mediumImage}`"
                :src-placeholder="`${storageUrl}${smallImage}`"
              />
            </client-only>
          </div>
          <!-- inner end -->
        </div>
      </div>
      <!-- w-auto end -->
      <div class="hidden md:block w-16"></div>
      <div class="w-full flex">
        <div class="category-header-info pr-0 lg:pr-16 mt-6 md:mt-0">
          <div class="category-title">
            <h1
              class="text-3xl font-normal capitalize text-gray-800 dark:text-gray-200"
            >{{ ingredient.title }}</h1>
          </div>
          <!-- category title end -->

          <div
            class="recipe-short-description text-gray-700 dark:text-gray-400 mt-3 text-base content"
          >
            <p>{{ingredient.excerpt}}</p>
          </div>
          <!-- recipe short description -->
        </div>
        <!-- recipe header info end -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['ingredient'],
  data() {
    return {
      wiki: null
    };
  },
  beforeMount() {
    this.getWiki();
  },
  methods: {
    async getWiki() {
      const res = await fetch(
        "https://en.wikipedia.org/api/rest_v1/page/summary/biryani"
      );
      const data = await res.json();
      this.wiki = data;
    }
  },
  computed: {
    mediumImage() {
      return this.ingredient.image.replace(/(\.[\w\d_-]+)$/i, "-medium$1");
    },
    smallImage() {
      return this.ingredient.image.replace(/(\.[\w\d_-]+)$/i, "-small$1");
    },
    storageUrl() {
      return this.$store.state.storageUrl;
    }
  }
};
</script>
