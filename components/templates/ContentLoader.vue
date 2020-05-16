<template>
  <div>
    <div :class="`grid grid-cols-${grid} gap-${gap} ${height}`">
      <div v-for="(num, i) in parseInt(numbers)" :key="i" class="grid-items-plachoder rounded-lg dark:bg-dark-mode-light-1 placeholder-animation"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["height", "grid", "numbers", "gap"]
};
</script>
