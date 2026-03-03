<script setup lang="ts">
import { useDeckStore, type EmptyAbleSpecialAntMarch } from '@/stores/useDeckStore';
import SpecialAntMarchCard from './SpecialAntMarchCard.vue';
import draggableComponent from 'vuedraggable';
import { ref, watch } from 'vue';
const deckStore = useDeckStore()

const marchLength = 3
const list = ref<EmptyAbleSpecialAntMarch[]>([])

watch(deckStore.activePlayer.specialAntMarches, (n) => {
  list.value = n.map(x => ({...x}))
})

type HandleEvent = { newIndex: number; oldIndex: number }
function handleChange(evt: HandleEvent) {
  const newIndex = evt.newIndex;

  if (deckStore.activePlayer.specialAntMarches.length > marchLength) {
     deckStore.activePlayer.specialAntMarches.splice(newIndex + 1, 1);
  }

  if (evt.newIndex >= marchLength) {
     deckStore.activePlayer.specialAntMarches.splice(newIndex, 1);
  }
}

function handleRemove(evt: HandleEvent) {
  const oldIndex = evt.oldIndex;
  deckStore.activePlayer.specialAntMarches = deckStore.activePlayer.specialAntMarches.map((x, index) => {
    if (index === oldIndex) {
      return {
        id: '5'
      }
    }
    return x
  })
}

</script>

<template>
  <div class="special-ants">
    <draggableComponent
      item-key="id"
      :group="{name:'special-ants', pull: 'clone', put: true}"
      :ghost-class="deckStore.isDraggingSourceCard ? 'ghost' : 'no-ghost'"
      :list="deckStore.activePlayer.specialAntMarches"
      drag-class="dragging-item"
      @add="handleChange"
      @remove="handleRemove"
    >
      <template #item="slotProps">
        <div class="special-ant-card-container flex troop-card-container gap-4 items-center mb-4">
          <SpecialAntMarchCard
            :image-url="slotProps.element?.image_url"
            :season-text="slotProps.element?.season_text"
            class="ignore-drag"
          />
        </div>
      </template>
    </draggableComponent>
  </div>
</template>

<style>
.special-ants .dragging-item {
  background: transparent !important;
  border: none !important;
}

.special-ants .ghost {
  display:none !important;
}

.special-ants .ghost + .special-ant-card-container {
  background-color: var(--tertiary);
}
</style>
