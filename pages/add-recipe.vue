<template>
  <div>
    <section class="add-recipe-section lg:mt-5 py-6">
      <div class="max-w-6xl xxl:max-w-screen-xl mx-auto px-5">
        <div class="section-header mb-5">
          <h1
            class="capitalize text-xl font-medium text-gray-900 dark:text-gray-300"
          >
            Add New Recipe
          </h1>
        </div>
        <!-- section header end -->
      </div>
      <!-- container end -->
    </section>
    <!-- cotegories section end -->

    <section class="add-recipe-form-section">
      <div class="max-w-6xl xxl:max-w-screen-xl mx-auto px-5">
        <form @submit.prevent="formSubmit" class="flex flex-wrap lg:flex-no-wrap">
          <div class="w-full lg:w-4/5">
            <div class="form-element mb-5">
              <label class="block">
                <span class="mb-2 block text-lg tracking-wide">Title</span>
                <input
                  type="text"
                  v-model="recipe.title"
                  class="block w-full text-lg border border-gray-400 dark:border-gray-700 rounded bg-transparent p-3 focus:bg-gray-100 dark:focus:bg-dark-mode-light focus:outline-none"
                />
              </label>
              <p class="text-base text-theme-yellow mt-2" v-if="errors">
                {{ errors.title }}
              </p>
            </div>
            <!-- form element -->

            <div class="form-element mb-5">
              <label class="block">
                <span class="mb-2 block text-lg tracking-wide"
                  >Description</span
                >
              </label>
              <recipe-editor v-model="recipe.detail" />
            </div>
            <!-- form element -->

            <div class="form-element mb-5">
              <label class="mb-2 block text-lg tracking-wide">Meal</label>
              <client-only>
                <v-select
                  label="title"
                  multiple
                  required
                  class="custom-select dark:text-gray-400"
                  :reduce="recipe => recipe.id"
                  v-model="recipe.meals"
                  :options="meals"
                ></v-select>
              </client-only>
              <p class="text-base text-theme-yellow mt-2" v-if="errors">
                {{ errors.meals }}
              </p>
            </div>
            <!-- form element -->

            <div class="form-element mb-5">
              <label class="mb-2 block text-lg tracking-wide">Difficulty</label>
              <client-only>
                <v-select
                  class="custom-select dark:text-gray-400"
                  v-model="recipe.difficulty"
                  required
                  :options="difficulty"
                ></v-select>
              </client-only>
              <p class="text-base text-theme-yellow mt-2" v-if="errors">
                {{ errors.difficulty }}
              </p>
            </div>
            <!-- form element -->

            <div class="form-element mb-5">
              <label class="block">
                <span class="mb-2 block text-lg tracking-wide">
                  Preparation time
                  <small>(minuts)</small>
                </span>
                <input
                  type="number"
                  required
                  v-model="recipe.prep_time"
                  class="block w-full text-lg border border-gray-400 dark:border-gray-700 rounded bg-transparent p-3 focus:bg-gray-100 dark:focus:bg-dark-mode-light focus:outline-none"
                />
              </label>
              <p class="text-base text-theme-yellow mt-2" v-if="errors">
                {{ errors.prep_time }}
              </p>
            </div>
            <!-- form element -->

            <div class="form-element mb-5">
              <label class="block">
                <span class="mb-2 block text-lg tracking-wide">Video URL</span>
                <input
                  type="url"
                  v-model="recipe.video"
                  class="block w-full text-lg border border-gray-400 dark:border-gray-700 rounded bg-transparent p-3 focus:bg-gray-100 dark:focus:bg-dark-mode-light focus:outline-none"
                />
              </label>
            </div>
            <!-- form element -->

            <div class="form-element mb-5 hidden md:block text-right">
              <loader v-if="isLoading" />
              <input
                v-else
                type="submit"
                value="Save & Next"
                class="focus:text-gray-800 focus:border-theme-yellow hover:bg-theme-yellow hover:border-theme-yellow hover:text-white transition ease-in-out duration-300 cursor-pointer w-auto text-lg border border-gray-400 dark:border-gray-700 rounded bg-transparent p-3 focus:bg-gray-100 dark:focus:bg-dark-mode-light focus:outline-none"
              />
            </div>
            <!-- form element -->
          </div>
          <!-- col -->

          <div class="w-full lg:w-1/2">
            <div class="inner md:pl-10">
              <div class="add-recipe form-element mb-5">
                <label class="block">
                  <span class="mb-4 block text-lg tracking-wide"
                    >Upload image</span
                  >
                  <client-only>
                    <croppa
                      required
                      :placeholder-font-size="20"
                      :placeholder-color="'#cbd5e0'"
                      :width="400"
                      :height="400"
                      :quality="1"
                      :remove-button-color="'#fca311'"
                      v-model="image"
                    ></croppa>
                  </client-only>
                </label>
                <p class="text-base text-theme-yellow mt-2" v-if="errors">
                  {{ errors.image }}
                </p>
              </div>
              <!-- form element -->

              <div class="form-element mb-12 md:mb0" v-if="errors">
                <div
                  class="text-xl flex items-center justify-center w-400px p-10 rounded text-center border-2 border-red-600 dark:border-theme-yellow text-red-600 dark:text-theme-yellow"
                >
                  <p>You have some required fields to fill</p>
                </div>
              </div>

              <div class="form-element mb-5 block md:hidden">
                <loader v-if="isLoading" />
                <input
                  v-else
                  type="submit"
                  value="Submit"
                  class="hover:bg-theme-yellow hover:border-theme-yellow hover:text-white transition ease-in-out duration-300 cursor-pointer w-auto text-lg border border-gray-400 dark:border-gray-700 rounded bg-transparent p-3 focus:bg-gray-100 dark:focus:bg-dark-mode-light focus:outline-none"
                />
              </div>
              <!-- form element -->
            </div>
            <!-- inner -->
          </div>
        </form>
      </div>
      <!-- container end -->
    </section>
  </div>
