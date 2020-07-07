<template>
  <div>
    <div v-on-clickaway="away">
      <span>
        <button
          v-if="isAuthenticated && user"
          @click="isDropDown = !isDropDown"
          type="button"
          class="inline-flex justify-center w-full rounded-md px-4 py-2 text-sm leading-5 font-medium text-gray-700 dark:text-gray-400 hover:text-gray-500 focus:outline-none active:text-gray-800"
        >
          {{user.name}}
          <svg
            class="-mr-1 ml-2 h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <span v-else class="w-48 block">
          <nuxt-link
            to="/login"
            class="inline-flex justify-center w-full rounded-md px-4 py-2 text-sm leading-5 font-medium text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-500 focus:outline-none active:text-gray-800"
          >Register / Login</nuxt-link>
        </span>
      </span>
    </div>
    <div
      class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg z-20"
      v-show="isDropDown"
    >
      <div
        class="rounded-md bg-white dark:bg-dark-mode-light-1 shadow-xs text-gray-700 dark:text-gray-400"
      >
        <div v-if="isAuthenticated">
          <nuxt-link
            v-if="user"
            :to="`/${user.username}`"
            class="block px-4 py-2 text-sm leading-5 hover:bg-gray-100 hover:text-gray-900 dark:hover:text-gray-200 dark:hover:bg-dark-mode-light focus:outline-none dark:focus:bg-dark-mode-light dark:focus:text-gray-200 focus:bg-gray-100 focus:text-gray-900"
          >Profile</nuxt-link>
          <nuxt-link
            to="/add-recipe"
            class="block px-4 py-2 text-sm leading-5 hover:bg-gray-100 hover:text-gray-900 dark:hover:text-gray-200 dark:hover:bg-dark-mode-light focus:outline-none dark:focus:bg-dark-mode-light dark:focus:text-gray-200 focus:bg-gray-100 focus:text-gray-900"
          >Add Recipe</nuxt-link>
          <a
            href="#"
            class="block px-4 py-2 text-sm leading-5 hover:bg-gray-100 hover:text-gray-900 dark:hover:text-gray-200 dark:hover:bg-dark-mode-light focus:outline-none dark:focus:bg-dark-mode-light dark:focus:text-gray-200 focus:bg-gray-100 focus:text-gray-900"
          >Setting</a>
          <button
            @click="logout"
            type="submit"
            class="block w-full text-left px-4 py-2 text-sm leading-5 hover:bg-gray-100 hover:text-gray-900 dark:hover:text-gray-200 dark:hover:bg-dark-mode-light focus:outline-none dark:focus:bg-dark-mode-light dark:focus:text-gray-200 focus:bg-gray-100 focus:text-gray-900"
          >Sign out</button>
        </div>
      </div>
    </div>
    <client-only>
      <Keypress key-event="keydown" :key-code="27" @success="isDropDown = false" />
    </client-only>
  </div>
</template>

<script>

export default {
  props: ['user'],
  components: {
    Keypress: () => import("vue-keypress")
  },
  data() {
    return {
      isDropDown: false
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters["user/isAuthenticated"];
    }
  },
  methods: {
    away () {
      this.isDropDown = false
    },
    logout() {
      this.$store.dispatch("user/removeToken");
    }
  }
};
</script>
