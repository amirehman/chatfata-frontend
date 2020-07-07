<template>
  <div class="dark:bg-dark-mode dark:text-gray-400">
    <span
      v-if="$route.query.message"
      class="block p-3 bg-green-200 text-sm border-green-400 rounded-lg text-center"
    >
      {{ $route.query.message }}
    </span>

    <SideNav />
    <Header />

    <div
      class="not-verified text-center border border-l-0 border-r-0 py-10"
      v-if="!isVerified && isAuthenticated && warning"
    >
      <div class="w-full md:w-1/3 mx-auto relative">
        <span
          @click="warning = false"
          class="close-verify-message absolute right-0 top-0 -mr-16 w-8 h-8 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer border-red-500 border-2 rounded-full flex items-center justify-center"
        >
          <CloseIcon width="w-54" height="h-4" />
        </span>
        <h1
          class="text-xl leading-none md:text-3xl font-light md:font-light text-red-600 uppercase tracking-widest block mb-2"
        >
          Your email is not verified!
        </h1>
        <p class="mb-3 uppercase tracking-wide text-gray-900">
          Please verify your email address
        </p>
        <p class="mb-3 text-gray-900 text-sm">
          We have sent the verification mail to
          <b class="font-semibold" v-if="currentUser">{{ currentUser.email }}</b
          >. if you cannot find the verification email in your inbox, please
          check the junk/spam folder.
        </p>
        <p class="mb-3 text-gray-900 text-sm">
          if you did not receive the verification mail please click on the
          resend button
        </p>
        <button
          v-if="!submitting"
          @click="resendMail"
          class="mt-6 border px-5 py-2 rounded hover:bg-transparent border-yellow-500 bg-theme-yellow text-white hover:text-theme-yellow"
        >
          Resend Verification Mail
        </button>
        <Loader v-else />
      </div>
    </div>

    <nuxt />

    <Footer />
  </div>
</template>

<script>
import SideNav from "~/components/templates/SideNav.vue";
import Header from "~/components/templates/Header.vue";
import Footer from "~/components/templates/Footer.vue";

export default {
  head() {
    return {
      htmlAttrs: {
        class: this.isSideNav ? "overflow-hidden" : "overflow-auto"
      }
    };
  },
  data() {
    return {
      submitting: false,
      warning: true
    };
  },
  components: {
    SideNav,
    Header,
    Footer
  },
  mounted() {
    this.$store.commit(
      "user/receiveToken",
      this.$apolloHelpers.getToken() || null
    );
    this.$store.dispatch("user/getUser");
  },
  computed: {
    currentUser() {
      return this.$store.state.user.loggedInUser;
    },
    isAuthenticated() {
      return this.$store.getters["user/isAuthenticated"];
    },
    isVerified() {
      return this.$store.getters["user/isVerified"];
    },
    isSideNav() {
      return this.$store.state.sideNav;
    }
  },
  methods: {
    resendMail() {
      this.submitting = true;
      this.$store
        .dispatch("user/sendVerificationMail", this.$apolloHelpers.getToken())
        .then(response => {
          this.submitting = false;
        });
    }
  }
};
</script>
