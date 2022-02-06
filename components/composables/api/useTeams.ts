import { reactive, useContext } from '@nuxtjs/composition-api'
import { ITeam, StateApi } from '~/types'

export function useTeams() {
  const { $axios, env } = useContext()

  const stateTeam = reactive<StateApi<ITeam>>({
    loading: false,
    data: undefined,
    error: {},
  })

  const stateTeams = reactive<StateApi<ITeam[]>>({
    loading: false,
    data: undefined,
    error: {},
  })

  const route = `${env.customApi}/teams`

  function getTeams() {
    return new Promise<ITeam[]>((resolve, reject) => {
      $axios
        .$get<ITeam[]>(route)
        .then((data) => {
          stateTeams.data = data
          resolve(data)
        })
        .catch((error) => {
          stateTeams.error = error
          reject(error)
        })
        .finally(() => (stateTeams.loading = false))
    })
  }

  async function saveTeam(team: ITeam) {
    return await $axios.$post(route, {
      id: null,
      trainer: team.trainer,
      pokemonIds: team.pokemons.map((pokemon) => pokemon.id),
    })
  }

  async function updateTeam(team: ITeam) {
    return await $axios.$put(route, {
      id: team.id,
      trainer: team.trainer,
      pokemonIds: team.pokemons.map((pokemon) => pokemon.id),
    })
  }

  return {
    getTeams,
    saveTeam,
    updateTeam,
    stateTeam,
    stateTeams,
  }
}
