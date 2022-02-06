import { MutationTree } from 'vuex'
import { StateStore, IPokemonData, IPokemonTeamStore, ITrainer } from '~/types'

type OrderMutation = {
  id: number
  plusOrMinus: -1 | 1
}

export const state = () =>
  ({
    id: null,
    trainerId: null,
    trainerPseudo: null,
    pokemons: [],
  } as StateStore['team'])

export const mutations: MutationTree<StateStore['team']> = {
  SET_ID: (state, id: number) => {
    state.id = id
    updateLocalStorage(state)
  },
  SET_TRAINER: (state, trainer: ITrainer) => {
    state.trainerId = trainer.id
    state.trainerPseudo = trainer.pseudo
    updateLocalStorage(state)
  },
  SWITCH_POKEMON_TO_TEAM: (state, value: IPokemonData) => {
    const index = state.pokemons.findIndex((p) => p.id === value.id)
    if (index === -1)
      state.pokemons.push({
        ...value,
        quantity: 1,
        position: state.pokemons.length + 1,
      })
    else state.pokemons.splice(index, 1)
    updateLocalStorage(state)
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
    updateLocalStorage(state)
  },
  REMOVE_POKEMON_TO_TEAM: (state, id: number) => {
    const index = state.pokemons.findIndex((p) => p.id === id)
    state.pokemons.splice(index, 1)
    updateLocalStorage(state)
  },
  UPDATE_ORDER_POKEMON_TO_TEAM: (state, order: OrderMutation) => {
    const index = state.pokemons.findIndex((p) => p.id === order.id)
    if (index !== -1)
      state.pokemons.splice(
        index - order.plusOrMinus,
        0,
        state.pokemons.splice(index, 1)[0]
      )
    updateLocalStorage(state)
  },
  UPDATE_POKEMON_QUANTITY_TO_TEAM: (state, order: OrderMutation) => {
    const index = state.pokemons.findIndex((p) => p.id === order.id)
    switch (order.plusOrMinus) {
      case -1:
        if (state.pokemons[index].quantity > 1) state.pokemons[index].quantity--
        else state.pokemons.splice(index, 1)
        break
      case 1:
        state.pokemons[index].quantity++
        break
    }
    updateLocalStorage(state)
  },
  RECOVER_BACKUP: (state, backup: StateStore['team']) => {
    state = { ...backup }
  },
}

function updateLocalStorage(team: StateStore['team']) {
  localStorage.setItem('team', JSON.stringify(team))
}
