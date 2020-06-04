<template>
  <div class="flex relative">
    <span
      class="number w-4 block mr-8 text-2xl xxl:text-3xl mt-2 text-gray-500 font-light"
      >{{ i + 1 }}</span
    >
    <p
      class="block w-full para py-5 pb-2 dark:border-gray-700 border-b"
      :class="length > 1 ? 'cursor-pointer' : ''"
      v-html="step.step"
      @click="slideModeOn(i, step.step)"
    ></p>
    <div v-if="editingMode" class="actions text-xs flex items-center">
      <span>
        <span
          @click.prevent="editStep(i, step.step, step.id)"
          class="cursor-pointer hover:underline text-green-600"
          >Edit</span
        >
        <span
          @click="confirmDelete(step.id, i)"
          class="cursor-pointer hover:underline text-red-600"
          >Delete</span
        >
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["step", "i", "length"],
  computed: {
    editingMode() {
      return this.$store.state.user.editingMode;
    },
    stepsLength() {
      return this.$store.state.recipe.steps.length;
    }
  },
  methods: {
    editStep(index, step, id) {
      let data = {
        index: index,
        id: id,
        step: step
      };
      this.$store.commit("recipe/isStepEditing", true);
      this.$store.commit("recipe/editingStep", data);
    },
    confirmDelete(id, index) {
      this.$vToastify
        .prompt({
          body: "You won't be able to revert this!",
          answers: { Yes: true, No: false }
        })
        .then(value => {
          if (value) {
            this.deleteStep(id, index);
          }
        });
    },
    deleteStep(id, index) {
      this.$store
        .dispatch("recipe/deleteStep", {
          id: id,
          index: index
        })
        .then(res => {
          this.$vToastify.success("Step deleted!");
        })
        .catch(error => {
          this.fillErrors(error.response.data.errors);
        });
    },
    slideModeOn(index, slide) {
      if (this.length > 1) {
        this.$store.commit("slider/mutateSlideMode", true);
        this.$store.commit("slider/mutateCurrentSlide", this.step.step);
        this.$store.commit("slider/currentSlideIndex", this.i);
        this.$store.commit("slider/mutateSliderCount", this.stepsLength);
        this.$store.commit("slider/checkNextPrev", this.i);
      }
    }
  }
};
</script>
