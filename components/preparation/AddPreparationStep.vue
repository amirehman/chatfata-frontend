<template>
  <div>
    <form v-if="isStepEditing" @submit.prevent="update">
      <h3 class="text-lg font-medium mb-3">Edit Preparation Step</h3>
      <textarea
        :value="editingStep.step"
        @input="updateStep"
        class="border dark:border-gray-700 w-full focus:outline-none p-3 dark:bg-dark-mode"
        rows="2"
      ></textarea>
      <div v-if="!isLoading">
        <input
          type="submit"
          value="Update"
          class="mt-3 focus:text-gray-800 dark:focus:text-gray-300 focus:border-theme-yellow hover:bg-theme-yellow hover:border-theme-yellow hover:text-white transition ease-in-out duration-300 cursor-pointer w-auto text-base border border-gray-400 dark:border-gray-700 rounded bg-transparent px-2 py-1 focus:bg-gray-100 dark:focus:bg-dark-mode-light focus:outline-none"
        />
        <span
          @click="cancelEdit(step.id, step.step)"
          class="mt-3 text-theme-yellow focus:text-gray-800 dark:focus:text-gray-300 focus:border-theme-yellow hover:bg-theme-yellow border-theme-yellow hover:text-white transition ease-in-out duration-300 cursor-pointer w-auto text-base border border-gray-400 dark:border-gray-700 rounded bg-transparent px-2 py-1 focus:bg-gray-100 dark:focus:bg-dark-mode-light focus:outline-none"
          >Cancel</span
        >
      </div>
      <div v-else class="lds-dual-ring"></div>
    </form>
    <form v-else @submit.prevent="submit">
      <h3 class="text-lg font-medium mb-3">Add Preparation Step</h3>
      <textarea
        v-model="step"
        class="border dark:border-gray-700 w-full focus:outline-none p-3 dark:bg-dark-mode"
        rows="2"
      ></textarea>
      <input
        v-if="!isLoading"
        type="submit"
        value="Submit"
        class="mt-3 focus:text-gray-800 dark:focus:text-gray-300 focus:border-theme-yellow hover:bg-theme-yellow hover:border-theme-yellow hover:text-white transition ease-in-out duration-300 cursor-pointer w-auto text-base border border-gray-400 dark:border-gray-700 rounded bg-transparent px-2 py-1 focus:bg-gray-100 dark:focus:bg-dark-mode-light focus:outline-none"
      />
      <div v-else class="lds-dual-ring"></div>
    </form>
  </div>
</template>

<script>
import RecipeEditor from "~/components/templates/RecipeEditor";

export default {
  props: ["recipeid"],
  components: {
    RecipeEditor
  },
  data() {
    return {
      isLoading: false,
      step: ""
    };
  },
  computed: {
    editingStep() {
      return this.$store.state.recipe.editingStep;
    },
    isStepEditing() {
      return this.$store.state.recipe.isStepEditing;
    }
  },
  methods: {
    cancelEdit() {
      this.$store.commit("recipe/isStepEditing", false);
    },
    submit() {
      this.isLoading = true;
      this.$store
        .dispatch("recipe/addStep", {
          step: this.step,
          recipe_id: this.recipeid
        })
        .then(res => {
          this.isLoading = false;
          this.step = "";
          this.$vToastify.success("Step Added!");
        })
        .catch(error => {
          this.fillErrors(error.response.data.errors);
        });
    },
    updateStep(e) {
      this.$store.commit("recipe/editingStepOnly", e.target.value);
    },
    update() {
      this.isLoading = true;
      this.$store
        .dispatch("recipe/updateStep", {
          index: this.$store.state.recipe.editingStep.index,
          id: this.$store.state.recipe.editingStep.id,
          step: this.$store.state.recipe.editingStep.step
        })
        .then(res => {
          this.isLoading = false;
          this.$store.commit("recipe/isStepEditing", false);
          this.$vToastify.success("Step updated!");
        })
        .catch(error => {
          this.fillErrors(error);
        });
    }
  }
};
</script>
