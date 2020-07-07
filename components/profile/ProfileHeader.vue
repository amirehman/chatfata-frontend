<template>
  <div class="mb-6 md:mb-12">
    <div
      class="apply-for-channel-modal w-full h-screen fixed left-0 top-0 z-10 bg-black-transparent-4 flex items-center justify-center"
      @click.self="isChannelModal = false"
      :class="isChannelModal ? 'flex' : 'hidden'"
    >
      <Loader v-if="submitting" />
      <div v-else class="w-full md:w-1/2">
        <div class="inner bg-white p-5 rounded shadow-xl" v-if="!applied">
          <form @submit.prevent="applyForChannel">
            <h2 class="text-xl font-medium tracking-wide">
              Appling for channel
            </h2>
            <hr class="my-3 bg-gray-300" />
            <div class="content text-gray-800">
              <p>
                Start by adding one of your recipe video channel. You can add
                more once your channel request approved.
              </p>
            </div>

            <div class="radio-buttons mt-5">
              <label for="channeltype" class="block mb-1"
                >Select platform</label
              >
              <client-only>
                <el-select required v-model="data.type" placeholder="Select">
                  <el-option
                    class="capitalize"
                    v-for="item in channelTypes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </client-only>
            </div>

            <div>
              <div class="element">
                <label class="block mt-5 capitalize" for="channel">
                  Channel URL</label
                >
                <input
                  v-model="data.url"
                  type="url"
                  required
                  name="channel"
                  class="border rounded px-3 py-2 w-full focus:outline-none focus:bg-theme-gray"
                />
              </div>
              <!-- element -->
            </div>
            <div class="modal-footer mt-5">
              <button
                type="submit"
                class="border border-theme-yellow rounded py-2 px-5 focus:outline-none hover:bg-theme-yellow text-theme-yellow transition ease-in-out duration-300 bg-transparent hover:text-white"
              >
                Apply
              </button>
            </div>
          </form>
        </div>
        <div class="inner bg-white p-5 rounded shadow-xl" v-else>
          <p>
            Your request for channels is under reviews. we will let you know by
            email when its approved.
          </p>
        </div>
      </div>
    </div>

    <div class="max-w-6xl xxl:max-w-screen-xl mx-auto">
      <div class="section-header mb-6 md:mb-12 text-center md:text-left">
        <div class="flex flex-wrap md:flex-no-wrap">
          <div
            class="border dark:border-gray-700 w-48 md:w-64 h-48 mx-auto md:mr-auto bg-gray-200 dark:bg-dark-mode-light-1 overflow-hidden rounded-lg flex items-end justify-center"
            :class="user.avatar ? 'pb-0' : 'pb-3'"
          >
            <div class="inner relative">
              <span class="text-gray-500" v-if="!user.avatar">
                <svg
                  class="fill-current w-32 h-32"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M5 5a5 5 0 0110 0v2A5 5 0 015 7V5zM0 16.68A19.9 19.9 0 0110 14c3.64 0 7.06.97 10 2.68V20H0v-3.32z"
                  />
                </svg>
              </span>
              <client-only v-else>
                <v-lazy-image
                  :alt="user.name"
                  class="object-cover w-48 md:w-64 h-48"
                  :src="`${storageUrl}${user.avatar}`"
                  :src-placeholder="`${storageUrl}${smallAvatar}`"
                />
              </client-only>
            </div>
          </div>

          <!-- w-auto end -->
          <div class="hidden md:block w-16"></div>
          <div class="w-full flex flex-col md:justify-between">
            <div class="category-header-info pr-0 lg:pr-16 mt-6 md:mt-0">
              <div
                class="category-title flex items-center justify-center md:justify-start"
              >
                <h1
                  class="text-2xl tracking-wide leading-snug capitalize text-gray-900 dark:text-gray-200"
                >
                  {{ user.name }}
                </h1>
                <span
                  class="block ml-2 text-gray-700 dark:text-gray-400"
                  v-if="isAuthenticated && isValidUser"
                >
                  <nuxt-link
                    v-if="currentUser"
                    class="text-sm lowercase"
                    :to="`/${currentUser.username}/edit`"
                  >
                    <svg
                      class="fill-current w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M12.3 3.7l4 4L4 20H0v-4L12.3 3.7zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z"
                      />
                    </svg>
                  </nuxt-link>
                </span>
              </div>
              <!-- category title end -->
              <div

                v-if="user.info"
                class="recipe-short-description text-gray-700 dark:text-gray-400 mt-3 text-base xxl:text-lg content"
              >
                <p>{{ user.info.about }}</p>
              </div>
              <div v-else class="h-auto md:h-24"></div>
              <!-- recipe short description -->

              <div class="profile-social" v-if="isChannel">
                <div>
                <p class="text-base mb-2 text-gray-800">Watch my recipes on</p>
                <ul
                  class="flex items-center justify-center md:justify-start text-gray-800 dark:text-gray-400"
                >
                  <li
                    class="hover:text-orange-500 mr-3"
                    v-for="(social, i) in user.social"
                    :key="i"
                    :title="social.media.name"
                  >
                    <a :href="social.link" target="_blank">
                      <YoutubeIcon
                        v-if="social.media.name === 'Youtube'"
                        width="w-6"
                        height="h-6"
                      />
                      <FacebookIcon
                        v-else-if="social.media.name === 'Facebook'"
                        width="w-5"
                        height="h-5"
                      />
                      <InstagramIcon
                        v-if="social.media.name === 'Instagram'"
                        width="w-6"
                        height="h-6"
                      />
                      <TiktokIcon
                        v-if="social.media.name === 'Tiktok'"
                        width="w-6"
                        height="h-6"
                      />
                    </a>
                  </li>
                </ul>
              </div>
              </div>
            </div>
            <!-- recipe header info end -->
            <div
              v-show="
                isValidUser && !isChannel && !applied && !user.application
              "
            >
              <button
                @click="isChannelModal = true"
                title="Apply for a channel if you want to upload your own recipes"
                class="focus:outline-none focus:bg-theme-gray mt-5 md:mt-0 border  py-2 px-3 rounded bg-transparent border-gray-400 hover:bg-theme-gray hover:bg-white cursor-pointer  text-sm font-medium tracking-wide text-gray-800 dark:text-gray-400 transition ease-in-out duration-300"
              >
                <span>Apply for Channel</span>
              </button>
            </div>
            <div class="text-sm text-theme-yellow" v-if="user.application">
              <span v-if="user.application.status === 'pending'">You application is in review. It will take 24 hour.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- section header end  -->
    <template v-if="isChannel">
      <ProfileNavbar :user="user" />
    </template>
    <hr v-else class="" />

    <client-only>
      <Keypress
        key-event="keydown"
        :key-code="27"
        @success="isChannelModal = false"
      />
    </client-only>
  </div>
