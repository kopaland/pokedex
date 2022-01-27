import { reactive, useContext } from '@nuxtjs/composition-api'
import { NamedAPIResource, PokemonSpecies } from 'pokenode-ts'
import { useWrapper } from '~/components/composables/utils/useWrapper'
import { pokemonConverter } from '~/components/composables/converters/pokemonConverter'
import { IPokemonData, StateApi } from '~/types'

export function usePokemons() {
  const { $pokenodeApi } = useContext()
  const { getIdFromUrl } = useWrapper()

  const statePokemon = reactive<StateApi<IPokemonData>>({
    loading: false,
    data: undefined,
    error: {},
  })

  const statePokemonSpecies = reactive<StateApi<PokemonSpecies>>({
    loading: false,
    data: undefined,
    error: {},
  })

  function getPokemonById(id: number) {
    return new Promise<IPokemonData>((resolve, reject) => {
      $pokenodeApi.pokemon
        .getPokemonById(id)
        .then((data) => {
          statePokemon.data = pokemonConverter(data).pokemonData
          resolve(statePokemon.data)
        })
        .catch((error) => {
          statePokemon.error = error
          reject(error)
        })
        .finally(() => (statePokemon.loading = false))
    })
  }

  async function getPokemonByName(name: string) {
    await $pokenodeApi.pokemon
      .getPokemonByName(name)
      .then((data) => {
        statePokemon.data = pokemonConverter(data).pokemonData
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

  function getPokemonSpeciesById(id: number) {
    return new Promise<PokemonSpecies>((resolve, reject) => {
      $pokenodeApi.pokemon
        .getPokemonSpeciesById(id)
        .then((data) => {
          statePokemonSpecies.data = data
          resolve(data)
        })
        .catch((error) => {
          statePokemonSpecies.error = error
          reject(error)
        })
        .finally(() => (statePokemonSpecies.loading = false))
    })
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
