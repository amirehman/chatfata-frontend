<template>
  <div>
    <div class="prep-list md:pr-32 mt-3">
      <div v-if="!steps" class="lds-dual-ring"></div>
      <draggable
        v-else
        tag="ol"
        v-model="steps"
        v-bind="dragOptions"
        @change="onChnage"
        @start="drag = true"
        @end="drag = false"
      >
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <li
            v-for="(step, i) in steps"
            :key="i"
            class="text-base xxl:text-lg font-normal text-gray-900 dark:text-gray-400 flex items-start"
          >
            <Step :step="step" :i="i" :length="steps.length" />
          </li>
        </transition-group>
      </draggable>
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
import gql from "graphql-tag";

import Step from "./Step";
import AddStep from "~/components/preparation/AddPreparationStep";

import stepsQuery from "~/gql/queries/steps/StepsByRecipe.gql";

export default {
  components: {
    Step,
    AddStep
  },
  props: ["recipeid"],
  data() {
    return {
      drag: false,
      list: [],
      step: "",
      steps: null,
    };
  },
  computed: {
    dragOptions() {
      return {
        handle:".move-steps-handle",
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    },
    editingMode() {
      return this.$store.state.user.editingMode;
    },
    checkNewStep () {
      return this.$store.state.recipe.checkNewStep
    }
  },
  watch: {
     checkNewStep: function(newValue, old) {
       if(newValue != old) {
         this.$apollo.queries.StepsByRecipe.refetch()
       }
     }
  },
  methods: {
    onChnage(evt) {
      let steps = this.steps.map((step, index) => {
        step.order = index + 1;
        return step;
      });
      this.$store
        .dispatch("recipe/orderSteps", {
          recipe_id: this.recipeid,
          steps: this.steps
        })
    }
  },
  apollo: {
    StepsByRecipe() {
      return {
        query: stepsQuery,
        variables: {
          recipe_id: this.recipeid
        },
        update(data) {
          this.steps = data.stepsByRecipe
        }
      };
    }
  }
};
</script>

<style>
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #edf2f7;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}

@media (prefers-color-scheme: dark) {
  .ghost {
    opacity: 0.9;
    background: #484f5d;
  }
}
</style>
