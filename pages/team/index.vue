<script lang="tsx">
import { defineComponent, useStore } from '@nuxtjs/composition-api'
import { StateStore } from '~/types'

import PokemonCard from '@/components/ui/pokemon/PokemonCard.vue'

export default defineComponent({
  name: 'HomeView',
  setup() {
    const store = useStore<StateStore>()

    return () => (
      <div>
        <nuxt-link to="/">
          <span class="btn-back">Retour à la liste</span>
        </nuxt-link>
        <div class="my-team">
          {store.state.team.pokemons
            .filter((p) => p.id)
            .map((pokemon) => {
              return <PokemonCard idPokemon={pokemon.id!!} pokemon={pokemon} />
            })}
        </div>
      </div>
    )
  },
})
</script>
<style lang="scss" scoped>
.my-team {
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
</style>
