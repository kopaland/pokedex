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
      <div class="homepage">
        <input
          vModel={this.debounceValue}
          onInput={(value: InputEvent) =>
            this.debounceListener((value.target as any).value)
          }
          type="text"
          placeholder="Recherche..."
          class="homepage__search"
        />
        <div class="homepage__results">
          {this.ids.map((id) => {
            return <PokemonCard idPokemon={id} searchTerm={this.searchTerm} />
          })}
        </div>
      </div>
    )
  },
})
</script>
<style lang="scss" scoped>
.homepage {
  &__search {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    background-color: #f3f4f6;
    width: 33.333333%;
    border-bottom-width: 2px;
    border-color: #4b5563;
    outline: 0;
    &:focus {
      border-color: #34d399;
    }
  }
  &__results {
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
