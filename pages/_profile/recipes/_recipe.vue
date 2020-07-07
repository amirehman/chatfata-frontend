<template>
  <div>
    <section class="recipes-section lg:mt-5 px-5 lg:px-0">
      <ProfileHeader :user="recipe.author" />
      <div class="max-w-6xl xxl:max-w-screen-xl mx-auto">
        <div class="recipe-edit-form-wrapper mb-6 md:mb-12">
          <form
            @submit.prevent="formSubmit"
            class="flex flex-wrap lg:flex-no-wrap"
          >
            <div class="w-full lg:w-4/5">
              <div class="form-element mb-5">
                <label class="block">
                  <span class="mb-1 block text-base tracking-wide">Title</span>
                  <input
                    type="text"
                    v-model="recipe.title"
                    class="h-10 bg-white dark:bg-dark-mode border border-gray-300 dark:border-gray-800 rounded p-4 mr-4 w-full text-gray-800 dark:text-gray-400 text-base focus:outline-none focus:border-gray-400"
                  />
                </label>
                <p class="text-base text-theme-yellow mt-2" v-if="errors">
                  {{ errors.title }}
                </p>
              </div>
              <!-- form element -->

              <div class="form-element mb-5">
                <label class="block">
                  <span class="mb-1 block text-base tracking-wide"
                    >Description</span
                  >
                </label>
                <!-- <recipe-editor v-model="recipe.body" /> -->
                <client-only>
                  <wysiwyg v-model="recipe.body" class="text-gray-800" />
                </client-only>
              </div>
              <!-- form element -->

              <div class="form-element mb-5">
                <label class="mb-1 block text-base tracking-wide">Meal</label>
                <client-only>
                  <v-select
                    label="title"
                    multiple
                    required
                    class="custom-select dark:text-gray-400"
                    :reduce="recipe => recipe.id"
                    v-model="updatedMeals"
                    :options="meals"
                  ></v-select>
                </client-only>
                <p class="text-base text-theme-yellow mt-2" v-if="errors">
                  {{ errors.meals }}
                </p>
              </div>
              <!-- form element -->

              <div class="flex">
                <div class="form-element mb-5 w-full mr-5">
                  <label class="mb-1 block text-base tracking-wide"
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
                  <label class="mb-1 block text-base tracking-wide">Serves</label>
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
                <label class="mb-1 block text-base tracking-wide"
                  >Select Cuisine</label
                >
                <div class=" flex">
                  <div class="w-full mr-5">
                    <label class="mb-1 block text-base tracking-wide"
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
                  <div class="w-full">
                    <label class="mb-1 block text-base tracking-wide"
                      >State</label
                    >
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
                  <span class="mb-1 block text-base tracking-wide">
                    Preparation time
                    <small>(minuts)</small>
                  </span>
                  <input
                    type="number"
                    required
                    v-model="recipe.prep_time"
                    class="h-10 bg-white dark:bg-dark-mode border border-gray-300 dark:border-gray-800 rounded p-4 mr-4 w-full text-gray-800 dark:text-gray-400 text-base focus:outline-none focus:border-gray-400"
                  />
                </label>
                <p class="text-base text-theme-yellow mt-2" v-if="errors">
                  {{ errors.prep_time }}
                </p>
              </div>
              <!-- form element -->

              <div class="form-element mb-5">
                <label class="block">
                  <span class="mb-1 block text-base tracking-wide"
                    >Video URL</span
                  >
                  <input
                    type="url"
                    v-model="recipe.video"
                    class="h-10 bg-white dark:bg-dark-mode border border-gray-300 dark:border-gray-800 rounded p-4 mr-4 w-full text-gray-800 dark:text-gray-400 text-base focus:outline-none focus:border-gray-400"
                  />
                </label>
              </div>
              <!-- form element -->

              <div class="form-element mb-5">
                <label class="block">
                  <span class="mb-1 block text-base tracking-wide"
                    >Add Note / Tips</span
                  >
                  <client-only>
                    <wysiwyg v-model="recipe.ingredient_note" />
                  </client-only>
                </label>
              </div>
              <!-- form element -->

              <div class="form-element mb-5 hidden md:block">
                <loader v-if="isLoading" />
                <input
                  v-else
                  type="submit"
                  value="Update"
                  class="h-10 focus:text-gray-800 focus:border-theme-yellow hover:bg-theme-yellow hover:border-theme-yellow hover:text-white transition ease-in-out duration-300 cursor-pointer w-auto text-base border border-gray-400 dark:border-gray-700 rounded bg-transparent px-5 focus:bg-gray-100 dark:focus:bg-dark-mode-light focus:outline-none"
                />
              </div>
              <!-- form element -->
            </div>
            <!-- col -->

            <div class="w-full lg:w-1/2">
              <div class="inner md:pl-10">
                <div
                  class="current-thumbnail mb-5"
                  v-if="recipe.image.length < 100"
                >
                  <span class="font-medium text-base mb-2 block"
                    >Current Thumbnail</span
                  >
                  <v-lazy-image
                    :alt="recipe.title"
                    class="w-64 block object-cover rounded"
                    :src="`${storageUrl}${recipe.image}`"
                    :src-placeholder="
                      `${storageUrl}${recipe.image.replace(
                        /(\.[\w\d_-]+)$/i,
                        '-small$1'
                      )}`
                    "
                  />
                </div>
                <!-- current thumbnail -->
                <div class="add-recipe form-element mb-5">
                  <label class="block">
                    <span class="mb-2 block text-base tracking-wide"
                      >Update Thumbnail</span
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
                        v-model="updatedThumb"
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
                    value="Update"
                    class="h-10 hover:bg-theme-yellow hover:border-theme-yellow hover:text-white transition ease-in-out duration-300 cursor-pointer w-auto text-base border border-gray-400 dark:border-gray-700 rounded bg-transparent px-5 focus:bg-gray-100 dark:focus:bg-dark-mode-light focus:outline-none"
                  />
                </div>
                <!-- form element -->
              </div>
              <!-- inner -->
            </div>
          </form>
        </div>
        <!-- channels recipies wrappper end -->
      </div>
    </section>
  </div>
