<script lang="tsx">
import {
  defineComponent,
  InjectionKey,
  onMounted,
  useStore,
} from '@nuxtjs/composition-api'
import Hearder from '@/components/ui/Header.vue'
import { StateStore } from '~/types'

interface PokemonsData {
  ids: number[]
  lastIds: number[]
  search: string
  loading: boolean
}

export const PokemonsProvider: InjectionKey<PokemonsData> =
  Symbol('PokemonsProvider')

export default defineComponent({
  name: 'DefaultLayout',
  setup(_props) {
    const store = useStore<StateStore>()

    onMounted(() => {
      const teamPokemons =
        localStorage.getItem('team') !== 'undefined'
          ? localStorage.getItem('team') ?? '[]'
          : '[]'
      store.commit('team/RECOVER_BACKUP', JSON.parse(teamPokemons))
    })

    return () => (
      <div class="app min-h-full bg-gray-100 font-sans w-full min-h-screen m-0">
        <header>
          <Hearder />
        </header>
        <main class="container mx-auto px-4">
          <nuxt class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8" />
        </main>
        <footer></footer>
      </div>
    )
  },
})
</script>

<style lang="scss">
body {
  min-height: 100vh;
  /* mobile viewport bug fix */
  /* Mozilla-based browsers will ignore this. */
  min-height: -webkit-fill-available;
  /* WebKit-based browsers will ignore this. */
  min-height: -moz-available;
}

html {
  height: -webkit-fill-available;
}
</style>
