<template>
  <div>
    <svg :class="`fill-current ${width} ${height}`" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path
        d="M2.93 17.07A10 10 0 1117.07 2.93 10 10 0 012.93 17.07zm12.73-1.41A8 8 0 104.34 4.34a8 8 0 0011.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
      />
    </svg>
  </div>
</template>

<script>
export default {
  props: ["width", "height"]
};
</script>
