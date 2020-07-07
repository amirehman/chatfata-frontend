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
        <form
          @submit.prevent="formSubmit"
          class="flex flex-wrap lg:flex-no-wrap"
        >
          <div class="w-full lg:w-4/5">
            <div class="form-element mb-5">
              <div>
                <label
                  for="title"
                  class="block text-base leading-5 font-medium tracking-wide text-gray-700 mb-1"
                  >Title
                </label>
                <div class="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="title"
                    required
                    v-model="recipe.title"
                    class="h-10 bg-white dark:bg-dark-mode border border-gray-300 dark:border-gray-700 rounded p-4 mr-4 w-full text-gray-800 dark:text-gray-400 text-base focus:outline-none focus:border-gray-400"
                  />
                </div>
              </div>
              <p class="text-base text-theme-yellow mt-2" v-if="errors">
                {{ errors.title }}
              </p>
            </div>
            <!-- form element -->

            <div class="form-element mb-5">
              <label class="block">
                <span class="block text-base leading-5 font-medium tracking-wide text-gray-700 mb-1"
                  >Description</span
                >
              </label>
              <recipe-editor v-model="recipe.detail" />
            </div>
            <!-- form element -->

            <div class="form-element mb-5">
              <label class="block text-base leading-5 font-medium tracking-wide text-gray-700 mb-1">Meal</label>
              <client-only>
                <v-select
                  label="title"
                  multiple
                  required
                  class="dark:text-gray-400"
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

            <div class="flex items-center flex-wrap sm:flex-no-wrap">
              <div class="form-element mb-5 w-full mr-0 sm:mr-5">
                <label class="block text-base leading-5 font-medium tracking-wide text-gray-700 mb-1"
                  >Difficulty</label
                >
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
              <div class="form-element mb-5 w-full recep-input-number">
                <label class="block text-base leading-5 font-medium tracking-wide text-gray-700 mb-1">Serves</label>
                <client-only>
                  <el-input-number
                    v-model="recipe.serves"
                    :min="1"
                    :max="10"
                  ></el-input-number>
                </client-only>
              </div>
              <!-- form element -->
            </div>
            <div class="form-element mb-5">
              <label class="block mb-2 text-base text-center md:text-left leading-5 font-medium tracking-wide text-gray-700"
                >Select Cuisine</label
              >
              <div class="flex flex-wrap sm:flex-no-wrap">
                <div class="w-full mr-0 sm:mr-5">
                  <label class="block text-base leading-5 font-medium tracking-wide text-gray-700 mb-1"
                    >Country</label
                  >
                  <client-only>
                    <v-select
                      label="name"
                      required
                      class="custom-select dark:text-gray-400"
                      :reduce="country => country.id"
                      v-model="recipe.country"
                      :options="countries"
                      @input="onCountrySelect"
                    ></v-select>
                  </client-only>
                  <p class="text-base text-theme-yellow mt-2" v-if="errors">
                    {{ errors.country }}
                  </p>
                </div>
                <div class="w-full mt-5 md:mt-0">
                  <label class="block text-base leading-5 font-medium tracking-wide text-gray-700 mb-1">State</label>
                  <client-only>
                    <v-select
                      label="name"
                      class="custom-select dark:text-gray-400"
                      :reduce="state => state.id"
                      v-model="recipe.state"
                      :options="states"
                      :disabled="!states"
                    ></v-select>
                  </client-only>
                </div>
              </div>
            </div>
            <!-- form element -->

            <div class="form-element mb-5">
              <label class="block">
                <span class="block text-base leading-5 font-medium tracking-wide text-gray-700 mb-1">
                  Preparation time
                  <small>(minuts)</small>
                </span>
                <input
                  type="number"
                  required
                  v-model="recipe.prep_time"
                  class="h-10 bg-white dark:bg-dark-mode border border-gray-300 dark:border-gray-700 rounded p-4 mr-4 w-full text-gray-800 dark:text-gray-400 text-base focus:outline-none focus:border-gray-400"
                />
              </label>
              <p class="text-base text-theme-yellow mt-2" v-if="errors">
                {{ errors.prep_time }}
              </p>
            </div>
            <!-- form element -->

            <div class="form-element mb-5">
              <label class="block">
                <span class="block text-base leading-5 font-medium tracking-wide text-gray-700 mb-1">Video URL</span>
                <input
                  type="url"
                  v-model="recipe.video"
                  class="h-10 bg-white dark:bg-dark-mode border border-gray-300 dark:border-gray-700 rounded p-4 mr-4 w-full text-gray-800 dark:text-gray-400 text-base focus:outline-none focus:border-gray-400"
                />
              </label>
            </div>
            <!-- form element -->

            <div class="form-element mb-5 hidden md:block">
              <Loader v-if="isLoading" />
              <input
                v-else
                type="submit"
                value="Save & Next"
                class="h-10 focus:text-gray-800 focus:border-theme-yellow hover:bg-theme-yellow hover:border-theme-yellow hover:text-white transition ease-in-out duration-300 cursor-pointer w-auto text-base border border-gray-400 dark:border-gray-700 rounded bg-transparent px-5 focus:bg-gray-100 dark:focus:bg-dark-mode-light focus:outline-none"
              />
            </div>
            <!-- form element -->
          </div>
          <!-- col -->

          <div class="w-full lg:w-1/2">
            <div class="inner md:pl-10">
              <div class="add-recipe form-element mb-5">
                <label class="block">
                  <span class="mb-2 block text-base tracking-wide"
                    >Upload Thumbnail</span
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
                <Loader v-if="isLoading" />
                <input
                  v-else
                  type="submit"
                  value="Submit"
                  class="h-10 hover:bg-theme-yellow hover:border-theme-yellow hover:text-white transition ease-in-out duration-300 cursor-pointer w-auto text-base border border-gray-400 dark:border-gray-700 rounded bg-transparent px-5 focus:bg-gray-100 dark:focus:bg-dark-mode-light focus:outline-none"
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
//Queries
import MealsQuery from "~/gql/queries/Meals";
import CountiesQuery from "~/gql/queries/country/Countries";
import StateByCountryQuery from "~/gql/queries/country/StatesByCountry";

