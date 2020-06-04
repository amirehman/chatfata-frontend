<template>
  <div>
    <div
      class="ingredients-contanier dark:border-gray-700 border py-5 pb-3 rounded-lg hover:shadow-lg trasition ease-in-out duration-300 transform"
    >
      <div class="inner">
        <div class="ingredients-header mb-4 px-5">
          <h2
            class="capitalize text-2xl text-gray-900 dark:text-gray-300 leading-none"
          >
            ingredients
          </h2>
        </div>

        <div class="ingredients-list text-base xxl:text-lg">
          <ul>
            <li
              v-for="(ingredient, i) in ingredients"
              :key="i"
              class="border-b py-1 xxl:py-2 px-5 border-gray-300 dark:border-gray-700 relative"
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
            <li
              v-if="recipe.ingredient_note"
              class="border-b py-2 xxl:pt-3 px-5 border-gray-300 dark:border-gray-700 text-sm"
            >
              <span class="text-gray-800 dark:text-gray-400">{{
                recipe.ingredient_note
              }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- ingredients-contanier end -->

    <div v-if="editingMode" class="add-ingredients mt-5 border p-5 rounded dark:border-gray-700">
      <AddIngredient :recipeid="recipe.id" />
    </div>
  </div>
</template>

<script>
import Ingredient from "./Ingredient";
import AddIngredient from "./AddIngredient";

export default {
  components: {
    Ingredient,
    AddIngredient
  },
  props: ["recipe"],
  data() {
    return {};
  },
  computed: {
    editingMode() {
      return this.$store.state.user.editingMode;
    },
    ingredients() {
      return this.$store.state.recipe.ingredients;
    }
  },
  methods: {
    editIngredient(i, ingredient) {
      this.$store.commit("recipe/isIngredientEditing", true);
      this.$store.commit("recipe/editingIngredient", ingredient);
      this.$store.commit("recipe/editingIngredientIndex", i);
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
