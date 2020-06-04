<template>
  <div>
    <section class="page-section lg:mt-5 py-6">
      <div class="max-w-6xl xxl:max-w-screen-xl mx-auto px-5 lg:px-0">
        <div v-if="!message" class="section-header mb-5">
          <h1 class="text-2xl text-gray-900">
            <span class="text-gray-800 dark:text-gray-200">Contact </span>
            <span class="text-gray-700">Chatfata.com</span>
          </h1>
        </div>
        <!-- section header end -->
        <div v-if="message">
          <div class="text-center">
            <span class="text-green-500">
              <svg
                class="w-16 h-16  mx-auto fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100.353 100.353"
              >
                <g>
                  <path
                    d="M96.747 39.242a1.456 1.456 0 10-2.833.675c.766 3.212 1.155 6.604 1.155 10.083 0 24.85-20.67 45.067-46.078 45.067S2.913 74.85 2.913 50c0-24.852 20.67-45.07 46.078-45.07 10.119 0 19.785 3.202 27.952 9.26a1.456 1.456 0 001.735-2.339C70.006 5.417 59.74 2.018 48.991 2.018 21.977 2.018 0 23.542 0 50c0 26.456 21.977 47.98 48.991 47.98S97.982 76.456 97.982 50c0-3.705-.416-7.324-1.235-10.758z"
                  />
                  <path
                    d="M47.98 71.683c-.386 0-.756-.153-1.03-.426L19.637 43.948a1.456 1.456 0 012.059-2.06l26.223 26.219 49.538-55.486a1.456 1.456 0 112.173 1.94L49.066 71.197a1.455 1.455 0 01-1.045.486h-.041z"
                  />
                </g>
              </svg>
            </span>

            <div class="my-10">
              <h1 class="text-3xl mb-4">Thank You</h1>
              <p class="w-1/2 mx-auto">
                We have received you message and would like to thank you for
                writing to us. we will reply as soon as possible.
              </p>
            </div>

            <nuxt-link to="/">
              <img
                :src="`${storageUrl}/custom/logo1.png`"
                alt="logo"
                class="w-16 inline-block"
              />
            </nuxt-link>
          </div>
        </div>

        <form v-else @submit.prevent="submitForm" class="w-1/2 mt-10">
          <div class="form-element mb-5">
            <label class="block">
              <span class="mb-2 block text-lg tracking-wide"
                >Full Name
                <small class="text-xs text-gray-700">(required)</small>
              </span>
              <input
                type="text"
                v-model="form.name"
                class="block w-full text-lg border border-gray-400 dark:border-gray-700 rounded bg-transparent p-2 focus:bg-gray-100 dark:focus:bg-dark-mode-light focus:outline-none"
              />
            </label>
            <p class="text-base text-red-600 mt-2" v-if="errors">
              {{ errors.name }}
            </p>
          </div>
          <!-- form element -->

          <div class="form-element mb-5">
            <label class="block">
              <span class="mb-2 block text-lg tracking-wide"
                >Email
                <small class="text-xs text-gray-700">(required)</small></span
              >
              <input
                type="email"
                v-model="form.email"
                class="block w-full text-lg border border-gray-400 dark:border-gray-700 rounded bg-transparent p-2 focus:bg-gray-100 dark:focus:bg-dark-mode-light focus:outline-none"
              />
            </label>
            <p class="text-base text-red-600 mt-2" v-if="errors">
              {{ errors.email }}
            </p>
          </div>
          <!-- form element -->

          <div class="form-element mb-5">
            <label class="block">
              <span class="mb-2 block text-lg tracking-wide">Phone</span>
              <input
                type="number"
                v-model="form.phone"
                class="block w-full text-lg border border-gray-400 dark:border-gray-700 rounded bg-transparent p-2 focus:bg-gray-100 dark:focus:bg-dark-mode-light focus:outline-none"
              />
            </label>
          </div>
          <!-- form element -->

          <div class="form-element mb-5">
            <label class="block">
              <span class="mb-2 block text-lg tracking-wide"
                >Message
                <small class="text-xs text-gray-700">(required)</small></span
              >
            </label>
            <recipe-editor v-model="form.message" />
            <p class="text-base text-red-600 mt-2" v-if="errors">
              {{ errors.message }}
            </p>
          </div>

          <div class="form-element mt-5">
            <loader v-if="isLoading" />
            <input
              v-else
              type="submit"
              value="Submit"
              class="hover:bg-theme-yellow hover:border-theme-yellow hover:text-white transition ease-in-out duration-300 cursor-pointer w-auto text-lg border border-gray-400 dark:border-gray-700 rounded bg-transparent px-4 py-2 focus:bg-theme-yellow focus:text-white focus:border-theme-yellow dark:focus:bg-dark-mode-light focus:outline-none"
            />
          </div>
        </form>
      </div>

      <!-- container end -->
    </section>
    <!-- about section end -->
  </div>
</template>

<script>
import RecipeEditor from "~/components/templates/RecipeEditor";
import Loader from "~/components/templates/Loader";
export default {
  head: {
    title: "Contact Chatfata"
  },
  components: {
    RecipeEditor,
    Loader
  },
  data() {
    return {
      errors: null,
      form: {},
      isLoading: false,
      message: false
    };
  },
  computed: {
    storageUrl() {
      return this.$store.state.storageUrl;
    },
  },
  methods: {
    submitForm() {
      this.isLoading = true;
      this.$store
        .dispatch("forms/contactForm", {
          name: this.form.name,
          email: this.form.email,
          phone: this.form.phone,
          message: this.form.message
        })
        .then(res => {
          this.isLoading = false;
          this.$vToastify.success("Message successfully sent!");
          this.message = true
          this.form = [];
        })
        .catch(error => {
          this.fillErrors(error.response.data.errors);
          this.isLoading = false;
        });
    }
  }
};
</script>
