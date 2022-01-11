import { MutationTree } from 'vuex'
import { Pokemon } from 'pokenode-ts'
import { StateStore } from '~/types'

export const state = () => ({
  data: undefined,
  cached: []
} as StateStore['pokemon'])

export const mutations: MutationTree<StateStore['pokemon']> = {
  SET_POKEMON: (state, pokemon: Pokemon) => {
    state.data = pokemon
  },
  UPDATE_POKEMONS_CACHED: (state, pokemons: Pokemon[]) => {
    state.cached = pokemons
  },
  ADD_POKEMON_TO_CACHE: (state, pokemon: Pokemon) => {
    const index = state.cached.findIndex(p => p.id === pokemon.id)
    if (index === -1) state.cached.push(pokemon)
  },
  REMOVE_POKEMON_TO_CACHE: (state, id: number) => {
    const index = state.cached.findIndex(p => p.id === id)
    state.cached.splice(index, 1)
  },
}
