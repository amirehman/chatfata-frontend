<template>
  <div>
    <div class="text-xl uppercase font-semibold tracking-wider">
      <nuxt-link to="/">
        <img :src="`${storageUrl}custom/logo1.png`" alt="Logo" class="w-full" />
      </nuxt-link>
    </div>
  </div>
</template>

<script>

export default {
  computed: {
    storageUrl() {
      return this.$store.state.storageUrl;
    },
  },

};
</script>
