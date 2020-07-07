<template>
  <div>
    <div
      class="min-h-screen flex justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div class="max-w-md w-full">
        <div>
          <img
            class="mx-auto h-12 w-auto"
            src="/img/logos/workflow-mark-on-white.svg"
            alt="Workflow"
          />
          <h2
            class="mt-6 text-center text-base leading-9 font-normal text-gray-800"
          >
            Sign in to your account
          </h2>
        </div>
        <form class="mt-3" @submit.prevent="onSubmit" v-if="!isAuthenticated">
          <input type="hidden" name="remember" value="true" />
          <div class="rounded-md shadow-sm">
            <div>
              <input
                aria-label="Email address"
                name="email"
                type="email"
                v-model="credentials.username"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:bg-gray-100 focus:z-10 sm:text-sm sm:leading-5"
                placeholder="Email address"
              />
            </div>
            <div class="-mt-px relative">
              <input
                aria-label="Password"
                name="password"
                v-model="credentials.password"
                type="password"
                required=""
                class="border-gray-300 placeholder-gray-500 appearance-none rounded-none relative block w-full px-3 py-2 border text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                placeholder="Password"
              />
              <div
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                <nuxt-link
                  to="/forgot-password"
                  class="text-gray-900 underline"
                  >Forgot?</nuxt-link>
              </div>
            </div>
          </div>

          <div class="mt-6">
            <button
              type="submit"
              class="relative block w-full py-2 px-3 border border-transparent rounded-md text-white font-semibold bg-theme-yellow hover:bg-theme-yellow-light focus:bg-theme-yellow-dark focus:outline-none sm:text-sm sm:leading-5"
            >
              <span class="absolute left-0 inset-y pl-3">
                <svg
                  class="h-5 w-5 text-gray-100"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </span>
              Log in
            </button>
          </div>
        </form>

        <div class="mt-6 __web-inspector-hide-shortcut__">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm leading-5">
              <span class="px-2 bg-white text-gray-600"
                >Don't have an account?</span
              >
            </div>
          </div>

          <div class="mt-6">
            <nuxt-link
              to="/register"
              class="block w-full text-center py-2 px-3 border border-gray-300 rounded-md text-gray-900 font-medium hover:border-gray-400 focus:outline-none focus:border-gray-400 sm:text-sm sm:leading-5"
            >
              Create new account
            </nuxt-link>
          </div>
        </div>
        <div
          class="text-red-600 mt-5 border border-red-500 p-3 inline-block w-auto rounded bg-red-100"
          v-if="error"
        >
          User credentials are wrong! <br />
          please try again with a correct email and password.
        </div>
      </div>
    </div>
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
      credentials: {},
      prevRoute: null
    };
  },
    beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.prevRoute = from;
    });
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
        });
      this.submitting = false;
    },
    onLogout() {
      this.$store.dispatch("user/removeToken");
    }
  }
};
</script>
