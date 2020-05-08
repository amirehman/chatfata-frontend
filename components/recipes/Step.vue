<template>
  <div class="flex">
    <span class="number w-4 block mr-8 text-2xl xxl:text-3xl mt-4 text-gray-500 font-light">{{i+1}}</span>
    <p class="block w-full para py-5 pb-2 dark:border-gray-700 border-b cursor-pointer">{{step.step}}.</p>
  </div>
</template>


<script>
export default {
  props: ["step", "i"]
};
</script>
