<script setup lang="ts">
import type { AntSoldier } from '@/types/troop';
import { computed, ref } from 'vue';
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { useTroop } from '@/composables/useTroop';

const emit = defineEmits<{
  (e: 'change-level', level: number): void,
}>()
const props = withDefaults(defineProps<{
  soldier: AntSoldier;
  level?: number;
}>(), {
  level: 9
})

const isActive = ref(false)

const imageUrl = computed(() => {
  if (props.soldier === 'guardian') {
    return '/img/troops/guardian.png'
  } else if (props.soldier === 'shooter') {
    return '/img/troops/shooter.png'
  }
  return '/img/troops/carrier.png'
})

const {
  addLevel,
  substractLevel,
  isMinLevel,
  isMaxLevel,
  levelInRomawi,
  level: _level
} = useTroop(props.level)

function handleAddLevel() {
  addLevel()
  emit('change-level', _level.value)
}

function handleSubstractLevel() {
  substractLevel()
  emit('change-level', _level.value)
}
</script>

<template>
  <div class="troop-card">
    <div
      class="relative pt-2 bg-card text-card-foreground flex flex-col gap-4 rounded-md border shadow-sm p-2"
      @click="isActive = !isActive"
    >
      <img alt="Troop Unit" class="w-full h-full  object-contain opacity-70" :src="imageUrl"/>
      <p class="text-center text-sm capitalize">{{ soldier }}</p>
      <div class="bg-card text-card-foreground items-center flex rounded-b-sm border-b shadow-b-sm p-2">
        <button :class="{'active:bg-background': !isMinLevel}" class="p-[0.05px] rounded-full" @click="handleSubstractLevel">
          <ChevronLeft color="var(--background)" />
        </button>
          <p class="text-center text-xl w-full">{{ levelInRomawi }}</p>
        <button :class="{'active:bg-background': !isMaxLevel}" class="p-[0.05px] rounded-full" @click="handleAddLevel">
          <ChevronRight color="var(--background)" />
        </button>
      </div>
    </div>

  </div>
</template>

