import { reactive, useContext } from '@nuxtjs/composition-api'
import { EvolutionChain, NamedAPIResource } from 'pokenode-ts'
import { StateApi } from '~/types'
import { useWrapper } from '~/components/composables/utils/useWrapper'

export function useEvolutions() {
  const { $pokenodeApi } = useContext()
  const { getIdFromUrl } = useWrapper()

  const stateEvolutions = reactive<StateApi<EvolutionChain>>({
    loading: false,
    data: undefined,
    error: {},
  })

  async function getEvolutionsById(id: number) {
    await $pokenodeApi.evolution
      .getEvolutionChainById(id)
      .then((data) => {
        stateEvolutions.data = data
      })
      .catch((error) => {
        stateEvolutions.error = error
      })
      .finally(() => (stateEvolutions.loading = false))
  }

  async function getEvolutionsFromNamedAPIResource(
    namedAPIResource: NamedAPIResource
  ) {
    const idPokemon = getIdFromUrl(namedAPIResource.url)

    if (idPokemon) {
      await getEvolutionsById(idPokemon)
    }
  }

  return {
    getEvolutionsById,
    getEvolutionsFromNamedAPIResource,
    stateEvolutions,
  }
}
