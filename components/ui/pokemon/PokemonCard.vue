<script lang="tsx">
import {
  computed,
  defineComponent,
  PropType,
  useContext,
  useStore,
  watch,
} from '@nuxtjs/composition-api'
import { usePokemons } from '~/components/composables/api/usePokemons'
import { IPokemonTeamStore, StateStore } from '~/types'

import SkeletonLoader from '@/components/ui/SkeletonLoader.vue'
import IncrementDecrementButtons from '~/components/ui/IncrementDecrementButtons.vue'

export default defineComponent({
  name: 'UIPokemonCard',
  props: {
    idPokemon: { type: Number, required: true },
    pokemon: {
      type: Object as PropType<IPokemonTeamStore | undefined>,
      default: undefined,
    },
    searchTerm: { type: String, default: '' },
  },
  setup(props) {
    const store = useStore<StateStore>()
    const { route } = useContext()
    const { getPokemonById, statePokemon } = usePokemons()
    const showCard = computed(() => {
      if (props.searchTerm)
        return statePokemon.data?.name.includes(props.searchTerm)
      return true
    })
    const pokemon = computed(() => {
      if (statePokemon.data) {
        return statePokemon.data
      } else return props.pokemon
    })
    const disabled = computed(() => {
      return {
        plus:
          store.state.team.pokemons.findIndex(
            (p) => p.id === pokemon.value?.id
          ) === 0,
        minus:
          store.state.team.pokemons.findIndex(
            (p) => p.id === pokemon.value?.id
          ) ===
          store.state.team.pokemons.length - 1,
      }
    })
    const quantity = computed(
      () =>
        store.state.team.pokemons.find((p) => p.id === pokemon.value?.id)
          ?.quantity
    )

    function setPokemonStore() {
      store.commit('pokemon/SET_POKEMON', statePokemon.data)
      store.commit('pokemon/ADD_POKEMON_TO_CACHE', statePokemon.data)
    }

    function addToTeam() {
      store.commit('team/ADD_POKEMON_TO_TEAM', pokemon.value)
    }

    function updatePosition(plusOrMinus: -1 | 1) {
      store.commit('team/UPDATE_ORDER_POKEMON_TO_TEAM', {
        id: props.pokemon?.id,
        plusOrMinus,
      })
    }

    function updateQuantity(plusOrMinus: -1 | 1) {
      store.commit('team/UPDATE_POKEMON_QUANTITY_TO_TEAM', {
        id: props.pokemon?.id,
        plusOrMinus,
      })
    }

    watch(
      () => props.idPokemon,
      (val) => {
        if (val) getPokemonById(val)
      },
      { immediate: true }
    )

    return () => (
      <div class="pokemon-card" vShow={showCard.value}>
        {statePokemon.loading ? (
          <SkeletonLoader />
        ) : (
          <div class="pokemon-card__body">
            <nuxt-link to={`/pokemon/${props.idPokemon}`}>
              <img
                class="pokemon-card__image"
                src={pokemon.value?.imageSrc}
                alt={pokemon.value?.name}
                onClick={setPokemonStore}
              />
            </nuxt-link>
            <div class="pokemon-card__infos">
              <a href="#">
                <h3 class="pokemon-card__infos__name">
                  {pokemon.value?.name} {pokemon.value?.evolveOrder}
                </h3>
              </a>
              <div class="pokemon-card__infos__types">
                {pokemon.value?.types.map((type) => {
                  return <span>{type}</span>
                })}
              </div>
            </div>
            {route.value.name !== 'team' ? (
              <div class="pokemon-card__add-to-team">
                <button class="btn-outline" onClick={addToTeam}>
                  Ajouter à mon équipe
                </button>
              </div>
            ) : (
              <div>
                <IncrementDecrementButtons
                  disabled={disabled.value}
                  onClickPlusOrMinus={updatePosition}
                >
                  <p slot="title">Position</p>
                </IncrementDecrementButtons>
                <IncrementDecrementButtons onClickPlusOrMinus={updateQuantity}>
                  <p slot="title">Quantité</p>
                  <input
                    value={quantity.value}
                    disabled
                    class="input-increment-decrement"
                  />
                </IncrementDecrementButtons>
              </div>
            )}
          </div>
        )}
      </div>
    )
  },
})
</script>
<style lang="scss" scoped>
.pokemon-card {
  &__body {
    background-color: #ffffff;
    max-width: 24rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  &__image {
    padding: 2rem;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    &:hover {
      transform: scaleX(1.25) scaleY(1.25);
    }
  }
  &__infos {
    padding: 1.25rem;
    padding-top: 0;
    &__name {
      color: #111827;
      font-size: 1.25rem;
      line-height: 1.75rem;
      font-weight: 600;
      letter-spacing: -0.025em;
      text-transform: capitalize;
    }
    &__types {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      & > span {
        display: inline-flex;
        padding: 0 0.75rem;
        background-color: #db2777;
        color: #ffffff;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        height: 1.5rem;
        border-radius: 9999px;
      }
    }
  }
  &__add-to-team {
    display: flex;
    padding: 1rem;
    color: #111827;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (min-width: 768px) {
      flex-direction: row;
    }
  }
}
</style>
