<template>
  <div>
    <section class="page-section lg:mt-5 py-6">
      <div class="max-w-6xl xxl:max-w-screen-xl mx-auto px-5 lg:px-0">
        <div class="section-header mb-5">
          <h1 class="text-3xl text-gray-800">
            <span class="text-gray-800 dark:text-gray-200">{{user}} Edit Profile</span>
          </h1>
        </div>
        <!-- section header end -->

        <div>This page is protected with a middleware which checks if the gql request is authenticated</div>
      </div>
      <!-- container end -->
    </section>
    <!-- about section end -->
  </div>
</template>


<script>
import gql from "graphql-tag";


export default {
   middleware: ['isAuth'],
  head() {
    return {
      title: "Edit Profile"
    };
  },
  data() {
    return {};
  },
  computed: {
    isAuthenticated: function() {
      return this.$store.state.user.isAuthenticated;
    },
    user: function () {
      if(this.isAuthenticated){
        return this.$store.state.user.logedInUser
      }
    }
  }
  // apollo: {
  //   me() {
  //     return {
  //       query: MeUserQuery,
  //     };
  //   }
  // }
};
</script>
