<script lang="tsx">
import { defineComponent, onMounted, useStore } from '@nuxtjs/composition-api'
import Hearder from '@/components/ui/Header.vue'
import { StateStore } from '~/types'

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
      <div class="app">
        <header>
          <Hearder />
        </header>
        <main>
          <nuxt keep-alive class="app__nuxt" />
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

header {
  background-color: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.app {
  margin: 0;
  background-color: #f3f4f6;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  width: 100%;
  min-height: 100%;
  min-height: 100vh;

  &__nuxt {
    padding: 1rem 4rem;
    max-width: 42rem;

    @media (min-width: 640px) {
      padding: 1.5rem 3rem;
    }

    @media (min-width: 1024px) {
      padding-left: 2rem;
      padding-right: 2rem;
      max-width: 80rem;
    }
  }
}
</style>
