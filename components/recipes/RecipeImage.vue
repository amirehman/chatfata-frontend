<template>
  <div>
    <client-only>
      <v-lazy-image
        alt="image title"
        :class="`${height} ${width} object-cover`"
        :src="`${storageUrl}${mediumImage}`"
        :src-placeholder="`${storageUrl}${smallImage}`"
      />
    </client-only>
  </div>
</template>

<script>
export default {
  props: ["image", "height", "width"],
  computed: {
    mediumImage() {
      return this.image.replace(/(\.[\w\d_-]+)$/i, "-medium$1");
    },
    smallImage() {
      return this.image.replace(/(\.[\w\d_-]+)$/i, "-small$1");
    },
    storageUrl() {
      return this.$store.state.storageUrl;
    }
  }
};
</script>
