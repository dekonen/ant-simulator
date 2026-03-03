<script setup lang="ts">
import TroopMarches from './TroopMarches.vue'
import Tabs from './ui/tabs/Tabs.vue';
import TabsList from './ui/tabs/TabsList.vue';
import TabsTrigger from './ui/tabs/TabsTrigger.vue';
import TabsContent from './ui/tabs/TabsContent.vue';
import TroopCardSource from './TroopCardSource.vue';
import SpecialAntMarches from './SpecialAntMarches.vue';
import SpecialAntCardSource from './SpecialAntCardSource.vue';
import { Button } from './ui/button';
import { useDeckStore } from '@/stores/useDeckStore';

const deckStore = useDeckStore()

function next() {
  deckStore.currentPlayer = 'player2'
}

function prev() {
  deckStore.currentPlayer = 'player1'
}

</script>

<template>
  <div class="deck-setup">
    <div class="p-4 mb-4 border-b">
      <h1 class="text-center font-semibold text-2xl tracking-widest">{{ deckStore.deckName }}</h1>
    </div>

    <div class="flex gap-4">
      <SpecialAntMarches class="col-span-1"/>
      <TroopMarches class="flex-1"/>
    </div>

    <Tabs default-value="troops" class="mb-8">
      <TabsList class="w-full">
        <TabsTrigger value="troops">
          Troops
        </TabsTrigger>
        <TabsTrigger value="special_ant">
          Special Ant
        </TabsTrigger>
      </TabsList>
      <TabsContent value="troops">
        <TroopCardSource />
      </TabsContent>
      <TabsContent value="special_ant">
        <Tabs default-value="guardian">
          <TabsList class="w-full">
            <TabsTrigger value="guardian" is-sub-tab>
                G
            </TabsTrigger>
            <TabsTrigger value="shooter" is-sub-tab>
              S
            </TabsTrigger>
            <TabsTrigger value="carrier" is-sub-tab>
              C
            </TabsTrigger>
            <TabsTrigger value="universal" is-sub-tab>
              U
            </TabsTrigger>
          </TabsList>
          <TabsContent value="guardian">
            <SpecialAntCardSource />
          </TabsContent>
          <TabsContent value="shooter"></TabsContent>
          <TabsContent value="carrier"></TabsContent>
          <TabsContent value="universal"></TabsContent>
        </Tabs>
      </TabsContent>
    </Tabs>
    <div class="grid grid-cols-2 gap-2">
      <Button variant="secondary" @click="prev" v-if="deckStore.currentPlayer !== 'player1'">Back</Button>
      <div v-else></div>
      <Button @click="next">Next</Button>
    </div>
  </div>
</template>


<style>
/* menggunakan namespace deck-setup agar css ini befungsi di wilayah deck setup saja,
  scoped berarti cuma komponen ini saja yang berfungsi,
  sayangnya ini multi komponen namun hanya digunakan satu konteks (deck setup)
  .dragging-item adalah indikator, kalau komponen sedang di drag.
*/

</style>
