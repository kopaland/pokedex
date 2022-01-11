import { Plugin } from '@nuxt/types'
import { EvolutionClient, PokemonClient } from 'pokenode-ts'

const pokenodeApiPlugin: Plugin = (_, inject) => {
  inject('pokenodeApi', {
    pokemon: new PokemonClient(),
    evolution: new EvolutionClient()
  })
}

export default pokenodeApiPlugin

// import { defineNuxtPlugin } from '@nuxtjs/composition-api'

// export default defineNuxtPlugin((_, inject) => {
//     inject('$pokenodeApi', new PokemonClient())
// })