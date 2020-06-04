<template>
  <div>
    <transition name="slide-fade">
      <div>
        <div
          key="one"
          v-if="isUserImageSideBar"
          v-on-clickaway="away"
          class="h-screen fixed right-0 top-0 w-25rem xxl:w-30rem bg-white z-20 dark:bg-dark-mode-dark border-l dark:border-gray-700 p-5 shadow-left"
        >
          <client-only>
            <file-pond
              name="reicpeimages"
              ref="pond"
              class="w-full"
              v-bind:allow-multiple="true"
              accepted-file-types="image/jpeg, image/png"
              :server="myServer"
              v-bind:files="myFiles"
            />
          </client-only>
          <UserRecipeImges />
        </div>
        <client-only key="two">
          <Keypress key-event="keydown" :key-code="27" @success="away" />
        </client-only>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";

import UserRecipeImges from "~/components/recipes/UserRecipeImages";

export default {
  props: ["rid", "rname", "currenUser"],
  components: {
    UserRecipeImges,
    Keypress: () => import("vue-keypress")
  },
  data() {
    return {
      myFiles: [],
      myServer: {
        process: (fieldName, file, metadata, load, progress, error, abort) => {
          // fieldName is the name of the input field
          // file is the actual file object to send
          const formData = new FormData();
          formData.append("image", file, file.name);

          const rname = this.rname.replace(/\\/g, '')


          // related to aborting the request
          const CancelToken = axios.CancelToken;
          const source = CancelToken.source();

          axios.defaults.headers.common["Authorization"] =
            "Bearer " + this.$apolloHelpers.getToken();
          axios
            .post(
              `${process.env.SERVER_URL}/api/recipes/images/recipe/${this.rid}/${rname}`,
              formData,
              { cancelToken: source.token },
              {
                _onUploadProgress: e => {
                  progress(e.lengthComputable, e.loaded, e.total);
                },
                get onUploadProgress() {
                  return this._onUploadProgress;
                },
                set onUploadProgress(value) {
                  this._onUploadProgress = value;
                }
              }
            )
            .then(response => {
              let image = {
                id: response.data.image.id,
                image: response.data.image.file
              };
              this.$store.commit("recipe/newImage", image);
              load(response.data.message);
            })
            .catch(error => {
              if (axios.isCancel(error)) {
                console.log("Request canceled", error.message);
              } else {
                this.fillErrors(error);
              }
            });

          return {
            abort: () => {
              source.cancel("Operation canceled by the user.");
            }
          };
        }
      }
    };
  },
  computed: {
    isUserImageSideBar() {
      return this.$store.state.recipe.isUserImageSideBar;
    },
    images() {
      return this.$store.state.recipe.images;
    }
  },
  methods: {
    away: function() {
      this.$store.commit("recipe/isUserImageSideBar", false);
    },
    onload(e, r) {
      console.log(r);
    }
  }
};
</script>
