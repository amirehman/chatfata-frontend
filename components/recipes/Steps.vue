<template>
  <div>
    <div class="prep-list md:pr-32 mt-3">
      <div v-if="!steps" class="lds-dual-ring"></div>
      <ol v-else>
        <li
          v-for="(step, i) in steps"
          :key="i"
          class="text-base xxl:text-lg font-normal text-gray-900 dark:text-gray-400 flex items-start"
        >
          <Step :step="step" :i="i" :length="steps.length" />
        </li>
      </ol>
    </div>
    <!-- prep list -->
    <div
     v-if="editingMode"
      class="add-steps border dark:border-gray-700 p-5 mt-10 rounded bg-black-transparent-1"
    >
    <add-step :recipeid="recipeid"></add-step>
    </div>
  </div>
</template>

<script>
import Step from "./Step";
import AddStep from "~/components/preparation/AddPreparationStep";

export default {
  components: {
    Step,
    AddStep
  },
  props: ["recipeid"],
  data() {
    return {
      step: ""
    };
  },
  computed: {
    editingMode () {
      return this.$store.state.user.editingMode
    },
    steps () {
      return this.$store.state.recipe.steps
    }
  },
  methods: {
    // slideModeOn(index, slide, count) {
    //   this.$store.commit("slider/mutateSlideMode", true);
    //   this.$store.commit("slider/mutateCurrentSlide", slide);
    //   this.$store.commit("slider/currentSlideIndex", index);
    //   this.$store.commit("slider/mutateSliderCount", count);
    //   this.$store.commit("slider/checkNextPrev", index);
    // }
  }
};
</script>
