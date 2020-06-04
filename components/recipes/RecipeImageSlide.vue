<template>
  <div>
    <div class="recipe-cover-image relative rounded-lg overflow-hidden">
      <div class="inner">
        <client-only>
          <v-lazy-image
            :alt="title"
            class="h-32rem object-cover w-full"
            :src="`${storageUrl}${mediumImage}`"
            :src-placeholder="`${storageUrl}${smallImage}`"
          />
        </client-only>
        <div class="overlay absolute left-0 top-0 w-full h-full"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["image", "title"],
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