</template>

<script>
import gql from "graphql-tag";

// components
import RecipeEditor from "~/components/templates/RecipeEditor";
import Loader from "~/components/templates/Loader";
//Queries
import MealsQuery from "~/gql/queries/Meals";

export default {
  middleware: ["isAuth"],
  components: {
    RecipeEditor,
    Loader
  },
  data() {
    return {
      difficulty: ["easy", "medium", "difficult"],
      image: null,
      isLoading: false,
      errors: null,
      recipe: {
        title: "title",
        detail: "detail",
        meals: [],
        difficulty: "",
        prep_time: "23",
        image: {},
        video: "https://youtube.com"
      }
    };
  },
  methods: {
    generateImage: function() {
      let url = this.image.generateDataUrl();
      if (!url) {
        this.$vToastify.error("Please select thumbnail first!")
        return false;
      }
      this.recipe.image = url;
      return true;
    },
    formSubmit() {
      if (this.generateImage()) {
        this.isLoading = true;
        this.$store
          .dispatch("recipe/addRecipe", {
            title: this.recipe.title,
            detail: this.recipe.detail,
            meals: this.recipe.meals,
            difficulty: this.recipe.difficulty,
            prep_time: this.recipe.prep_time,
            video: this.recipe.video,
            video: this.recipe.video,
            image: this.recipe.image
          })
          .then(res => {
            this.$store.commit('recipe/isUserImageSideBar', true)
            this.$store.commit('user/editingMode', true)
            this.$router.push(`/recipes/${res.data}`);
            this.isLoading = false;
            this.recipe = [];
          })
          .catch(error => {
            this.fillErrors(error.response.data.errors);
            this.isLoading = false
          });
      }
    }
  },
  apollo: {
    meals() {
      return {
        query: MealsQuery
      };
    }
  }
};
</script>

<style lang="scss">
.vs__search,
.vs__search:focus {
  margin: 25px 0 0;
}
</style>
