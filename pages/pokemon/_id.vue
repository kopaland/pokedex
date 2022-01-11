<script lang="tsx">
import {
  defineComponent,
  InjectionKey,
  reactive,
  toRefs,
  useRoute,
  useStore,
} from '@nuxtjs/composition-api'
import _ from 'lodash'
import { PokemonSpecies } from 'pokenode-ts'
import { usePokemons } from '~/components/composables/api/usePokemons'
import { StateStore } from '~/types'

import PokemonStats from '~/components/ui/pokemon/PokemonStats.vue'
import PokemonEvolutions from '~/components/ui/pokemon/PokemonEvolutions.vue'

export const PokemonSpeciesProvider: InjectionKey<PokemonSpecies> = Symbol(
  'PokemonSpeciesProvider'
)

export default defineComponent({
  name: 'PokemonInfos',
  setup() {
    const store = useStore<StateStore>()
    const route = useRoute()
    const {
      getPokemonById,
      statePokemon,
      getPokemonSpeciesById,
      statePokemonSpecies,
    } = usePokemons()

    if (!store.state.pokemon.data) {
      getPokemonById(Number(route.value.params.id)).then(() => {
        store.commit('pokemon/SET_POKEMON', statePokemon.data)
        store.commit('pokemon/ADD_POKEMON_TO_CACHE', statePokemon.data)
      })
    } else {
      statePokemon.data = store.state.pokemon.data
    }

    getPokemonSpeciesById(Number(route.value.params.id))

    return {
      pokemon: reactive(toRefs(statePokemon)),
      pokemonSpecies: reactive(toRefs(statePokemonSpecies)),
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
              src={
                this.pokemon.data?.sprites.other['official-artwork']
                  .front_default
              }
              alt={this.pokemon.data?.name}
            />
          </div>
          <div class="">
            <p class="flex flex-col">
              {_.uniqBy(
                this.pokemonSpecies.data?.flavor_text_entries.filter(
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
          <PokemonStats value={this.pokemon.data?.stats} />
          {this.pokemon.data?.name &&
            this.pokemonSpecies.data?.evolution_chain.url && (
              <PokemonEvolutions
                pokemonName={this.pokemon.data?.name}
                evolutionUrl={this.pokemonSpecies.data?.evolution_chain.url}
              />
            )}
        </div>
      </div>
    )
  },
})
</script>
