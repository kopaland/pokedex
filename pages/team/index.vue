<script lang="tsx">
import {
  defineComponent,
  useStore,
} from '@nuxtjs/composition-api'
import { StateStore } from '~/types'

import PokemonCard from '@/components/ui/pokemon/PokemonCard.vue'

export default defineComponent({
  name: 'HomeView',
  setup() {
    const store = useStore<StateStore>()

    return () => <div class="">
        <nuxt-link to="/">
          <span class="inline-flex bg-blue-500 text-white rounded-full h-6 px-3 justify-center items-center">
            Retour à la liste
          </span>
        </nuxt-link>
        <div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {store.state.team.pokemons
            .filter((p) => p.id)
            .map((pokemon) => {
              return <PokemonCard idPokemon={pokemon.id!!} pokemon={pokemon} />
            })}
        </div>
      </div>
  },
})
</script>
