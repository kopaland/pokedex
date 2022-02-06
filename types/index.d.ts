export interface PokemonStats {
  name: string
  base: number
}
export interface IPokemonBase {
  id?: number
  name: string
  evolveOrder: string
  imageSrc: string | null
  types: string[]
  stats: PokemonStats[]
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

export interface IPokemonCard extends IPokemonBase {}

export interface IPokemonTeamStore extends IPokemonBase {
  quantity: number
  position: number
}

export interface ITrainer {
  id: number | null
  pseudo: string
}

export interface ITeam {
  id: number | null
  trainer: ITrainer
  pokemons: IPokemonBase[]
}
export interface StateStore {
  pokemon: {
    data?: IPokemonData
    cached: IPokemonBase[]
  }
  team: {
    id: number | null
    trainerId: number | null
    trainerPseudo: string | null
    pokemons: IPokemonTeamStore[]
  }
}