</template>

<script>
import gql from "graphql-tag";

import RecipeQuery from "~/gql/queries/Recipe";
import MealsQuery from "~/gql/queries/Meals";
import CountiesQuery from "~/gql/queries/country/Countries";
import StateByCountryQuery from "~/gql/queries/country/StatesByCountry";

import ProfileHeader from "~/components/profile/ProfileHeader";
import Loader from "~/components/templates/Loader";
import RecipeEditor from "~/components/templates/RecipeEditor";

export default {
  scrollToTop: true,
  middleware: ["isAuth"],
  components: {
    ProfileHeader,
    Loader,
    RecipeEditor
  },
  data() {
    return {
      difficulty: ["easy", "medium", "difficult"],
      isLoading: false,
      errors: null,
      recipe: {},
      states: [],
      updatedThumb: null,
      newMeals: null,
      newCountry: null,
      newState: null
    };
  },

  computed: {
    updatedMeals: {
      get() {
        return (this.newMeals = this.recipe.meals.map(e => {
          return e.id;
        }));
      },
      set(newValue) {
        return (this.newMeals = newValue);
      }
    },
    // updatedCountry: {
    //   get() {
    //     return (this.newCountry = this.recipe.country.map(e => {
    //       return e.id;
    //     }));
    //   },
    //   set(newValue) {
    //     return (this.newCountry = newValue);
    //   }
    // },
    // updatedState: {
    //   get() {
    //     return (this.newState = this.recipe.state.map(e => {
    //       return e.id;
    //     }));
    //   },
    //   set(newValue) {
    //     return (this.newState = newValue);
    //   }
    // },
    storageUrl() {
      return this.$store.state.storageUrl;
    },
    isAuthenticated() {
      return this.$store.getters["user/isAuthenticated"];
    },
    isChannel() {
      return this.$store.getters["user/isChannel"];
    },
    currentUser() {
      return this.$store.state.user.loggedInUser;
    },
    isValidUser() {
      if (this.currentUser) {
        return this.user.id == this.currentUser.id ? true : false;
      }
    },
    isThisProfileChannel() {
      if (this.user.roles) {
        let roles = this.user.roles.map(e => {
          return e.name;
        });
        return roles.includes("channel");
      }
    }
  },
  methods: {
    onCountrySelect() {
      this.recipe.state = null;
      let country = this.recipe.country;
      // console.log(country)
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
      this.recipe.image = this.updatedThumb.generateDataUrl();
      return true;
    },
    formSubmit() {
      if (this.updatedThumb.$data.imageSet) {
        this.generateImage();
      }
      this.isLoading = true;
      this.$store
        .dispatch("recipe/updateRecipe", {
          id: this.recipe.id,
          title: this.recipe.title,
          detail: this.recipe.body,
          meals: this.newMeals,
          difficulty: this.recipe.difficulty,
          prep_time: this.recipe.prep_time,
          video: this.recipe.video,
          country: this.recipe.country,
          serves: this.recipe.serves,
          state: this.recipe.state,
          note: this.recipe.ingredient_note,
          image: this.recipe.image
        })
        .then(res => {
          this.$vToastify.success("Recipe Updated");
          this.isLoading = false;
        })
        .catch(error => {
          this.fillErrors(error.response.data.errors);
          this.isLoading = false;
        });
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
  },
  async asyncData({ app, params }) {
    const client = app.apolloProvider.defaultClient;

    const recipe = await client
      .query({
        query: RecipeQuery,
        prefech: true,
        variables: {
          slug: params.recipe
        }
      })
      .then(({ data }) => data && data.recipe);
    return {
      recipe
    };
  }
};
</script>
