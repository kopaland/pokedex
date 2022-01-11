<script lang="tsx">
import {
  defineComponent,
  ref,
  useContext,
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

    $axios.$get<EvolutionChain>(props.evolutionUrl).then((data) => {
      evolutionConverter(data, props.pokemonName, store.state.pokemon.cached)
        .getEvolutions()
        .then((e) => evolutions.value.push(...e))
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
})
</script>
