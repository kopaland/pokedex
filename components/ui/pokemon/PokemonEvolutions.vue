<script lang="tsx">
import {
  defineComponent,
  ref,
  useContext,
  useFetch,
  useStore,
} from '@nuxtjs/composition-api'
import { EvolutionChain } from 'pokenode-ts'
import { evolutionConverter } from '~/components/composables/converters/evolutionConverter'
import { IPokemonEvolution, IPokemonTeamStore, StateStore } from '~/types'

import PokemonCard from '@/components/ui/pokemon/PokemonCard.vue'

export default defineComponent({
  name: 'UIPokemonEvolutions',
  props: {
    pokemonName: {
      type: String,
      required: true,
    },
    evolutionUrl: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { $axios } = useContext()
    const store = useStore<StateStore>()
    const evolutions = ref<IPokemonEvolution[]>([])

    useFetch(async () => {
      if (!store.state.pokemon.data?.evolutions.length) {
        const evolutionChain = await $axios.$get<EvolutionChain>(
          props.evolutionUrl
        )
        evolutions.value = await evolutionConverter(
          evolutionChain,
          props.pokemonName,
          store.state.pokemon.cached
        ).getEvolutions()
        store.commit('pokemon/SET_POKEMON_EVOLUTIONS', evolutions.value)
      } else {
        evolutions.value = store.state.pokemon.data.evolutions
      }
      evolutions.value.forEach((e) => {
        store.commit('pokemon/ADD_POKEMON_TO_CACHE', e)
      })
    })

    return () => (
      <div class="pokemon-evolutions">
        <h2>Evolutions</h2>
        <div>
          {evolutions.value.map((pokemon) => {
            if (pokemon.id)
              return (
                <PokemonCard
                  idPokemon={pokemon.id}
                  pokemon={pokemon as unknown as IPokemonTeamStore}
                />
              )
            return null
          })}
        </div>
      </div>
    )
  },
  fetchOnServer: false,
})
</script>
<style lang="scss" scoped>
.pokemon-evolutions {
  & > div {
    display: grid;
    margin-top: 1.5rem;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    column-gap: 1.5rem;
    row-gap: 2.5rem;

    @media (min-width: 640px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (min-width: 1024px) {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    @media (min-width: 1280px) {
      column-gap: 2rem;
    }
  }
}
</style>
