<template>
  <div>
    <div
      @click.self="slideModeOff"
      class="slider-wrapper w-full h-screen bg-black-transparent-6 fixed left-0 top-0 items-center justify-center z-50"
      :class="sliderMode ? 'flex' : 'hidden'"
    >
      <transition name="fade">
        <div
          v-show="sliderMode"
          class="slide w-full h-full sm:h-auto sm:w-3/4 lg:w-1/2 bg-white dark:bg-dark-mode rounded shadow-xl flex flex-col justify-between"
        >
          <div class="header border-b border-gray-400 text-xl flex justify-between items-center">
            <h3 class="w-auto p-3 border-r border-gray-400 sm:border-0">{{recipe.title}}</h3>
            <span class="block w-24 text-center sm:text-right p-3">
              <span class="text-base sm:text-xl text-gray-600 -mr-px">{{sliderCount}}</span>
              <span class="text-sm">/</span>
              <span class="text-base sm:text-xl -ml-px">{{currentSlideIndex + 1}}</span>
            </span>
          </div>
          <div class="p-5 text-2xl dark:font-light leading-snug overflow-y-auto">
            <p>{{currentSlide}}</p>
          </div>
          <div class="footer border-t border-gray-400">
            <div class="arrows text-gray-700 w-full flex items-center justify-between">
              <span
                class="p-3 hover:bg-gray-200 dark:hover:bg-dark-mode-light dark:text-gray-400 transition ease-in-out duration-300 cursor-pointer"
                @click="prevSlide"
                v-if="isPrevSlide"
              >
                <svg
                  class="fill-current w-10 h-10"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M7.05 9.293L6.343 10 12 15.657l1.414-1.414L9.172 10l4.242-4.243L12 4.343z"
                  />
                </svg>
              </span>
              <span v-else class="p-3">First</span>
              <span class="p-3 cursor-pointer block sm:hidden" @click="slideModeOff">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="fill-current w-6 h-6 dark:text-gray-400"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
                  />
                </svg>
              </span>

              <span
                class="p-3 hover:bg-gray-200 dark:hover:bg-dark-mode-light dark:text-gray-400  transition ease-in-out duration-300 cursor-pointer"
                @click="nextSlide"
                v-if="isNextSlide"
              >
                <svg
                  class="fill-current w-10 h-10"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"
                  />
                </svg>
              </span>
              <span v-else class="p-3">Ended</span>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <client-only>
      <Keypress key-event="keydown" :key-code="27" @success="slideModeOff" />
    </client-only>
  </div>
</template>

<script>
export default {
  props: ["recipe"],
  components: {
    Keypress: () => import("vue-keypress")
  },
  data() {
    return {};
  },
  computed: {
    sliderMode() {
      return this.$store.state.slider.sliderMode;
    },
    currentSlide() {
      return this.$store.state.slider.currentSlide;
    },
    currentSlideIndex() {
      return this.$store.state.slider.currentSlideIndex;
    },
    sliderCount() {
      return this.$store.state.slider.sliderCount;
    },
    isNextSlide() {
      return this.$store.state.slider.isNextSlide;
    },
    isPrevSlide() {
      return this.$store.state.slider.isPrevSlide;
    }
  },
  methods: {
    prevSlide() {
      const nextIndex = this.currentSlideIndex - 1;
      const slide = this.recipe.steps[nextIndex].step;
      this.updateSlide(nextIndex, slide);
    },
    nextSlide() {
      let nextIndex = this.currentSlideIndex + 1;
      const slide = this.recipe.steps[nextIndex].step;
      this.updateSlide(nextIndex, slide);
    },
    slideModeOff() {
      this.$store.commit("slider/mutateSlideMode", false);
      this.$store.commit("slider/mutateIsPrevSlide", true);
      this.$store.commit("slider/mutateIsNextSlide", true);
    },
    updateSlide(index, slide) {
      this.$store.commit("slider/mutateCurrentSlide", slide);
      this.$store.commit("slider/currentSlideIndex", index);
      this.$store.commit("slider/checkNextPrev", index);
    }
  }
};
</script>


<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: 0.3s;
  transform: scale(1);
}
.fade-enter,
.fade-leave-to{
  opacity: 0;
  transform: scale(0);
}
</style>
