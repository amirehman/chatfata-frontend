<template>
  <section class="recipes-section mt-8 lg:mt-12 px-5 lg:px-0">
    <div class="container mx-auto">
      <div class="section-header mb-3 lg:mb-16">
        <div class="flex flex-wrap md:flex-no-wrap">
          <div class="w-64 h-48 bg-gray-200 overflow-hidden rounded-lg  flex items-end pb-3 justify-center">
            <div class="inner relative">
              <span class="text-gray-500">
                <svg class="fill-current w-32 h-32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path
                    d="M5 5a5 5 0 0110 0v2A5 5 0 015 7V5zM0 16.68A19.9 19.9 0 0110 14c3.64 0 7.06.97 10 2.68V20H0v-3.32z"
                  />
                </svg>
              </span>
              <client-only>
                <!-- <v-lazy-image
                    :alt="ingredient.title"
                    class="object-cover h-64 w-full"
                    :src="`${storageUrl}${mediumImage}`"
                    :src-placeholder="`${storageUrl}${smallImage}`"
                />-->
              </client-only>
            </div>
          </div>
          <!-- w-auto end -->
          <div class="hidden md:block w-16"></div>
          <div class="w-full flex">
            <div class="category-header-info pr-0 lg:pr-16 mt-6 md:mt-0">
              <div class="category-title">
                <h1 class="text-2xl tracking-wide leading-snug font-semibold capitalize text-gray-900 dark:text-gray-200">{{user.name}}</h1>
              </div>
              <!-- category title end -->

              <div
                class="recipe-short-description text-gray-700 dark:text-gray-400 mt-3 text-base xxl:text-lg content"
              >
              <p>{{user.info.about}}</p>
              </div>
              <!-- recipe short description -->

              <div class="profile-social">
                <p class="text-base mb-2">Watch my recipes on</p>
                <ul class="flex items-center text-gray-800">
                  <li class="mr-3" v-if="user.info.youtube">
                    <a :href="`${user.info.youtube}`" target="_blank">
                      <svg class="fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>
                    </a>
                  </li>
                  <!-- <li class="mr-3">
                    <a href="">
                      <svg class="fill-current w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913a5.885 5.885 0 001.384 2.126A5.868 5.868 0 004.14 23.37c.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558a5.898 5.898 0 002.126-1.384 5.86 5.86 0 001.384-2.126c.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913a5.89 5.89 0 00-1.384-2.126A5.847 5.847 0 0019.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227a3.81 3.81 0 01-.899 1.382 3.744 3.744 0 01-1.38.896c-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421a3.716 3.716 0 01-1.379-.899 3.644 3.644 0 01-.9-1.38c-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 01-2.88 0 1.44 1.44 0 012.88 0z"/></svg>                    </a>
                  </li>
                  <li class="mr-3">
                    <a href="">
                      <svg class="fill-current w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.998 12c0-6.628-5.372-12-11.999-12C5.372 0 0 5.372 0 12c0 5.988 4.388 10.952 10.124 11.852v-8.384H7.078v-3.469h3.046V9.356c0-3.008 1.792-4.669 4.532-4.669 1.313 0 2.686.234 2.686.234v2.953H15.83c-1.49 0-1.955.925-1.955 1.874V12h3.328l-.532 3.469h-2.796v8.384c5.736-.9 10.124-5.864 10.124-11.853z"/></svg>
                    </a>
                  </li>
                  <li class="mr-3">
                    <a href="">
                      <svg class="fill-current w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                    </a>
                  </li> -->
                </ul>
              </div>

            </div>
            <!-- recipe header info end -->
          </div>
        </div>
      </div>
      <!-- section header end  -->

      <div class="recipies-wrapper">
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xxl:grid-cols-5 gap-6 flex-wrapper"
        >
          <div v-if="user.recipes.length < 1">
            <h2 class="text-base tracking-widest text-gray-800">Nothing here yet, working on it.</h2>
          </div>
          <div
            v-else
            class="pb-10 relative recipe-item border dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-xl transition duration-300 ease-in-out"
            v-for="(recipe, i) in user.recipes"
            :key="i"
          >
          <SingleRecipe :recipe="recipe" />
          </div>
          <!-- recipe item end -->
        </div>
        <!-- grid end -->
      </div>
      <!-- recipies wrappper end -->
    </div>
    <!-- container end -->
  </section>
</template>




<script>
import gql from "graphql-tag";

import User from "~/gql/queries/Userbyname";

import SingleRecipe from "~/components/recipes/SingleRecipe.vue";

export default {
  scrollToTop: true,
  components: {
    SingleRecipe
  },
  data() {
    return {};
  },
  computed: {
    // mediumImage() {
    //   return this.ingredient.image.replace(/(\.[\w\d_-]+)$/i, "-medium$1");
    // },
    // smallImage() {
    //   return this.ingredient.image.replace(/(\.[\w\d_-]+)$/i, "-small$1");
    // },
    storageUrl() {
      return this.$store.state.storageUrl;
    }
  },
  async asyncData({ app, params }) {
    const client = app.apolloProvider.defaultClient;

    const user = await client
      .query({
        query: User,
        variables: {
          username: params.profile
        }
      })
      .then(({ data }) => data && data.userbyname);

    return {
      user
    };
  }
};
</script>
