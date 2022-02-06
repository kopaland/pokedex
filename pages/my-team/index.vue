<script lang="tsx">
import { defineComponent, useContext, useStore } from '@nuxtjs/composition-api'
import { StateStore } from '~/types'

import PokemonCard from '@/components/ui/pokemon/PokemonCard.vue'

export default defineComponent({
  name: 'MyTeamView',
  setup() {
    const store = useStore<StateStore>()
    const { $modal } = useContext()

    return () => (
      <div class="my-team">
        <div class="my-team__btns">
          <nuxt-link to="/">
            <span class="btn-back">Retour à la liste</span>
          </nuxt-link>
          <span class="btn-outline-light" onClick={() => ($modal.show = true)}>
            Publier mon équipe
          </span>
        </div>
        <div class="my-team__list">
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
  &__btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .btn-outline-light {
      max-width: 12rem;
      background-color: #db2777;
      cursor: pointer;
    }
  }
  &__list {
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
