<script lang="tsx">
import { defineComponent } from '@vue/composition-api'

import PokemonDropdownList from '@/components/ui/pokemon/PokemonDropdownList.vue'

export default defineComponent({
  name: 'UIHeader',
  setup() {
    return () => (
      <div class="header">
        <div class="header__container">
          <div class="header__container__logo">
            <img src={require('~/assets/pokedex-logo.png')} />
          </div>
          <div class="header__container__dropdown">
            <PokemonDropdownList />
          </div>
        </div>
      </div>
    )
  },
})
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  padding: 0 1rem;
  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;

    @media (min-width: 640px) {
      padding: 1rem 0;
    }
    &__logo {
      max-width: 5rem;
    }
    &__dropdown {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 0.5rem;
      justify-content: space-between;
    }
  }
}
</style>
