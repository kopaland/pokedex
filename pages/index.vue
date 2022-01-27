<script lang="tsx">
import {
  defineComponent,
  reactive,
  ref,
  toRefs,
  useContext,
  useRoute,
} from '@nuxtjs/composition-api'
import { useGlobal } from '~/components/composables/utils/useGlobal'
import { useWrapper } from '~/components/composables/utils/useWrapper'

import PokemonCard from '@/components/ui/pokemon/PokemonCard.vue'

export default defineComponent({
  name: 'HomeView',
  setup() {
    const route = useRoute()
    const { $pokenodeApi } = useContext()
    const pokemons = reactive({
      ids: [] as number[],
      lastIds: [] as number[],
      offset: 0,
      limit: 10,
      total: 0,
      loading: false,
    })
    const searchTerm = ref('')
    const { debounceValue, debounceListener } =
      useGlobal().debounceInput<string>(1000, (value: string) => {
        pokemons.loading = true
        if (value) {
          searchTerm.value = value
          $pokenodeApi.pokemon
            .getPokemonByName(value)
            .then((data) => (pokemons.ids = [data.id]))
            .catch(() => {
              resetPokemons()
            })
            .finally(() => (pokemons.loading = false))
        } else {
          searchTerm.value = ''
          resetPokemons()
        }
      })

    if (process.client)
      window.addEventListener(
        'scroll',
        () => {
          const { scrollTop, scrollHeight, clientHeight } =
            document.documentElement
          if (
            scrollTop + clientHeight >= scrollHeight - 5 &&
            !pokemons.loading &&
            route.value.name === 'index'
          ) {
            pokemons.offset = pokemons.offset + pokemons.limit
            getListPokemons()
          }
        },
        {
          passive: true,
        }
      )

    function getListPokemons() {
      pokemons.loading = true
      $pokenodeApi.pokemon
        .listPokemons(pokemons.offset, pokemons.limit)
        .then((data) => {
          pokemons.ids.push(
            ...data.results.map((r: any) => useWrapper().getIdFromUrl(r.url))
          )
          pokemons.lastIds = pokemons.ids
        })
        .finally(() => (pokemons.loading = false))
    }

    function resetPokemons() {
      pokemons.ids = pokemons.lastIds
    }

    getListPokemons()

    return {
      ...toRefs(pokemons),
      debounceValue,
      debounceListener,
      searchTerm,
    }
  },
  render() {
    return (
      <div class="">
        <input
          vModel={this.debounceValue}
          onInput={(value: InputEvent) =>
            this.debounceListener((value.target as any).value)
          }
          type="text"
          placeholder="Recherche..."
          class="bg-gray-100 w-1/3 py-2 border-b-2 border-gray-600 outline-none focus:border-green-400"
        />
        <div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {this.ids.map((id) => {
            return <PokemonCard idPokemon={id} searchTerm={this.searchTerm} />
          })}
        </div>
      </div>
    )
  },
})
</script>
