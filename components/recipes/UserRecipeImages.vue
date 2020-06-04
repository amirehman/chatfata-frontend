<template>
  <div>
    <div class="text-white">
      <div class="user-recipe-images-wrapper">
        <div class="uri-item" v-for="(image, i) in images" :key="i">
          <div class="mb-3 rounded overflow-hidden relative">
            <span
              class="absolute right-0 top-0 z-20 p-1 hover:text-red-600 cursor-pointer"
              @click="deleteImage(image.id, i)"
            >
              <svg
                class="w-6 h-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M2.93 17.07A10 10 0 1117.07 2.93 10 10 0 012.93 17.07zm1.41-1.41A8 8 0 1015.66 4.34 8 8 0 004.34 15.66zm9.9-8.49L11.41 10l2.83 2.83-1.41 1.41L10 11.41l-2.83 2.83-1.41-1.41L8.59 10 5.76 7.17l1.41-1.41L10 8.59l2.83-2.83 1.41 1.41z"
                />
              </svg>
            </span>
            <RecipeImage :image="image.image" height="h-48" width="w-full" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import RecipeImage from "~/components/recipes/RecipeImage";

export default {
  components: {
    RecipeImage
  },
  computed: {
    images() {
      return this.$store.state.recipe.images;
    },
    serverUrl() {
      return this.$store.state.serverUrl;
    }
  },
  methods: {
    deleteImage(image, i) {
      this.$vToastify
        .prompt({
          body: "You won't be able to revert this!",
          answers: { Yes: true, No: false }
        })
        .then(value => {
          if (value) {
            this.delete(image, i)
          }
        });
    },
    delete(id, i) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$apolloHelpers.getToken();
      axios.delete(`${this.serverUrl}/api/media/${id}`).then(response => {
        this.$store.commit("recipe/deleteImage", i);
        this.$vToastify.success("Image deleted!")
      });
    }
  }
};
</script>
