import type { SpecialAntInBattle } from "@/types/special-ant";
import type { AntAttribute, TroopMarch } from "@/types/troop";
import { defineStore } from "pinia";
import { useBattleSetupStore } from "./useBattleSetupStore";

interface PlayerDeck {
  deckName: string;
  troopMarches: TroopMarch[];
  specialAntMarches: SpecialAntInBattle[];
  attribute: AntAttribute
}


interface State {
  player1: PlayerDeck,
  player2: PlayerDeck
}

export const useBattleStore = defineStore('battle', {
  state: () => <State>({
    player1: {
      deckName: '',
      troopMarches: [],
      specialAntMarches: [],
      attribute: {
        attack: 0,
        defend: 0,
        health: 0
      }
    },
    player2: {
      deckName: '',
      troopMarches: [],
      specialAntMarches:[],
      attribute: {
        attack: 0,
        defend: 0,
        health: 0
      }
    }
  }),
  actions: {
    init() {
      const battleSetupStore = useBattleSetupStore()
      this.player1 = {
        ...structuredClone(battleSetupStore.player1),
        specialAntMarches: battleSetupStore.player1.specialAntMarches.map((x, index) => {
          return {
            ...x,
            stats: {
              health: 0,
              troops_count: 0
            },

          }
        })
      }
    },
    startBattle() {

    },

  }
})
