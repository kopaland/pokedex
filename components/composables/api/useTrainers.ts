import { reactive, useContext } from '@nuxtjs/composition-api'
import { ITrainer, StateApi } from '~/types'

export function useTrainers() {
  const { $axios, env } = useContext()

  const stateTrainer = reactive<StateApi<ITrainer>>({
    loading: false,
    data: undefined,
    error: {},
  })

  const stateTrainers = reactive<StateApi<ITrainer[]>>({
    loading: false,
    data: undefined,
    error: {},
  })

  const route = `${env.customApi}/trainers`

  function getTrainers() {
    return new Promise<ITrainer[]>((resolve, reject) => {
      $axios
        .$get<ITrainer[]>(route)
        .then((data) => {
          stateTrainers.data = data
          resolve(data)
        })
        .catch((error) => {
          stateTrainers.error = error
          reject(error)
        })
        .finally(() => (stateTrainers.loading = false))
    })
  }

  async function saveTrainer(trainer: ITrainer) {
    await $axios.$post(route, {
      id: null,
      pseudo: trainer.pseudo,
    })
  }

  return {
    getTrainers,
    saveTrainer,
    stateTrainer,
    stateTrainers,
  }
}
