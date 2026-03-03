<script setup lang="ts">
import draggableComponent from 'vuedraggable';
import TroopMarchCard from './TroopMarchCard.vue';
import { getTLevel } from '@/composables/useTroop';
import { useDeckStore } from '@/stores/useDeckStore';

const deckStore = useDeckStore()
defineEmits(['end'])

const marchLength = 3

type HandleEvent = { newIndex: number }
function handleChange(evt: HandleEvent) {
  const newIndex = evt.newIndex;

  if (deckStore.activePlayer.troopMarches.length > marchLength) {
     deckStore.activePlayer.troopMarches.splice(newIndex + 1, 1);
  }

  if (evt.newIndex >= marchLength) {
     deckStore.activePlayer.troopMarches.splice(newIndex, 1);
  }

  deckStore.activePlayer.troopMarches = deckStore.activePlayer.troopMarches.map(m => {
    return {
      ...m,
      id: m.troop.type + getTLevel(m.troop.level)
    }
  })
}
</script>

<template>
  <div class="march-troops">
    <draggableComponent
      item-key="id"
      handle=".drag-handle"
      group="troops"
      :list="deckStore.activePlayer.troopMarches"
      :ghost-class="deckStore.isDraggingSourceCard ? 'ghost' : 'no-ghost'"
      drag-class="dragging-item"
      @add="handleChange"
      @end="$emit('end')"
    >
      <template #item="slotProps">
        <div class="mb-4 troop-card-container">
          <TroopMarchCard
            class="flex-1 troop-card"
            v-model="slotProps.element.troop.count"
            :soldier="slotProps.element.troop.type"
            :level="slotProps.element.troop.level"
          />
        </div>
      </template>
    </draggableComponent>
  </div>
</template>

<style>
.march-troops .dragging-item {
  background: transparent !important;
  border: none !important;
}

.march-troops .ghost {
  display: none !important;
}

.march-troops .ghost + .troop-card-container .troop-card {
  opacity: 0.5;
  filter: blur(1px);
}

.march-troops .dragging-item .ignore-drag {
  display: none;
}

/* membuat komponen hanya gambar yang terlihat */
.march-troops .dragging-item .not-visible-on-drag {
  width: fit-content;
  transform: translateX(80px);
  background-color: rgba(0,0,0,0);
  border: 0 solid black;
}
</style>
