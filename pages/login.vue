<template>
  <div>
    <section class="page-section lg:mt-5 py-6">
      <div class="max-w-6xl xxl:max-w-screen-xl mx-auto px-5 lg:px-0">
        <div class="section-header mb-5">
          <h1 class="text-3xl text-gray-800">
            <span class="text-gray-800 dark:text-gray-200">Login</span>
          </h1>
        </div>
        <!-- section header end -->

        <div>
          <form @submit.prevent="onSubmit" v-if="!isAuthenticated">
            <div class="mt-4">
              <label class="block mb-2">Email</label>
              <input
                class="border dark:bg-dark-mode dark:border-gray-700 focus:outline-none focus:border-gray-500 dark:focus:bg-dark-mode-light dark:focus:border-gray-700 p-2 rounded w-full md:w-25rem focus:bg-gray-100"
                type="text"
                v-model="credentials.username"
                required
              />
            </div>
            <div class="mt-4">
              <label class="block mb-2">Password</label>
              <input
                class="border dark:bg-dark-mode dark:border-gray-700 focus:outline-none focus:border-gray-500 dark:focus:bg-dark-mode-light dark:focus:border-gray-700 p-2 rounded w-full md:w-25rem focus:bg-gray-100"
                type="password"
                v-model="credentials.password"
                required
              />
            </div>
            <div v-if="submitting">Submitting ....</div>
            <button
              class="mt-5 border dark:bg-dark-mode dark:border-gray-700 focus:outline-none dark:focus:bg-dark-mode-light dark:focus:border-gray-700 dark:hover:bg-dark-mode-light focus:border-gray-500 rounded px-5 py-2 hover:bg-gray-200 pb-1"
              type="submit"
            >
              Submit
            </button>
          </form>
          <div class="text-red-600 mt-5 border border-red-500 p-3 inline-block w-auto rounded bg-red-100" v-if="error">
            User credentials are wrong! <br />
            please try again with a correct email and password.
          </div>
        </div>
      </div>
      <!-- container end -->
    </section>
    <!-- about section end -->
  </div>
</template>

<script>
import authenticateUserGql from "~/gql/mutations/authenticateUser.gql";
import GetUserQuery from "~/gql/queries/me.gql";

export default {
  middleware: ["isNotAuth"],
  head() {
    return {
      title: "Login | Chatfata.com"
    };
  },
  data() {
    return {
      submitting: false,
      credentials: {
        username: "info@shallowfry.com",
        password: "Letme@in"
      }
    };
  },
  computed: {
    error() {
      return this.$store.state.user.error;
    },
    isAuthenticated() {
      return this.$store.getters["user/isAuthenticated"];
    },
    user() {
      return this.$store.state.user.loggedInUser;
    }
  },
  methods: {
    async getUser() {
      const user = await this.$apollo.query({
        query: GetUserQuery
      });
      return this.$store.commit("user/mutateLogedInUser", user.data.me);
    },
    onSubmit() {
      this.submitting = true;
      this.$store
        .dispatch("user/retrieveToken", {
          username: this.credentials.username,
          password: this.credentials.password
        })
        .then(response => {
          this.$store.dispatch("user/getUser");
        })
        this.submitting = false

    },
    onLogout() {
      this.$store.dispatch("user/removeToken");
    }
  }
};
</script>
