import { reactive, useContext } from '@nuxtjs/composition-api'
import { ITeam, StateApi } from '~/types'

export function useTeams() {
  const { $axios, $alert, env } = useContext()

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
        .then((data: ITeam[]) => {
          stateTeams.data = data
          resolve(data)
        })
        .catch((error) => {
          stateTeams.error = error
          $alert.show = true
          $alert.message = error.message
          reject(error)
        })
        .finally(() => (stateTeams.loading = false))
    })
  }

  async function saveTeam(team: ITeam) {
    return await $axios
      .$post(route, {
        id: null,
        trainer: team.trainer,
        pokemonIds: team.pokemons.map((pokemon) => pokemon.id),
      })
      .then((data) => {
        $alert.show = true
        $alert.type = 'SUCCESS'
        $alert.message = 'Votre équipe a été publié avec success'
        return data
      })
      .catch((error) => {
        $alert.show = true
        $alert.message = error.message
      })
  }

  async function updateTeam(team: ITeam) {
    return await $axios
      .$put(route, {
        id: team.id,
        trainer: team.trainer,
        pokemonIds: team.pokemons.map((pokemon) => pokemon.id),
      })
      .then((data) => {
        $alert.show = true
        $alert.type = 'SUCCESS'
        $alert.message = 'Votre équipe a été modifié avec success'
        return data
      })
      .catch((error) => {
        $alert.show = true
        $alert.message = error.message
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
