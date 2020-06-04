<template>
  <div>
    <footer class="main-footer mt-16 lg:mt-32 dark:border-gray-700 border-t py-10">
      <div class="inner">
        <div class="max-w-6xl xxl:max-w-screen-xl mx-auto px-5">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div class="footer-grid-item pr-12">
              <div class="footer-logo w-16 md:w-24">
                <Logo />
              </div>
              <p
                class="mt-4 text-sm xxl:text-base text-gray-800 dark:text-gray-400"
              >Chatfata is a place for unique and taste recipes. Chatfata connects people with great recipes. </p>
              <div class="hidden md:block copyright mt-4 text-gray-600">
                <div class="relative">
                  <span class="inline-block absolute">©</span>
                  <span class="ml-4 inline-block">
                    <a href="https://shallow-fry.com">Shallow fry</a>. All rights
                    reserved
                  </span>
                </div>
              </div>
            </div>
            <div class="footer-grid-item">
              <h4 class="text-lg xxl:text-xl capitalize text-gray-800 dark:text-gray-400 font-medium">Usefull Links</h4>
              <ul class="mt-3 text-gray-800 dark:text-gray-400 text-sm xxl:text-base">
                <li class="mb-1">
                  <a href class="hover:text-orange-600 transition duration-300">Browse Recipies</a>
                </li>
                <li class="mb-1">
                  <a href class="hover:text-orange-600 transition duration-300">
                    Subscribe For
                    Newsletter
                  </a>
                </li>
                <li class="mb-1">
                  <a href class="hover:text-orange-600 transition duration-300">Contact</a>
                </li>
                <li class="mb-1">
                  <nuxt-link to="/privacy-policy" class="hover:text-orange-600 transition duration-300">Privacy & Policy</nuxt-link>
                </li>
              </ul>
            </div>
            <div class="footer-grid-item">
              <h4 class="text-lg xxl:text-xl capitalize text-gray-800 dark:text-gray-400 font-medium">Get Social</h4>
              <div class="social-media">
                <ul class="mt-3 text-gray-800 dark:text-gray-400 text-sm xxl:text-base">
                  <li class="mb-1">
                    <a href class="hover:text-orange-600 transition duration-300">Facebook</a>
                  </li>
                  <li class="mb-1">
                    <a href class="hover:text-orange-600 transition duration-300">Instagram</a>
                  </li>
                  <li class="mb-1">
                    <a href class="hover:text-orange-600 transition duration-300">Tiktok</a>
                  </li>
                </ul>
              </div>

              <div class="block md:hidden copyright mt-4 text-gray-600">
                <div class="relative">
                  <span style="top: 3px;" class="inline-block absolute">©</span>
                  <span style="margin-left: 15px;" class="inline-block">
                    <a href="https://shallow-fry.com">copy Shallow fry</a>. All rights
                    reserved
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>


<script>
import Logo from "./Logo.vue";

export default {
  components :{
    Logo
  }
}
</script>
