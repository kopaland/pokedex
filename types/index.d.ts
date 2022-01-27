import { Pokemon } from "pokenode-ts";

export interface IPokemonBase {
  id?: number
  name: string
  evolveOrder: string
  imageSrc: string | null
  types: string[]
  stats: Pokemon['stats']
}

export interface IPokemonEvolution extends IPokemonBase {
  current: boolean
}
export interface IPokemonData extends IPokemonBase {
  evolutions: IPokemonEvolution[]
}

export interface StateApi<T> {
  loading: boolean
  data?: T
  error?: any
}

export interface IPokemonCard extends IPokemonBase {
}

export interface IPokemonTeamStore extends IPokemonBase {
  quantity: number
  position: number
}

export interface StateStore {
  pokemon: {
    data?: IPokemonData
    cached: IPokemonBase[]
  }
  team: {
    pokemons: IPokemonTeamStore[]
  }
}