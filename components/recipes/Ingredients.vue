<template>
  <div>
    <div
      class="ingredients-contanier dark:border-gray-700 border py-5 rounded-lg hover:shadow-lg trasition ease-in-out duration-300 transform"
      :class="recipe.ingredient_note ? 'pb-0' : 'pb-2'"
    >
      <div class="inner">
        <div class="ingredients-header mb-4 px-5">
          <h2
            class="capitalize text-2xl text-gray-900 dark:text-gray-300 leading-none flex items-center justify-between"
          >
            <span>ingredients</span>
            <span class="text-lg text-gray-700 tracking-widest">Serves {{recipe.serves}} </span>
          </h2>
        </div>

        <div class="ingredients-list text-base xxl:text-lg">
          <ul>
            <draggable
              v-model="ingredients"
              v-bind="dragOptions"
              @change="onChnage"
              @start="drag = true"
              @end="drag = false"
            >
              <transition-group
                type="transition"
                :name="!drag ? 'flip-list' : null"
              >
                <li
                  v-for="(ingredient, i) in ingredients"
                  :key="i"
                  class="border-b py-1 xxl:py-2 px-5  border-gray-300 dark:border-gray-700 relative"
                  :class="
                    ingredient.type === 'heading'
                      ? 'dark:bg-dark-mode-dark capitalize font-semibold bg-gray-200 tracking-wider'
                      : ''
                  "
                >
                  <Ingredient :ingredient="ingredient" />
                  <span v-if="editingMode">
                    <span
                      @click="editIngredient(i, ingredient)"
                      class="cursor-pointer text-green-600 dark:text-theme-orange tracking-wider text-sm  h-full p-1"
                      >Edit</span
                    >
                    <span
                      @click="confirmDelete(i, ingredient.id)"
                      class="cursor-pointer text-red-600 dark:text-theme-orange tracking-wider text-sm  h-full p-1"
                      >Delete</span
                    >
                  </span>
                </li>
              </transition-group>
            </draggable>
            <li
              v-if="recipe.ingredient_note"
              class="border-b py-2 xxl:p-3 mt-1 px-5 border-gray-300 dark:border-gray-700 text-sm bg-gray-200 dark:bg-dark-mode-light"
            >
              <span class="font-medium text-base mb-1 block">Note & Tips</span>
              <span
                class="text-gray-800 dark:text-gray-400 block pb-3"
                v-html="recipe.ingredient_note"
                >{{
              }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- ingredients-contanier end -->

    <div
      v-if="editingMode"
      class="add-ingredients mt-5 border p-5 rounded dark:border-gray-700"
    >
      <AddIngredient :recipeid="recipe.id" />
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

import Ingredient from "./Ingredient";
import AddIngredient from "./AddIngredient";

import IngredientsQuery from "~/gql/queries/ingredient/RecipeIngredientsByRecipe.gql";

export default {
  components: {
    Ingredient,
    AddIngredient
  },
  props: ["recipe"],
  data() {
    return {
      drag: false
    };
  },
  computed: {
    editingMode() {
      return this.$store.state.user.editingMode;
    },
    dragOptions() {
      return {
        handle: ".move-ingredients-handle",
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    },
    checkNewStep() {
      return this.$store.state.recipe.checkNewStep;
    }
  },
  watch: {
    checkNewStep: function(newValue, old) {
      if (newValue != old) {
        this.$apollo.queries.ingredients.refetch();
      }
    }
  },
  apollo: {
    ingredients() {
      return {
        query: IngredientsQuery,
        variables: {
          recipe_id: this.recipe.id
        },
        update(data) {
          return data.recipeIngredientsByRecipe;
        }
      };
    }
  },
  methods: {
    onChnage(evt) {
      let steps = this.ingredients.map((step, index) => {
        step.order = index + 1;
        return step;
      });
      this.$store.dispatch("recipe/orderIngredients", {
        recipe_id: this.recipe.id,
        ingredients: this.ingredients
      });
    },
    editIngredient(i, ingredient) {
      if (ingredient.type === "heading") {
        this.$store.commit("recipe/isTypeMode", true);
        this.$store.commit("recipe/isTypeModeEditing", true);
        this.$store.commit("recipe/editingIngredient", ingredient);
      } else {
        this.$store.commit("recipe/isTypeMode", false);
        this.$store.commit("recipe/isTypeModeEditing", false);
        this.$store.commit("recipe/isIngredientEditing", true);
        this.$store.commit("recipe/editingIngredient", ingredient);
        this.$store.commit("recipe/editingIngredientIndex", i);
      }
    },
    confirmDelete(index, id) {
      this.$vToastify
        .prompt({
          body: "You won't be able to revert this!",
          answers: { Yes: true, No: false }
        })
        .then(value => {
          if (value) {
            this.deleteIngredient(index, id);
          }
        });
    },
    deleteIngredient(index, id) {
      this.$store
        .dispatch("recipe/deleteIngredient", {
          id: id,
          index: index
        })
        .then(res => {
          this.$vToastify.success("Ingredient deleted!");
        })
        .catch(error => {
          this.fillErrors(error.response.data.errors);
        });
    }
  }
};
</script>
