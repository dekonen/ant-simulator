import type { QueryConfig } from "@/lib/vue-query";
import type { SpecialAntMarch, SpecialAntRarity, SpecialAntUnlockType } from "@/types/special-ant";
import { queryOptions, useQuery } from "@tanstack/vue-query";

export type GetSpecialAntsResponse = {
  id: number;
  name: string;
  image_url: string;
  season?: number;
  rarity?: SpecialAntRarity;
  unlock_types: {
    name: SpecialAntUnlockType;
  }[];
}[]

function toSpecialAntMarchs(response: GetSpecialAntsResponse): SpecialAntMarch[] {
  return response.map(x => {
    const { id, name, image_url, season, unlock_types, rarity } = x
    return {
      id: id.toString(),
      name,
      image_url,
      season,
      season_text: 'S' + season,
      rarity,
      unlock_type: unlock_types.map(x => x.name)
    }
  })
}

export function getSpecialAnts(page = 1) {
  return Promise.resolve<{ data: SpecialAntMarch[] }>({
    data: toSpecialAntMarchs([
      {
        id: 12,
        name: 'PA',
        image_url: '/img/special-ant/pa.png',
        season: 2,
        rarity: 'orange',
        unlock_types: [
          { name: 'supreme_hatch' },
          { name: 'season_hatch' },
        ]
      },
      {
        id: 13,
        name: 'Hairy Panther',
        image_url: '/img/special-ant/hp.png',
        season: 2,
        rarity: 'orange',
        unlock_types: [
          { name: 'supreme_hatch' },
          { name: 'season_hatch' },
        ]
      },
      {
        id: 14,
        name: 'Jet Black',
        image_url: '/img/special-ant/jb.png',
        season: 1,
        rarity: 'orange',
        unlock_types: [
          { name: 'supreme_hatch' },
        ]
      },

    ]),
  })
}

export function getSpecialAntQueryOptions () {
  return queryOptions({
    queryKey: ['special-ants'],
    queryFn: () => getSpecialAnts(),
  });
}

type UseGetSpecialAntsOptions = {
  queryConfig?: QueryConfig<typeof getSpecialAntQueryOptions>;
};


export function useGetSpecialAnts(param?: UseGetSpecialAntsOptions) {
  const { queryConfig } = param ?? {}
  return useQuery({
    ...getSpecialAntQueryOptions(),
    ...queryConfig
  })
}