</template>

<script>
import ProfileNavbar from "./ProfileNavbar";
export default {
  props: ["user"],
  data() {
    return {
      channelTypes: [
        {
          value: 1,
          label: "youtube"
        },
        {
          value: 2,
          label: "facebook"
        },
        {
          value: 3,
          label: "instagram"
        },
        {
          value: 4,
          label: "tiktok"
        }
      ],
      channelType: "1",
      isChannelModal: false,
      applied: false,
      submitting: false,
      data: {
        type: 1,
        url: "https://"
      }
    };
  },
  components: { ProfileNavbar, Keypress: () => import("vue-keypress") },
  computed: {
    smallAvatar() {
      if (this.currentUser) {
        return this.user.avatar.replace(/(\.[\w\d_-]+)$/i, "-small$1");
      }
    },
    storageUrl() {
      return this.$store.state.storageUrl;
    },
    isAuthenticated() {
      return this.$store.getters["user/isAuthenticated"];
    },
    isVerified() {
      return this.$store.getters["user/isVerified"];
    },
    isChannel() {
      return this.$store.getters["user/isChannel"];
    },
    currentUser() {
      return this.$store.state.user.loggedInUser;
    },
    isValidUser() {
      if (this.currentUser) {
        return this.user.id == this.currentUser.id ? true : false;
      }
    },
    isThisProfileChannel() {
      if (this.user.roles) {
        let roles = this.user.roles.map(e => {
          return e.name;
        });
        return roles.includes("channel");
      }
    }
  },
  methods: {
    applyForChannel() {
      this.submitting = true;
      this.$store
        .dispatch("user/applyForChannel", {
          user_id: this.currentUser.id,
          type: this.data.type,
          url: this.data.url
        })
        .then(response => {
          if (response.status === 201) {
            this.applied = true;
          }
          this.submitting = false;
        })
        .catch(error => {
          this.applied = false;
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss">
.el-select-dropdown__item.selected {
  color: #fca311;
}
.el-input__inner {
  text-transform: capitalize;
}
.el-select-dropdown.el-popper {
  top: 645px!important;
}
</style>
