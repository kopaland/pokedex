import { MutationTree } from 'vuex'
import { IPokemonBase, IPokemonData, IPokemonEvolution, StateStore } from '~/types'

export const state = () =>
  ({
    data: undefined,
    cached: [],
  } as StateStore['pokemon'])

export const mutations: MutationTree<StateStore['pokemon']> = {
  SET_POKEMON: (state, pokemon: IPokemonData) => {
    const evolutions = pokemon.evolutions.length
      ? pokemon.evolutions
      : state.data?.evolutions.some((e) => e.id === pokemon.id)
      ? state.data.evolutions
      : []
    state.data = {
      ...pokemon,
      evolutions,
    }
  },
  SET_POKEMON_EVOLUTIONS: (state, evolutions: IPokemonEvolution[]) => {
    if (state.data) state.data.evolutions = evolutions
  },
  UPDATE_POKEMONS_CACHED: (state, pokemons: IPokemonData[]) => {
    state.cached = pokemons
  },
  ADD_POKEMON_TO_CACHE: (state, pokemon: IPokemonBase) => {
    const index = state.cached.findIndex((p) => p.id === pokemon.id)
    if (index === -1) state.cached.push(pokemon)
  },
  REMOVE_POKEMON_TO_CACHE: (state, id: number) => {
    const index = state.cached.findIndex((p) => p.id === id)
    state.cached.splice(index, 1)
  },
}
