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
    const position = computed(() => {
      return {
        isFirst:
          store.state.team.pokemons.findIndex(
            (p) => p.id === pokemon.value?.id
          ) === 0,
        isLast:
          store.state.team.pokemons.findIndex(
            (p) => p.id === pokemon.value?.id
          ) ===
          store.state.team.pokemons.length - 1,
      }
    })

    function setPokemonStore() {
      store.commit('pokemon/SET_POKEMON', statePokemon.data)
    }

    function addToTeam() {
      store.commit('team/ADD_POKEMON_TO_TEAM', pokemon.value)
    }

    function updatePosition(upOrDown: -1 | 1) {
      store.commit('team/UPDATE_ORDER_POKEMON_TO_TEAM', {
        id: props.pokemon?.id,
        upOrDown,
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
              <div class="p-4 flex justify-between">
                <p>Position</p>
                <div class="flex">
                  <button
                    disabled={position.value.isFirst}
                    type="button"
                    class="bg-green-600 p-1.5 font-bold rounded"
                    onClick={() => updatePosition(1)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    disabled={position.value.isLast}
                    type="button"
                    onClick={() => updatePosition(-1)}
                    class="bg-yellow-600 p-1.5 font-bold rounded"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  },
})
</script>
