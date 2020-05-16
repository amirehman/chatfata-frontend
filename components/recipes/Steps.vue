<template>
  <div>
    <div class="prep-list md:pr-32 mt-3">
      <ol>
        <li
          v-for="(step, i) in steps"
          @click="slideModeOn(i,step.step,steps.length)"
          :key="i"
          class="text-base xxl:text-lg font-normal text-gray-900 dark:text-gray-400 flex items-start"
        >
          <Step :step="step" :i="i" />
        </li>
      </ol>
    </div>
    <!-- prep list -->
  </div>
</template>


<script>

import Step from './Step'

export default {
  components: {
    Step
  },
  props: ["steps"],
  methods: {
    slideModeOn (index,slide,count) {
      this.$store.commit("slider/mutateSlideMode", true)
      this.$store.commit("slider/mutateCurrentSlide", slide)
      this.$store.commit("slider/currentSlideIndex", index)
      this.$store.commit("slider/mutateSliderCount", count)
      this.$store.commit("slider/checkNextPrev", index);
    }
  }
};
</script>
