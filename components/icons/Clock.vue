<template>
  <div>

    <svg
      :class="`fill-current ${width} ${height}`"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <path
        d="M10 20a10 10 0 110-20 10 10 0 010 20zm0-2a8 8 0 100-16 8 8 0 000 16zm-1-7.59V4h2v5.59l3.95 3.95-1.41 1.41L9 10.41z"
      />
    </svg>
  </div>
</template>

<script>
export default {
  props: ["width", "height"]
};
</script>
