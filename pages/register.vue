<template>
  <div>
    <div
      class="min-h-screen flex justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div class="max-w-md w-full" v-if="!success">
        <div>
          <!-- <img
            class="mx-auto h-12 w-auto"
            src="/img/logos/workflow-mark-on-white.svg"
            alt="Workflow"
          /> -->
          <h2
            class="mt-6 font-medium mb-5 text-base leading-9 font-normal text-gray-800"
          >
            Please the from below to register
          </h2>
        </div>

        <form class="mt-3" @submit.prevent="onSubmit" v-if="!isAuthenticated">
          <input type="hidden" name="remember" value="true" />
          <div class="rounded-md shadow-sm">
            <div>
              <input
                aria-label="Full Name"
                name="name"
                type="text"
                v-model="data.name"
                required
                class="appearance-none rounded-none relative block w-full p-3 border border-gray-300 -mt-3 placeholder-gray-500 text-gray-900 focus:outline-none focus:bg-gray-100 focus:z-10 sm:leading-5"
                placeholder="Full Name *"
              />
            </div>
            <!-- field -->
            <div class="relative">
              <input
                aria-label="Email address"
                name="email"
                type="email"
                @input="checkEmailIfValid"
                v-model="data.email"
                required
                class="appearance-none rounded-none relative block w-full p-3 border border-t-0 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:bg-gray-100 focus:z-10 sm:leading-5"
                placeholder="Email address *"
              />
              <p
                v-if="emailError"
                class="absolute font-medium tracking-wide right-0 text-xs pr-2 flex items-center h-full top-0 text-red-500"
              >
                {{ emailError }}
              </p>
            </div>
            <!-- field -->
            <div class="-mt-px relative">
              <input
                @input="checkIfPasswordSame"
                aria-label="Password"
                name="password"
                v-model="data.password"
                type="password"
                required
                class="border-gray-300 placeholder-gray-500 appearance-none rounded-none relative block w-full p-3 border text-gray-900 focus:outline-none focus:bg-gray-100 focus:z-10 sm:leading-5"
                placeholder="Password *"
              />
            </div>
            <!-- field -->
            <div class="-mt-px relative">
              <input
                @input="checkIfPasswordSame"
                aria-label="Confirm Password"
                name="Confirm password"
                v-model="data.confirm_password"
                type="password"
                required
                class="border-gray-300 placeholder-gray-500 appearance-none rounded-none relative block w-full p-3 border text-gray-900 focus:outline-none focus:bg-gray-100 focus:z-10 sm:leading-5"
                placeholder="Confirm Password *"
              />
              <p
                v-if="passwordError"
                class="absolute font-medium tracking-wide right-0 text-xs pr-2 flex items-center h-full top-0 text-red-500"
              >
                {{ passwordError }}
              </p>
            </div>
            <!-- field -->
            <!-- <div class="-mt-px relative">
              <textarea
                aria-label="About"
                name="about"
                rows="5"
                v-model="data.about"
                type="password"
                class="border-gray-300 placeholder-gray-500 appearance-none rounded-none relative block w-full p-3 border text-gray-900 rounded-b-md focus:outline-none focus:bg-gray-100 focus:z-10 sm:leading-5"
                placeholder="Write a few lines about your self"
              >
              </textarea>
            </div> -->
            <!-- field -->
          </div>

          <div class="mt-6">
            <button
              type="submit"
              :disabled="!isValidate"
              :class="
                isValidate
                  ? 'cursor-pointer'
                  : 'cursor-not-allowed opacity-50'
              "
              class="relative block w-full py-2 px-3 border border-transparent rounded-md text-white font-semibold bg-theme-yellow hover:bg-theme-yellow-light focus:bg-theme-yellow-dark focus:outline-none sm:leading-5"
            >
              Register
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
                >Already have an account</span
              >
            </div>
          </div>

          <div class="mt-6">
            <nuxt-link
              to="/login"
              class="block w-full text-center py-2 px-3 border border-gray-300 rounded-md text-gray-900 font-medium hover:border-gray-400 focus:outline-none focus:border-gray-400 sm:leading-5"
            >
              Login
            </nuxt-link>
          </div>
        </div>
        <div
          class="text-red-600 mt-5 border border-red-500 p-3 inline-block w-full rounded bg-red-100"
          v-if="error"
        >
          <p class="mb-1">
            Something went wrong please try again!
          </p>
          <ul class="list-disc ml-5">
            <li>Fill all the required fields.</li>
            <li>Make sure the confirmation passwrod is same.</li>
          </ul>

        </div>
      </div>
      <div class="verify-email" v-else>
        <div class="">
          <h1 class="text-3xl mb-2 text-gray-900">Check your inbox</h1>
          <div class="text-gray-700">
            <p>
              We've sent an email to
              <span class="font-bold"> {{ data.email }} </span> click the link
              in the email to verify your email address.
            </p>
            <p>
              If you cannot find the verification email in inbox, check the other places it might be.
              like your junk, spam, social or other folders
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import authenticateUserGql from "~/gql/mutations/authenticateUser.gql";
import GetUserQuery from "~/gql/queries/me.gql";
import _ from "lodash";
export default {
  middleware: ["isNotAuth"],
  head() {
    return {
      title: "Register | Chatfata.com"
    };
  },
  data() {
    return {
      submitting: false,
      data: {},
      image: null,
      isEmailValid: false,
      isPasswordValidate: false,
      emailError: null,
      passwordError: null,
      username: null,
      success: false
    };
  },
  // created() {
  // console.log("This component's unique id is: " + this.uid);
  // },

  computed: {

    isValidate () {
      if (this.isEmailValid && this.isPasswordValidate) {
        return true
      }else {
        return false
      }
    },
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
    generateImage: function() {
      let url = this.image.generateDataUrl();
      if (!url) {
        this.$vToastify.error("Please select profile image!");
        return false;
      }
      this.data.avatar = url;
      return true;
    },

    checkIfPasswordSame () {
      // console.log(this.data.password)
      // console.log(this.data.confirm_password)
      if (this.data.password !== this.data.confirm_password) {
        this.passwordError = "Password is not same"
        this.isPasswordValidate = false
        return false
      } else {
        this.passwordError = null
        this.isPasswordValidate = true
        return true
      }
    },

    validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    checkEmailIfValid: _.debounce(function(e) {
      let checkEmail = this.validateEmail(this.data.email);
      if (!checkEmail) {
        this.emailError = "inValid Email Address";
      } else {
        this.emailError = null;
        this.$store
          .dispatch("user/checkEmailIfValid", {
            email: this.data.email
          })
          .then(response => {
            if (!response.data.user) {
              this.isEmailValid = true;
              this.username = response.data.username;
              this.emailError = null;
            } else {
              this.isEmailValid = false;
              this.emailError = "Email already taken";
            }
          });
      }
    }, 500),
    onSubmit() {
      this.submitting = true;
      this.$store
        .dispatch("user/registerUser", {
          name: this.data.name,
          username: this.username,
          email: this.data.email,
          password: this.data.password,
          confirm_password: this.data.confirm_password
        })
        .then(response => {
          if (response.status === 200) {
            this.success = true;
          }
        })

      this.submitting = false;
    },
    resendMail() {
      this.submitting = true;
      this.$store
        .dispatch("user/sendVerificationMail", this.$apolloHelpers.getToken())
        .then(response => {
          console.log(response);
          // if (response.status === 200) {
            // this.success = true;
          // }
        });
      this.submitting = false;
    }

  }
};
</script>
