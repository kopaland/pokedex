import { reactive, useContext } from '@nuxtjs/composition-api'
import { NamedAPIResource, Pokemon, PokemonSpecies } from 'pokenode-ts'
import { useWrapper } from '~/components/composables/utils/useWrapper'
import { StateApi } from '~/types'

export function usePokemons() {
  const { $pokenodeApi } = useContext()
  const { getIdFromUrl } = useWrapper()

  const statePokemon = reactive<StateApi<Pokemon>>({
    loading: false,
    data: undefined,
    error: {},
  })

  const statePokemonSpecies = reactive<StateApi<PokemonSpecies>>({
    loading: false,
    data: undefined,
    error: {},
  })

  async function getPokemonById(id: number) {
    await $pokenodeApi.pokemon
      .getPokemonById(id)
      .then((data) => {
        statePokemon.data = data
      })
      .catch((error) => {
        statePokemon.error = error
      })
      .finally(() => (statePokemon.loading = false))
  }

  async function getPokemonByName(name: string) {
    await $pokenodeApi.pokemon
      .getPokemonByName(name)
      .then((data) => {
        statePokemon.data = data
      })
      .catch((error) => {
        statePokemon.error = error
      })
      .finally(() => (statePokemon.loading = false))
  }

  async function getPokemonFromNamedAPIResource(
    namedAPIResource: NamedAPIResource
  ) {
    const idPokemon = getIdFromUrl(namedAPIResource.url)

    if (idPokemon) {
      await getPokemonById(idPokemon)
    }
  }

  async function getPokemonSpeciesById(id: number) {
    await $pokenodeApi.pokemon
    .getPokemonSpeciesById(id)
    .then((data) => {
      statePokemonSpecies.data = data
    })
    .catch((error) => {
      statePokemonSpecies.error = error
    })
    .finally(() => (statePokemonSpecies.loading = false))
  }

  async function getPokemonSpeciesByName(name: string) {
    await $pokenodeApi.pokemon
    .getPokemonSpeciesByName(name)
    .then((data) => {
      statePokemonSpecies.data = data
    })
    .catch((error) => {
      statePokemonSpecies.error = error
    })
    .finally(() => (statePokemonSpecies.loading = false))
  }

  return {
    getPokemonById,
    getPokemonByName,
    getPokemonFromNamedAPIResource,
    statePokemon,
    getPokemonSpeciesById,
    getPokemonSpeciesByName,
    statePokemonSpecies,
  }
}