export default {
  middleware: ["isAuth"],
  components: {
    RecipeEditor
  },
  data() {
    return {
      difficulty: ["easy", "medium", "difficult"],
      image: null,
      isLoading: false,
      errors: null,
      states: [],
      recipe: {
        title: "",
        detail: "",
        meals: [],
        country: null,
        serves: 2,
        state: null,
        difficulty: "",
        prep_time: "",
        image: {},
        video: ""
      }
    };
  },
  methods: {
    onCountrySelect() {
      let country = this.recipe.country;
      this.getStates(country);
    },
    async getStates(id) {
      this.states = await this.$apollo
        .query({
          query: StateByCountryQuery,
          variables: {
            country_id: id
          }
        })
        .then(({ data }) => data && data.states);
    },
    generateImage: function() {
      let url = this.image.generateDataUrl();
      if (!url) {
        this.$vToastify.error("Please select thumbnail first!");
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
            country: this.recipe.country,
            serves: this.recipe.serves,
            state: this.recipe.state,
            image: this.recipe.image
          })
          .then(res => {
            this.$store.commit("recipe/isUserImageSideBar", true);
            this.$store.commit("user/editingMode", true);
            this.$router.push(`/recipes/${res.data}`);
            this.isLoading = false;
            this.recipe = [];
          })
          .catch(error => {
            this.fillErrors(error.response.data.errors);
            this.isLoading = false;
          });
      }
    }
  },
  apollo: {
    meals() {
      return {
        query: MealsQuery
      };
    },
    countries() {
      return {
        query: CountiesQuery
      };
    }
  }
};
</script>

<style lang="scss">
.vs__search,
.vs__search:focus {
  margin: 12px 0 0;
}
</style>
