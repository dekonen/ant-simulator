<script setup lang="ts">
import { useDeckStore } from '@/stores/useDeckStore';
import draggableComponent from 'vuedraggable';
import { useGetSpecialAnts } from '@/api/special-ant/get-special-ants';
import { ref, watch } from 'vue';
import type { SpecialAntMarch } from '@/types/special-ant';
import SpecialAntCard from './SpecialAntCard.vue';
const deckStore = useDeckStore()

const specialAnts = ref<SpecialAntMarch[]>([])

const { data } = useGetSpecialAnts()

watch(data, (v) => {
  specialAnts.value = v?.data ?? []
}, { immediate: true })

function handleClone(object: SpecialAntMarch) {
  return {
    ...object,
  }
}

// special ant can be placed two slot or more!

function checkMove() {
  console.log('ok')
}
// function checkMove(evt) {
//   const dragged = evt.draggedContext.element
//   const targetList = evt.relatedContext.list

//   const exists = targetList.some(x => x.id === dragged.id)

//   if (exists) {
//     return false // cancel drop
//   }

//   return true
// }
</script>

<template>
<div>
  <draggableComponent
    item-key="id"
    :move="checkMove"
    class="items-start grid grid-cols-4 pr-8 gap-4"
    :list="specialAnts"
    :group="{ name: 'special-ants', pull: 'clone', put: true }"
    :clone="handleClone"
    @start="deckStore.startDraggingSpecialAntCard()"
    @end="deckStore.endDraggingSpecialAntCard()"
  >
    <template #item="slotProps">
      <div>
        <SpecialAntCard
          :key="slotProps.element.id"
          :image-url="slotProps.element.image_url"
          :title="slotProps.element.name"
          :season-text="slotProps.element.season_text"
        />
      </div>
    </template>
  </draggableComponent>
</div>
</template>
