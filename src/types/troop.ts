export type AntSoldier = 'guardian' | 'carrier' | 'shooter'

export type TroopMarch = {
  id: string;
  troop: {
    type: AntSoldier,
    count: number[],
    level: number
  }
}
