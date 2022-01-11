import { ChainLink, EvolutionChain, Pokemon, PokemonClient } from 'pokenode-ts'
import _ from 'lodash'
import { pokemonConverter } from '~/components/composables/converters/pokemonConverter'

export function evolutionConverter(
  evolution: EvolutionChain,
  pokemonName: string,
  cache: Pokemon[]
) {
const pokenodeApi = new PokemonClient()

  const currentPokemon = cache.find((p) => p.name === pokemonName)

  const getEvolvesName = (evolve: ChainLink): any => {
    if (!evolve.evolves_to || !evolve.evolves_to.length) {
      return evolve.species.name
    }
    return [
      evolve.species.name,
      _.flatMapDeep(evolve.evolves_to, getEvolvesName),
    ]
  }

  async function getEvolutions() {
    return await Promise.all([
      evolution.chain.species.name,
      ..._.flatMapDeep(evolution.chain.evolves_to, getEvolvesName),
    ].map(async (name) => {
      let findedPokemon = cache.find((p) => p.name === name)
      if (!findedPokemon) {
        findedPokemon = await pokenodeApi.getPokemonByName(name)
      }
      return {
        current: currentPokemon?.name === name,
        ...pokemonConverter(findedPokemon).pokemonCard,
      }
    }))
  }

  return {
    getEvolutions,
  }
}
