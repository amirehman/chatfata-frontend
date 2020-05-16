<template>
  <div>
    <section class="add-recipe-section lg:mt-5 py-6">
      <div class="max-w-6xl xxl:max-w-screen-xl mx-auto px-5 lg:px-0">
        <div class="section-header mb-5">
          <h1 class="capitalize text-xl font-medium text-gray-900 dark:text-gray-300">Add New Recipe</h1>
        </div>
        <!-- section header end -->


      </div>
      <!-- container end -->
    </section>
    <!-- cotegories section end -->

    <section class="add-recipe-form-section mt-12 px-5 lg:px-0">
      <div class="max-w-6xl xxl:max-w-screen-xl mx-auto">

      </div>
      <!-- container end -->
    </section>

  </div>
</template>


<script>
import gql from "graphql-tag";


export default {
  middleware: ['isAuth'],
  data() {
    return {

    };
  },

};
</script>
