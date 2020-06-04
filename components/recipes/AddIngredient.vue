<template>
  <div>
    <form v-if="isIngredientEditing" @submit.prevent="update">
      <h3 class="text-xl font-medium text-gray-900 dark:text-gray-400">
        Edit Ingredient
      </h3>
      <div class="mt-3">
        <label>
          <span>Amout</span>
          <input
            type="text"
            :value="editingIngredient.amount"
            @input="inputAmount"
            class="border rounded p-2 w-full focus:outline-none mt-2 dark:bg-dark-mode dark:border-gray-700 focus:border-theme-yellow"
          />
        </label>
        <p class="text-base text-theme-yellow mt-2" v-if="errors">
          {{ errors.amount }}
        </p>
      </div>
      <!-- element -->
      <div class="mt-3">
        <span>Ingredient</span>
        <client-only>
          <v-select
            label="title"
            required
            class="custom-select  rounded w-full focus:outline-none mt-2"
            :reduce="ingredient => ingredient.id"
            :value="editingIngredient.ingredient"
            @input="inputIngredient"
            :options="ingredients"
          ></v-select>
        </client-only>
        <p class="text-base text-theme-yellow mt-2" v-if="errors">
          {{ errors.ingredient }}
        </p>
      </div>
      <!-- element -->
      <div class="mt-3">
        <label>
          <span>Note</span>
          <input
            type="text"
            :value="editingIngredient.note"
            @input="inputNote"
            class="border rounded p-2 w-full focus:outline-none mt-2 dark:bg-dark-mode dark:border-gray-700  focus:border-theme-yellow"
          />
        </label>
        <p class="text-base text-theme-yellow mt-2" v-if="errors">
          {{ errors.note }}
        </p>
      </div>
      <!-- element -->

      <div class="mt-2 flex justify-between" v-if="!isLoading">
        <input
          type="submit"
          value="Update"
          class="block mt-3 text-center border rounded p-2 w-full focus:outline-none dark:bg-dark-mode dark:border-gray-700 cursor-pointer hover:bg-theme-yellow transition ease-in-out duration-300 hover:text-white hover:border-theme-yellow focus:bg-theme-yellow focus:border-theme-yellow focus:text-white w-full mr-2"
        />

        <span
          @click="cancelEdit"
          class="block mt-3 text-center border rounded p-2 w-full focus:outline-none dark:bg-dark-mode dark:border-gray-700 cursor-pointer hover:bg-theme-yellow transition ease-in-out duration-300 hover:text-white hover:border-theme-yellow focus:bg-theme-yellow focus:border-theme-yellow focus:text-white w-full ml-2"
          >Cancel</span
        >
      </div>

      <div v-else class="lds-dual-ring"></div>

      <!-- element -->
    </form>
    <form v-else @submit.prevent="submit">
      <h3 class="text-xl font-medium text-gray-900 dark:text-gray-400">
        Add Ingredient
      </h3>
      <div class="mt-3">
        <label>
          <span>Amout</span>
          <input
            type="text"
            v-model="data.amount"
            class="border rounded p-2 w-full focus:outline-none mt-2 dark:bg-dark-mode dark:border-gray-700 focus:border-theme-yellow"
          />
        </label>
        <p class="text-base text-theme-yellow mt-2" v-if="errors">
          {{ errors.amount }}
        </p>
      </div>
      <!-- element -->
      <div class="mt-3">
        <span>Ingredient</span>
        <client-only>
          <v-select
            label="title"
            required
            class="custom-select  rounded w-full focus:outline-none mt-2"
            :reduce="ingredient => ingredient.id"
            v-model="data.ingredient"
            :options="ingredients"
          ></v-select>
        </client-only>
        <p class="text-base text-theme-yellow mt-2" v-if="errors">
          {{ errors.ingredient }}
        </p>
      </div>
      <!-- element -->
      <div class="mt-3">
        <label>
          <span>Note</span>
          <input
            type="text"
            v-model="data.note"
            class="border rounded p-2 w-full focus:outline-none mt-2 dark:bg-dark-mode dark:border-gray-700  focus:border-theme-yellow"
          />
        </label>
        <p class="text-base text-theme-yellow mt-2" v-if="errors">
          {{ errors.note }}
        </p>
      </div>
      <!-- element -->

      <div class="mt-2" v-if="!isLoading">
        <input
          type="submit"
          value="Submit"
          class="border rounded p-2 w-full focus:outline-none mt-2 dark:bg-dark-mode dark:border-gray-700 cursor-pointer hover:bg-theme-yellow transition ease-in-out duration-300 hover:text-white hover:border-theme-yellow focus:bg-theme-yellow focus:border-theme-yellow focus:text-white"
        />
      </div>
      <div v-else class="lds-dual-ring"></div>

      <!-- element -->
    </form>
  </div>
</template>

<script>
import ingredientsQuery from "~/gql/queries/Ingredients";

export default {
  props: ["recipeid"],
  data() {
    return {
      errors: [],
      isLoading: false,
      data: {},
      ingredient: {}
    };
  },
  computed: {
    editingIngredient() {
      return this.$store.state.recipe.editingIngredient;
    },
    isIngredientEditing() {
      return this.$store.state.recipe.isIngredientEditing;
    }
  },
  methods: {
    inputAmount(e) {
      let data = {
        type: "amount",
        value: e.target.value
      };
      this.$store.commit("recipe/editingIngredientOnly", data);
    },
    inputIngredient(e) {
      let data = {
        type: "ingredient",
        value: e
      };
      this.$store.commit("recipe/editingIngredientOnly", data);
    },
    inputNote(e) {
      let data = {
        type: "note",
        value: e.target.value
      };
      this.$store.commit("recipe/editingIngredientOnly", data);
    },
    cancelEdit() {
      this.$store.commit("recipe/isIngredientEditing", false);
    },
    submit() {
      this.isLoading = true;
      this.$store
        .dispatch("recipe/addIngredient", {
          amount: this.data.amount,
          ingredient: this.data.ingredient,
          note: this.data.note,
          recipe_id: this.recipeid
        })
        .then(res => {
          this.isLoading = false;
          this.data = [];
          this.$vToastify.success("Ingredient Added!");
        })
        .catch(error => {
          this.isLoading = false;
          this.fillErrors(error.response.data.errors);
        });
    },
    updateIngredient(e) {
      this.$store.commit("recipe/editingIngredientOnly", e.target.value);
    },
    update() {
      this.isLoading = true;
      let ingr = this.$store.state.recipe.editingIngredient.ingredient
      this.$store
        .dispatch("recipe/updateIngredient", {
          id: this.$store.state.recipe.editingIngredient.id,
          amount: this.$store.state.recipe.editingIngredient.amount,
          ingredient: typeof ingr === "string" ? ingr : ingr.id,
          note: this.$store.state.recipe.editingIngredient.note
        })
        .then(res => {
          this.isLoading = false;
          this.$store.commit("recipe/isIngredientEditing", false);
          this.$vToastify.success("Ingredient updated!");
        })
        .catch(error => {
          this.fillErrors(error);
        });
    }
  },
  apollo: {
    ingredients: {
      query: ingredientsQuery,
      update: data => data.ingredients
    }
  }
};
</script>
