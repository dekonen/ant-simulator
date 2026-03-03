export type SpecialAntCategory = 'guardian' | 'carrier' | 'shooter' | 'universal'
export type SpecialAntRarity = 'orange' | 'purple' | 'blue'
export type SpecialAntUnlockType = 'supreme_hatch' |
  'rare_hatch' |
  'season_hatch' |
  'normal_hatch' |
  'spin_wheel' |
  'premium'

export type SpecialAntMarch = {
  id: string;
  name: string;
  image_url: string;
  season?: number;
  season_text?: string;
  rarity?: SpecialAntRarity;
  unlock_type?: SpecialAntUnlockType[]
}

export type SpecialAntProbabilityConfig = 'normal' | 'luck' | 'badluck' | undefined
export type SpecialAntSkillType = 'damage' | 'damage_reduction' | 'heal'
export type SpecialAntSkillTargetType = 'random_friendly_squad' | 'random_enemy_squad' | 'its_squad' | 'its_squad_and_friendly_squad'

export type SpecialAntSkillDetail = {
  category: SpecialAntCategory;
  name: string;
  type: SpecialAntSkillType,
  target_type: SpecialAntSkillTargetType,
  target_count: number,
  probability: number,
  round: number[],
  effects: SpecialAntSkillEffect[],
}

export type SpecialAntSkillEffectName = 'silence' | 'poison' | 'bleeding' | 'suppress' | 'immune'

export type SpecialAntSkillEffect = {
  name: SpecialAntSkillEffectName,
  round_duration: number,
  value: number | null // usually, poison, bleeding has value
}

export type SpecialAntPreBattle = SpecialAntMarch & {
  probability_config: SpecialAntProbabilityConfig
  skills: SpecialAntSkillDetail[]
}

export type SpecialAntInBattle = SpecialAntPreBattle & {
  stats: {
    troops_count: number,
    health: number,
  }
}
