import { MutationTree } from 'vuex'
import { StateStore, IPokemonData, IPokemonTeamStore } from '~/types'

type OrderMutation = {
  id: number
  upOrDown: -1 | 1
}

export const state = () =>
  ({
    pokemons: [],
  } as StateStore['team'])

export const mutations: MutationTree<StateStore['team']> = {
  SWITCH_POKEMON_TO_TEAM: (state, value: IPokemonData) => {
    const index = state.pokemons.findIndex((p) => p.id === value.id)
    if (index === -1)
      state.pokemons.push({
        ...value,
        quantity: 1,
        position: state.pokemons.length + 1,
      })
    else state.pokemons.splice(index, 1)
    updateLocalStorage(state.pokemons)
  },
  ADD_POKEMON_TO_TEAM: (state, value: IPokemonData) => {
    const index = state.pokemons.findIndex((p) => p.id === value.id)
    if (index === -1)
      state.pokemons.push({
        ...value,
        quantity: 1,
        position: state.pokemons.length + 1,
      })
    else state.pokemons[index].quantity++
    updateLocalStorage(state.pokemons)
  },
  REMOVE_POKEMON_TO_TEAM: (state, id: number) => {
    const index = state.pokemons.findIndex((p) => p.id === id)
    state.pokemons[index].quantity--
    if (state.pokemons[index].quantity === 0) state.pokemons.splice(index, 1)
    updateLocalStorage(state.pokemons)
  },
  UPDATE_ORDER_POKEMON_TO_TEAM: (state, order: OrderMutation) => {
    const index = state.pokemons.findIndex((p) => p.id === order.id)
    if (index !== -1)
      state.pokemons.splice(
        index - order.upOrDown,
        0,
        state.pokemons.splice(index, 1)[0]
      )
    updateLocalStorage(state.pokemons)
  },
  RECOVER_BACKUP: (state, backup: IPokemonTeamStore[]) => {
    state.pokemons = []
    state.pokemons = backup
  },
}

function updateLocalStorage(pokemons: IPokemonTeamStore[]) {
  localStorage.setItem('team', JSON.stringify(pokemons))
}
