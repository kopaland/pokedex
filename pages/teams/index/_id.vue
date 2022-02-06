<script lang="tsx">
import {
  computed,
  defineComponent,
  PropType,
  useRoute,
} from '@nuxtjs/composition-api'
import { IPokemonTeamStore, ITeam } from '~/types'

import PokemonCard from '@/components/ui/pokemon/PokemonCard.vue'

export default defineComponent({
  name: 'TeamView',
  props: {
    teams: {
      type: Array as PropType<ITeam[]>,
      default: () => {
        return []
      },
    },
  },
  setup(props) {
    const route = useRoute()

    const selectedTeam = computed(
      () =>
        props.teams.find((t) => t.id === Number(route.value.params.id))
    )

    return () => (
      <div>
        <h2>Equipe de {selectedTeam.value?.trainer.pseudo || '...'}</h2>
        <div class="team-pokemons">
          {selectedTeam.value?.pokemons.map((pokemon) => (
            <PokemonCard
              idPokemon={pokemon.id!!}
              pokemon={pokemon as IPokemonTeamStore}
            />
          ))}
        </div>
      </div>
    )
  },
})
</script>
<style lang="scss" scoped>
.team-pokemons {
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
