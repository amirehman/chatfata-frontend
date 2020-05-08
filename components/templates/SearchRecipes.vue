<template>
  <div>
    <div class="inner">
      <div class="search-input-wrapper text-center relative block mx-auto w-ful lg:w-1/2 relative">
        <span class="absolute h-full flex text-gray-500 items-center pl-4">
          <svg class="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path
              d="M12.9 14.32a8 8 0 111.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 108 2a6 6 0 000 12z"
            />
          </svg>
        </span>

        <span
          v-if="$apollo.queries.SearchRecipes.loading"
          class="absolute right-0 h-full flex text-gray-500 items-center pr-10"
        >
          <span class="spinner"></span>
        </span>

        <input
          @blur="searchModeOff"
          type="search"
          placeholder="Mutton Pulao, Biryani etc..."
          v-model="term"
          v-on:input="searchRecipes"
          class="search-input text-base tracking-widest font-normal text-gray-600 dark:text-gray-400 border border-1 border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none dark:focus:bg-dark-mode-light pl-16 p-3 w-full"
          :class="{'focus': searchMode}"
        />

        <div
          :class="searchMode ? 'block' : 'hidden'"
          class="search-results absolute left-0 top-0 bg-white dark:bg-dark-mode dark:border-gray-700 border border-t-0 w-full z-50 mt-3.1rem"
        >
          <template v-if="term.length < 1">
            <p class="py-6 text-gray-600 tracking-widest text-left pl-16 text-sm xxl:text-base">
              <span class="block">Start Typing to see the magic</span>
            </p>
          </template>
          <template v-else>
            <p
              v-if="SearchRecipes.length < 1"
              class="py-6 text-gray-600 tracking-widest text-left pl-16 text-sm"
            >
              <span class="block">0 Result found</span>
              <span class="block">Try different keywords</span>
            </p>
            <ul v-else>
              <li class="search-recipe-li" v-for="(recipe, u) in SearchRecipes" :key="u">
                <SearchRecipe :recipe="recipe" />
              </li>

            </ul>
          </template>
        </div>
      </div>
    </div>
    <client-only>
      <Keypress key-event="keydown" :key-code="27" @success="searchModeOff" />
    </client-only>
  </div>
</template>


<script>
import SearchRecipe from "./SearchRecipe";

import SearchQuery from "~/gql/queries/SearchRecipes";
import _ from "lodash";

export default {
  components: {
    Keypress: () => import("vue-keypress"),
    SearchRecipe
  },
  data() {
    return {
      searchMode: false,
      term: "",
      recipes: []
    };
  },
  watch: {
    term: function(value, old) {
      value.length > 2 ? this.searchMode : (this.searchMode = false);
    }
  },
  methods: {
    searchModeOff() {
      this.term = "";
      this.searchMode = false;
    },
    searchRecipes: _.debounce(function(e) {
      if (this.term.length > 2) {
        this.$apollo.queries.SearchRecipes.fetchMore({
          variables: {
            term: this.term
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            this.SearchRecipes = fetchMoreResult.SearchRecipes;
            this.searchMode = true;
          }
        });
      }
    }, 500)
  },
  apollo: {
    SearchRecipes() {
      return {
        query: SearchQuery,
        variables: {
          term: this.term
        }
      };
    }
  }
};
</script>


<style lang="scss" scoped>
.search-results {
  border-radius: 0px 0px 5px 5px;
}
.search-input {
  border-radius: 30px;
  &.focus {
    &:focus {
      border-bottom-color: transparent;
      border-radius: 30px 30px 0px 0px !important;
    }
  }
}
.search-recipe-li {
  &:last-child {
    a {
      border: none!important;
    }
  }
}



</style>
