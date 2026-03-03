<script setup lang="ts">
import { createTroopId } from '@/composables/useTroop';
import { MAX_TROOPS } from '@/constant/troop';
import { useDeckStore } from '@/stores/useDeckStore';
import type { TroopMarch } from '@/types/troop';
import { ref } from 'vue';
import draggableComponent from 'vuedraggable';
import TroopCard from './TroopCard.vue';
const deckStore = useDeckStore()

const soldiers= ref<TroopMarch[]>([
 {
    id: createTroopId('guardian', 9),
    troop: {
      type: 'guardian',
      count: [MAX_TROOPS],
      level: 9
    }
  },
  {
    id: createTroopId('carrier', 9),
    troop: {
      type: 'carrier',
      count: [MAX_TROOPS],
      level: 9
    }
  },
  {
    id: createTroopId('shooter', 9),
    troop: {
      type: 'shooter',
      count: [MAX_TROOPS],
      level: 9
    }
  },
])

function handleClone(object: TroopMarch) {
  return {
    ...object,
    id: createTroopId(object.troop.type, object.troop.level),
    troop: {
      ...object.troop,
    }
  }
}
</script>

<template>
<div>
  <draggableComponent
    item-key="id"
    class="items-start grid grid-cols-3 gap-2"
    :list="soldiers"

    :group="{ name: 'troops', pull: 'clone', put: false }"
    :clone="handleClone"
    @start="deckStore.startDragingTroopCard()"
    @end="deckStore.endDraggingTroopCard()"
  >
    <template #item="slotProps">
      <div>
        <TroopCard
          :key="slotProps.element.id"
          :soldier="slotProps.element.troop.type"
          :level="slotProps.element.troop.level"
          @change-level="(v) => {
            slotProps.element.troop.level = v
            }"
        />
      </div>
    </template>
  </draggableComponent>
</div>
</template>
