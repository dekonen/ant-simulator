import type { AntSoldier } from "@/types/troop"
import { computed, ref } from "vue"

const romawi = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VII', 'IX', 'X', 'XI', 'XII']

export function getLevelInRomawi (level: number) {
  return romawi[level - 1]
}

export function getTLevel(level: number) {
  return 't' + level
}

export function createTroopId(soldier: AntSoldier, level: number) {
  return soldier + getTLevel(level) + '_' + Date.now()
}

export function useTroop(initialLevel?: number) {
  const level = ref(initialLevel ?? 1)
  const tLevel = computed(() => {
    return getTLevel(level.value)
  })
  const levelInRomawi = computed(() => {
    return getLevelInRomawi(level.value)
  })

  const setLevel = (v: number) => {
    if (v > 12) {
      throw new Error('Level cannot higher than 12');
    }
    level.value = v
  }

  const addLevel = () => level.value < 12 ? level.value++ : level.value = 12
  const substractLevel = () => level.value > 1 ? level.value-- : level.value = 1

  const isMinLevel = computed(() => level.value <= 1)
  const isMaxLevel = computed(() => level.value >= 12)
  return {
    level,
    tLevel,
    levelInRomawi,
    isMinLevel,
    isMaxLevel,
    setLevel,
    addLevel,
    substractLevel
  }
}
