<template>
  <div class="container">
    <div>
      <!-- <ul v-if="characters">
        <li v-for="char in allPosts.results" :key="char.id"> {{char.name}} </li>
      </ul> -->
      {{allPosts}}
    </div>
  </div>
</template>

<script>

import Logo from '~/components/Logo.vue'
import gql from 'graphql-tag'

export default {
  components: {
    Logo
  },
  data () {
    return {
      allPosts: []
    }
  },
  // apollo: {
  //   characters: gql `
  //     query {
  //       characters {
  //         results {
  //           id,
  //           name,
  //         }
  //       }
  //     }`
  // },


}
</script>

