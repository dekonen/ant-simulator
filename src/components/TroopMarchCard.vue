<script setup lang="ts">
import { computed } from 'vue';
import Slider from './ui/slider/Slider.vue';
import type { AntSoldier } from '@/types/troop';
import { MAX_TROOPS } from '@/constant/troop';
import { useTroop } from '@/composables/useTroop';
const props = defineProps<{ soldier: AntSoldier; level: number; }>()
const modelValue = defineModel<number[]>()
const totalTroops = computed(() => modelValue.value?.[0] ?? 0)
const imageUrl = computed(() => {
  if (props.soldier === 'guardian') {
    return '/img/troops/guardian.png'
  } else if (props.soldier === 'shooter') {
    return '/img/troops/shooter.png'
  }
  return '/img/troops/carrier.png'
})
const { levelInRomawi } = useTroop(props.level)
</script>

<template>
  <div class="relative">
    <div class="card relative flex-1 h-20 backdrop-blur-sm rounded-md border border-white/5 card-shadow flex items-center px-4 gap-4 not-visible-on-drag">
      <div class="the-image left-4 top-4 w-12 h-12 rounded-sm flex items-center justify-center">
        <!-- Only image can handle drag  -->
        <img alt="Active Unit" class=" drag-handle w-full h-full object-contain opacity-70" :src="imageUrl"/>
        <div class="ignore-drag text-sm absolute bottom-[-2px]">{{ levelInRomawi }}</div>
      </div>
      <div class="w-full ignore-drag">
        <div class="flex w-full gap-1 justify-end gap-2 items-center">
          <p>{{ totalTroops }}</p>
        </div>
        <Slider
          v-model="modelValue"
          :max="MAX_TROOPS"
          :step="100"
        />
      </div>

    </div>

  </div>
</template>


<style scoped>
.card {
  background-color: #3d2b1dcc
}
</style>
