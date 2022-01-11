import { Pokemon } from 'pokenode-ts'

export interface IPokemonData {
  id?: number
  name: string
  evolveOrder: string
  imageSrc: string | null
  types: string[]
}

export interface StateApi<T> {
  loading: boolean
  data?: T
  error?: any
}

export interface IPokemonCard extends IPokemonData {
}


export interface IPokemonEvolution extends IPokemonData {
  current: boolean
}

export interface IPokemonTeamStore extends IPokemonData {
  quantity: number
  position: number
}

export interface StateStore {
  pokemon: {
    data?: Pokemon
    cached: Pokemon[]
  }
  team: {
    pokemons: IPokemonTeamStore[]
  }
}