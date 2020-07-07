<template>
  <div class="w-full">
    <div class="flex w-full relative">
      <div
        class="number w-4 block text-2xl xxl:text-3xl mt-2 text-gray-500 font-light w-16"
      >
        <span class="block flex items-center w-24 h-full">
          <DragIcon v-if="editingMode" width="w-3" height="h-5" class="cursor-move move-steps-handle" />
          <client-only v-else>
            <p-check
              v-if="step.type != 'title'"
              name="check"
              color="warning"
              v-model="check"
            ></p-check>
          </client-only>
        </span>
      </div>

      <div class="relative w-full">
        <span v-if="editingMode" class="actions text-sm flex items-center absolute left-0 top-0 mt-1">
      <span>
        <span
          @click.prevent="editStep(i, step.step, step.type, step.id)"
          class="cursor-pointer hover:underline text-green-600 mr-2"
          >Edit</span
        >
        <span
          @click="confirmDelete(step.id, i)"
          class="cursor-pointer hover:underline text-red-600"
          >Delete</span
        >
      </span>
    </span>
        <p
          class="py-5 dark:border-gray-700 w-full "
          :class="[
            length > 1 ? 'cursor-pointe' : '',
            check ? 'text-gray-500 line-through' : '',
            step.type === 'title'
              ? 'pb-0 border-0 text-xl font-semibold text-gray-900 dark:text-gray-400'
              : 'pb-5  border-b'
          ]"
          v-html="step.step"
        ></p>
        <!-- for slider  -->
        <!-- @click="slideModeOn(i, step.step, step.type)" -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["step", "i", "length"],
  data() {
    return {
      check: false
    };
  },
  computed: {
    editingMode() {
      return this.$store.state.user.editingMode;
    },
    stepsLength() {
      return this.$store.state.recipe.steps.length;
    }
  },
  methods: {
    editStep(index, step, type, id) {
      let data = {
        index: index,
        id: id,
        step: step,
        type: type
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
    slideModeOn(index, slide, type) {
      if (this.length > 1) {
        this.$store.commit("slider/mutateCurrentSlideType", type);
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
