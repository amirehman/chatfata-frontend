<template>
  <div>
    <div class="border border-l-0 border-r-0 dark:border-gray-700">
      <ul class="flex items-center max-w-6xl xxl:max-w-screen-xl mx-auto">
        <li>
          <nuxt-link
            class="inline-block py-3 px-6 hover:bg-gray-100 dark:hover:bg-dark-mode-light border-r border-gray-400 dark:border-gray-700"
            :to="`/${user.username}`"
            >Profile</nuxt-link
          >
        </li>
        <li>
          <nuxt-link
            class="inline-block py-3 px-6 hover:bg-gray-100 dark:hover:bg-dark-mode-light border-r border-gray-400 dark:border-gray-700"
            :to="`/${user.username}/recipes`"
            >Recipes</nuxt-link
          >
        </li>
        <li>
          <nuxt-link
            class="inline-block py-3 px-6 hover:bg-gray-100 dark:hover:bg-dark-mode-light border-r border-gray-400 dark:border-gray-700"
            to="/"
            >Saved Recipes</nuxt-link
          >
        </li>
        <li>
          <nuxt-link
            class="inline-block py-3 px-6 hover:bg-gray-100 dark:hover:bg-dark-mode-light border-gray-400"
            to="/"
            >Settings</nuxt-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['user']
}
</script>
