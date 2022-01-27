import { Pokemon } from 'pokenode-ts'
import { IPokemonData } from '~/types'

export function pokemonConverter(pokemon: Pokemon) {
  const pokemonData: IPokemonData = {
    id: pokemon.id,
    name: pokemon.name,
    evolveOrder: `#${pokemon.order}`,
    imageSrc: pokemon.sprites.other['official-artwork'].front_default,
    types: pokemon.types.map((item) => item.type.name),
    stats: pokemon.stats,
    evolutions: []
  }

  return { pokemonData }
}
