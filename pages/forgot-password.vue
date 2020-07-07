<template>
  <div>
    <div
      class="min-h-screen flex justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div>
        <div class="max-w-md w-full">
        <div>
          <img
            class="mx-auto h-12 w-auto"
            src="/img/logos/workflow-mark-on-white.svg"
            alt="Workflow"
          />
          <h2
            class="mt-6 text-center text-2xl leading-9 font-normal text-gray-800"
          >
            Reseting your password
          </h2>
          <p class="text-center my-4 text-gray-800 text-sm">To reset your password, please input your email address below and hit "reset". We'll then. send you an email with instructions to follow. </p>
        </div>
        <form class="mt-3" @submit.prevent="onSubmit">
          <input type="hidden" name="remember" value="true" />
          <div class="rounded-md shadow-sm">
            <div>
              <input
                aria-label="Email address"
                name="email"
                type="email"
                v-model="email"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:bg-gray-100 focus:z-10 sm:text-sm sm:leading-5"
                placeholder="Email address"
              />
            </div>

          </div>

          <div class="mt-6">

            <Loader v-if="submitting" />
            <button
              v-else
              type="submit"
              class="relative block w-full py-2 px-3 border border-transparent rounded-md text-white font-semibold bg-theme-yellow hover:bg-theme-yellow-light focus:bg-theme-yellow-dark focus:outline-none sm:text-sm sm:leading-5"
            >
              Reset
            </button>
          </div>
        </form>

        </div>
        <div
          class="text-red-600 mt-5 border border-red-500 p-3 inline-block w-auto rounded bg-red-100"
          v-if="error"
        >
          User credentials are wrong! <br />
          please try again with a correct email and password.
        </div>
        <div
          class="text-gray-900 w-full mt-5 border border-gray-500 p-3 inline-block w-auto rounded bg-gray-100"
          v-if="message"
        >
          {{message}}
        </div>
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
      title: "Forgot Password | Chatfata.com"
    };
  },
  data() {
    return {
      submitting: false,
      credentials: {},
      email: null
    };
  },

  computed: {
    error() {
      return this.$store.state.user.error;
    },
    message() {
      return this.$store.state.user.message;
    },
  },
  methods: {
    onSubmit() {
      this.submitting = true;
      this.$store.commit("user/message", null)
      this.$store
        .dispatch("user/resetPassword", {
          email: this.email,
        }).then(response => {
          this.submitting = false;
        });

    },
  }
};
</script>
