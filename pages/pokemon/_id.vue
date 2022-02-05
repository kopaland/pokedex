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
          <span class="btn-back">Retour à la liste</span>
        </nuxt-link>
        <div class="pokemon">
          <div class="pokemon__image">
            <img src={this.pokemon?.imageSrc} alt={this.pokemon?.name} />
          </div>
          <div class="pokemon__resume">
            <p>
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
          <PokemonStats value={this.pokemon?.stats} class="pokemon__stats" />
          {this.pokemon?.name && this.pokemonSpecies?.evolution_chain.url && (
            <PokemonEvolutions
              pokemonName={this.pokemon?.name}
              evolutionUrl={this.pokemonSpecies?.evolution_chain.url}
              class="pokemon__evos"
            />
          )}
        </div>
      </div>
    )
  },
})
</script>
<style lang="scss" scoped>
.pokemon {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  grid-template-rows: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  align-items: center;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  &__image {
    padding: 2rem;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }
  &__resume > p {
    display: flex;
    flex-direction: column;
  }
  &__stats {
    grid-column: span 2 / span 2;
    gap: 0.5rem;
  }
  &__evos {
    grid-column: span 2 / span 2;
  }
}
</style>
