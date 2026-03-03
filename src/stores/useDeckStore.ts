import { MAX_TROOPS } from "@/constant/troop";
import type { SpecialAntMarch } from "@/types/special-ant";
import type { TroopMarch } from "@/types/troop";
import { defineStore } from "pinia";

function getDefaultTroopMarches (): TroopMarch[] {
  return [
    {
      id: 'guardianT9',
      troop: {
        type: 'guardian',
        count: [MAX_TROOPS],
        level: 9,
      }
    },
    {
      id: 'carrierT9',
      troop: {
        type: 'carrier',
        count: [MAX_TROOPS],
        level: 9
      }
    },
    {
      id: 'shooterT9',
      troop: {
        type: 'shooter',
        count: [MAX_TROOPS],
        level: 9
      }
    }
  ]
}

function getDefaultSpecialAntMarches(): EmptyAbleSpecialAntMarch[] {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ]
}

interface PlayerDeck {
  deckName: string;
  troopMarches: TroopMarch[];
  specialAntMarches: EmptyAbleSpecialAntMarch[];
}

interface State {
  currentPlayer: 'player1' | 'player2'
  player1: PlayerDeck;
  player2: PlayerDeck;
  isDraggingSpecialAntCard: boolean;
  isDraggingTroopCard: boolean;
}

export type EmptyAbleSpecialAntMarch = (SpecialAntMarch | {id: string})

export const useDeckStore = defineStore('deck', {
  state: () => <State>({
    currentPlayer: 'player1',
    isDraggingTroopCard: false,
    isDraggingSpecialAntCard: false,
    player1: {
      troopMarches: getDefaultTroopMarches(),
      specialAntMarches: getDefaultSpecialAntMarches()
    },
    player2: {
      troopMarches: getDefaultTroopMarches(),
      specialAntMarches: getDefaultSpecialAntMarches()
    },
  }),
  actions: {
    startDragingTroopCard() {
      this.isDraggingTroopCard = true
    },
    endDraggingTroopCard() {
      this.isDraggingTroopCard = false
    },
    startDraggingSpecialAntCard() {
      this.isDraggingSpecialAntCard = true;
    },
    endDraggingSpecialAntCard() {
      this.isDraggingSpecialAntCard = false;
    },
  },
  getters: {
    isDraggingSourceCard: (state) => state.isDraggingSpecialAntCard || state.isDraggingTroopCard,
    activePlayer: (state) => state[state.currentPlayer],
    deckName: (state) => state.currentPlayer === 'player1' ? 'Player1 Deck' : 'Player2 Deck'
  }
})
