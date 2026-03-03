<script setup lang="ts">
import { PlusIcon } from 'lucide-vue-next';
import { computed } from 'vue';
const props = defineProps<{
  imageUrl?: string;
  seasonText?: string;
}>()

const isImageAttached = computed(() => {
  return props.imageUrl != undefined
})

</script>

<template>
<div class="flex items-center gap-3">
  <div
    class="card relative w-16 h-20 rounded-md border-2 flex items-center justify-center inner-shadow-secondary"
    :class="[isImageAttached ? 'bg-linear-to-br from-card to-background' : 'no-image-attached']"
  >
    <PlusIcon v-if="!isImageAttached" color="var(--border)" />
    <img v-else class="w-full h-auto" :src="imageUrl"/>
    <p v-if="seasonText" class="season-text absolute bottom-0 left-0 text-tertiary">{{ seasonText }}</p>
  </div>
</div>
</template>

<style scoped>
  .no-image-attached {
    background-color: #201004;
    border-style: dashed;
  }
  .card img {
    filter: brightness(0.8)
  }
</style>
