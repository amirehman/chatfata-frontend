<template>
  <div>
    <div class="h-32rem relative images-wrapper group overflow-hidden">
      <!-- {{currentUser.id}}
      {{authorid}}
      {{isValidUser}} -->
      <div
        v-show="editingMode"
        class="edit-action p-2 absolute left-0 top-0 z-10 opacity-0 focus:bg-dark-mode"
      >
        <span
          @click="$store.commit('recipe/isUserImageSideBar', true)"
          class="text-gray-200 cursor-pointer block hover:bg-dark-mode focus:bg-dark-mode transitin ease-in-out duration-300 border px-5 py-2 border-gray-700 rounded bg-black-transparent-4"
        >
          Add or Remove Images
        </span>
      </div>
      <div class="play-button absolute bottom-0 left-0 z-10 p-3" v-if="video">
        <a
          id="play-video"
          class="ml-12 -mt-12 video-play-button"
          :href="video"
          target="_blank"
        >
          <span></span>
        </a>
      </div>
      <client-only>
      <div v-swiper:mySwiper="swiperOption" ref="mySwiper" class="swiper">
        <div class="swiper-wrapper relative ">
          <div
            class="swiper-slide"
            v-for="(image, index) in images"
            :key="index"
          >
            <RecipeImageSlide :image="image.image" :title="title" />
            <div class="swiper-pagination flex justify-end p-5 w-full single-recipe-pagination" slot="pagination"></div>
          </div>
          <!-- swoper slide -->
        </div>
      </div>
      </client-only>
    </div>
    <!-- recipe cover image end -->
  </div>
</template>

<script>
import RecipeImageSlide from "~/components/recipes/RecipeImageSlide";

export default {
  props: ["video", "title", 'authorid'],
  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 0,
        pagination: {
          el: '.swiper-pagination'
        },
      }
    };
  },
  components: {
    RecipeImageSlide
  },
  computed: {
    editingMode () {
      return this.$store.state.user.editingMode
    },
    isChannel() {
      return this.$store.getters["user/isChannel"];
    },
    currentUser() {
      return this.$store.state.user.loggedInUser;
    },
    isValidUser() {
      if (this.currentUser) {
        return this.authorid == this.currentUser.id ? true : false;
      }
    },
    images() {
      return this.$store.state.recipe.images;
    }
  }
};
</script>

<style lang="scss">
.single-recipe-pagination {
  bottom: 5px;
  .swiper-pagination-bullet {
    background: white;
    width: 12px;
    height: 12px;
    margin: 3px;
  }
}
.images-wrapper {
  &:hover {
    .edit-action {
      opacity: 1;
    }
  }
}
</style>
