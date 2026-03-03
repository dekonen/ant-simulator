<script setup lang="ts">
defineProps<{
  imageUrl: string;
  seasonText?: string;
}>()


</script>

<template>
<div class="special-ant-card flex items-center gap-3">
  <div
    class="card bg-linear-to-br from-card to-background relative aspect-[4/5] rounded-md border-2 flex items-center justify-center inner-shadow-soil"
  >
    <img class="w-full h-auto" :src="imageUrl"/>
    <p v-if="seasonText" class="season-text absolute bottom-0 left-0 text-tertiary">{{ seasonText }}</p>
  </div>
</div>
</template>

<style scoped>
  .card img {
    filter: brightness(0.8)
  }
</style>
