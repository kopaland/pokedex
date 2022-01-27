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
      <div class="col-span-2">
        <h2>Evolutions</h2>
        <div class="flex gap-2">
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
