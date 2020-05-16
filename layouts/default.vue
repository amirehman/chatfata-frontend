<template>
  <div class="dark:bg-dark-mode dark:text-gray-400">
    <SideNav />
    <Header />

    <nuxt />

    <Footer />
  </div>
</template>

<script>
import SideNav from "~/components/templates/SideNav.vue";
import Header from "~/components/templates/Header.vue";
import Footer from "~/components/templates/Footer.vue";

export default {
  data() {
    return {};
  },
  components: {
    SideNav,
    Header,
    Footer
  },
  mounted() {
    this.$store.commit("user/receiveToken", this.$apolloHelpers.getToken() || null);
    this.$store.dispatch("user/getUser");
  },
  computed: {
    theme() {
      return this.$store.state.theme;
    }
  }
};
</script>
