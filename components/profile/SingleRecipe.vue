<template>
  <div>
    <div class=" flex items-center">
      <div class="ri-img w-24">
        <nuxt-link :to="`/recipes/${recipe.slug}`">
          <client-only>
            <v-lazy-image
              :alt="recipe.title"
              class="h-32 block object-cover"
              :src="`${storageUrl}${mediumImage}`"
              :src-placeholder="`${storageUrl}${smallImage}`"
            />
          </client-only>
        </nuxt-link>
      </div>
      <!-- ri img -->
      <div class="w-full recipe-title">
        <div
          class="flex xxl:text-lg text-base capitalize leading-tight font-normal text-gray-900 dark:text-gray-400"
        >
          <div class="w-full">
            <h3>
              <nuxt-link
                :to="`/${user.username}/recipes/${recipe.slug}`"
                class="transition duration-300 px-5 flex items-center h-32 block hover:bg-gray-200 dark:hover:bg-dark-mode-light"
                >{{ recipe.title }}</nuxt-link
              >
            </h3>
          </div>
        </div>
      </div>
      <!-- reciep title end -->

      <div
        class="w-48 relative recipe-actions"
        @click="ChangeStatus(recipe.status)"
      >
        <span
          class="relative cursor-pointer flex items-center justify-center h-32 block w-full hover:bg-gray-200 border-l dark:border-gray-700 text-gray-800 dark:text-gray-400 dark:hover:bg-dark-mode-light"
        >
          {{ recipe.status }}
          <span
            class="w-full h-2 absolute bottom-0 right-0"
            :class="
              checkStatus === 'PUBLISHED' ? 'bg-green-500' : 'bg-theme-yellow'
            "
          ></span>
        </span>
      </div>

      <div class="w-32 relative recipe-actions ">
        <nuxt-link
          :to="`/recipes/${recipe.slug}`"
          class="flex items-center justify-center h-32 block w-full hover:bg-gray-200 border-l dark:border-gray-700 text-gray-800 dark:text-gray-400 dark:hover:bg-dark-mode-light"
          title="See recipe on website"
        >
          <svg
            class="fill-corrent w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1000 1000"
          >
            <path
              d="M500 163.1c-183.8 0-398.1 122.5-490 367.5 91.9 183.8 275.6 306.3 490 306.3s398.1-122.5 490-306.3c-91.9-245-306.2-367.5-490-367.5zm0 612.5c-183.8 0-336.9-122.5-367.5-245 30.6-122.5 183.8-245 367.5-245s336.9 122.5 367.5 245c-30.6 122.5-183.7 245-367.5 245zm0-428.7c-19.1 0-36.4 3.8-53.6 8.6 31.6 14.4 53.6 45.9 53.6 83.3 0 50.7-41.2 91.9-91.9 91.9-37.3 0-68.9-22-83.3-53.6-4.8 17.2-8.6 34.5-8.6 53.6 0 101.4 82.3 183.8 183.8 183.8s183.8-82.3 183.8-183.8S601.4 346.9 500 346.9z"
            />
          </svg>
        </nuxt-link>
      </div>
    </div>
    <!-- inner end -->
  </div>
</template>

<script>
export default {
  props: ["recipe", "user"],
  data() {
    return {
      isLoading: false,
      status: null
    };
  },
  computed: {
    checkStatus: {
      get () {
        return this.recipe.status
      },
      set (newValue) {
        return newValue
      }
    },
    mediumImage() {
      return this.recipe.image.replace(/(\.[\w\d_-]+)$/i, "-medium$1");
    },
    smallImage() {
      return this.recipe.image.replace(/(\.[\w\d_-]+)$/i, "-small$1");
    },
    storageUrl() {
      return this.$store.state.storageUrl;
    },
    currentUser() {
      return this.$store.state.user.loggedInUser;
    },
    validUser() {
      if (this.currentUser) {
        return this.recipe.author.id == this.currentUser.id ? true : false;
      }
    }
  },
  methods: {
    ChangeStatus(status) {
      this.isLoading = true
      this.$store
        .dispatch("recipe/changeStatus", {
          id: this.recipe.id,
          status: status
        })
        .then(res => {
          if(status === 'PUBLISHED'){
            this.recipe.status = 'DRAFT'
          }else{
            this.recipe.status = "PUBLISHED"
          }
          this.$vToastify.success("Status updated");
          this.isLoading = false;
        })
        .catch(error => {
          this.isLoading = false;
        });
    }
  }
};
</script>
