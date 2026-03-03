import type { SpecialAntPreBattle } from "@/types/special-ant";
import type { AntAttribute, TroopMarch } from "@/types/troop";
import { defineStore } from "pinia";

interface PlayerDeck {
  deckName: string;
  troopMarches: TroopMarch[];
  specialAntMarches: SpecialAntPreBattle[];
  attribute: AntAttribute
}

interface State {
  player1: PlayerDeck,
  player2: PlayerDeck
}

export const useBattleSetupStore = defineStore('battle-setup', {
  state: () => <State>({
    player1: {
      deckName: '',
      troopMarches: [],
      specialAntMarches: [],
      attribute: {
        attack: 0,
        defend: 0,
        health: 0
      },
    },
    player2: {
      deckName: '',
      troopMarches: [],
      specialAntMarches: [],
      attribute: {
        attack: 0,
        defend: 0,
        health: 0
      },
    }
  }),
  actions: {
    init() {

    }
  }
})
