<script lang="tsx">
import {
  defineComponent,
  useAsync,
  useRoute,
  useStore,
} from '@nuxtjs/composition-api'
import _ from 'lodash'
import { usePokemons } from '~/components/composables/api/usePokemons'
import { IPokemonData, StateStore } from '~/types'

import PokemonStats from '~/components/ui/pokemon/PokemonStats.vue'
import PokemonEvolutions from '~/components/ui/pokemon/PokemonEvolutions.vue'

export default defineComponent({
  name: 'PokemonInfos',
  setup() {
    const store = useStore<StateStore>()
    const route = useRoute()
    const { getPokemonById, statePokemon, getPokemonSpeciesById } =
      usePokemons()

    const pokemon = useAsync(() => {
      return new Promise<IPokemonData>((resolve) => {
        const pokemonId = Number(route.value.params.id)
        if (store.state.pokemon.data?.id !== pokemonId) {
          getPokemonById(pokemonId).then((data) => {
            store.commit('pokemon/SET_POKEMON', data)
            store.commit('pokemon/ADD_POKEMON_TO_CACHE', data)
            resolve(data)
          })
        } else if (store.state.pokemon.data?.id === pokemonId) {
          statePokemon.data = store.state.pokemon.data
          resolve(statePokemon.data)
        }
      })
    })

    const pokemonSpecies = useAsync(() =>
      getPokemonSpeciesById(Number(route.value.params.id))
    )

    return {
      pokemon,
      pokemonSpecies,
    }
  },
  render() {
    return (
      <div>
        <nuxt-link to="/">
          <span class="inline-flex bg-blue-500 text-white rounded-full h-6 px-3 justify-center items-center">
            Retour à la liste
          </span>
        </nuxt-link>
        <div class="grid grid-cols-1 md:grid-cols-2 grid-rows-4 gap-4">
          <div class="">
            <img
              class="rounded-t-lg p-8"
              src={this.pokemon?.imageSrc}
              alt={this.pokemon?.name}
            />
          </div>
          <div class="">
            <p class="flex flex-col">
              {_.uniqBy(
                this.pokemonSpecies?.flavor_text_entries.filter(
                  (f) => f.language.name === 'fr'
                ),
                (f) => {
                  return f.flavor_text
                }
              ).map((text) => {
                return <span>{text.flavor_text}</span>
              })}
            </p>
          </div>
          <PokemonStats value={this.pokemon?.stats} />
          {this.pokemon?.name && this.pokemonSpecies?.evolution_chain.url && (
            <PokemonEvolutions
              pokemonName={this.pokemon?.name}
              evolutionUrl={this.pokemonSpecies?.evolution_chain.url}
            />
          )}
        </div>
      </div>
    )
  },
})
</script>
