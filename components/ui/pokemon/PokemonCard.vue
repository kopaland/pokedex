<script lang="tsx">
import {
  computed,
  defineComponent,
  inject,
  PropType,
  useContext,
  useStore,
  watch,
} from '@nuxtjs/composition-api'
import { usePokemons } from '~/components/composables/api/usePokemons'
import { pokemonConverter } from '~/components/composables/converters/pokemonConverter'
import { IPokemonTeamStore, StateStore } from '~/types'
import { PokemonsProvider } from '~/layouts/default.vue'

import IncremenDecrementButtons from '@/components/ui/IncremenDecrementButtons.vue'

export default defineComponent({
  name: 'UIPokemonCard',
  props: {
    idPokemon: { type: Number, required: true },
    pokemon: {
      type: Object as PropType<IPokemonTeamStore | undefined>,
      default: undefined,
    },
  },
  setup(props) {
    const store = useStore<StateStore>()
    const { route } = useContext()
    const { getPokemonById, statePokemon } = usePokemons()
    const pokemonsProvide = inject(PokemonsProvider)
    const showCard = computed(() => {
      if (pokemonsProvide?.search)
        return statePokemon.data?.name.includes(pokemonsProvide.search)
      return true
    })
    const pokemon = computed(() => {
      if (statePokemon.data) {
        // store.commit('pokemon/ADD_POKEMON_TO_CACHE', statePokemon.data)
        return pokemonConverter(statePokemon.data).pokemonCard
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
      <div class="group relative" vShow={showCard.value}>
        {statePokemon.loading ? (
          <div class="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
            <div class="flex animate-pulse flex-row items-center h-full justify-center space-x-5">
              <div class="bg-gray-300 rounded-md p-32 my-4 space-y-3"></div>
            </div>
          </div>
        ) : (
          <div class="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
            <nuxt-link to={`/pokemon/${props.idPokemon}`}>
              <img
                class="transform hover:scale-125 rounded-t-lg p-8"
                src={pokemon.value?.imageSrc}
                alt={pokemon.value?.name}
                onClick={setPokemonStore}
              />
            </nuxt-link>
            <div class="px-5 pb-5">
              <a href="#">
                <h3 class="text-gray-900 capitalize font-semibold text-xl tracking-tight dark:text-white">
                  {pokemon.value?.name} {pokemon.value?.evolveOrder}
                </h3>
              </a>
              <div class="flex items-center gap-2">
                {pokemon.value?.types.map((type) => {
                  return (
                    <span class="inline-flex bg-pink-600 text-white rounded-full h-6 px-3 justify-center items-center">
                      {type}
                    </span>
                  )
                })}
              </div>
            </div>
            {route.value.name !== 'team' ? (
              <div class="p-4 flex flex-col md:flex-row justify-center text-gray-900">
                <button
                  class="px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none"
                  onClick={addToTeam}
                >
                  Ajouter à mon équipe
                </button>
              </div>
            ) : (
              <div>
                <IncremenDecrementButtons
                  disabled={disabled.value}
                  onClickPlusOrMinus={updatePosition}
                >
                  <p slot="title">Position</p>
                </IncremenDecrementButtons>
                <IncremenDecrementButtons onClickPlusOrMinus={updateQuantity}>
                  <p slot="title">Quantité</p>
                  <input
                    value={quantity.value}
                    disabled
                    class="w-8 text-center"
                  />
                </IncremenDecrementButtons>
              </div>
            )}
          </div>
        )}
      </div>
    )
  },
})
</script>
