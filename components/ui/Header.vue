<script lang="tsx">
import { defineComponent } from '@vue/composition-api'

import PokemonDropdownList from '@/components/ui/pokemon/PokemonDropdownList.vue'

export default defineComponent({
  name: 'UIHeader',
  setup() {
    return () => (
      <div class="bg-white shadow">
        <div class="container mx-auto px-4">
          <div class="flex items-center justify-between py-4">
            <div>
              <img src="~/assets/pokedex-logo.png" />
            </div>

            <div class="hidden sm:flex sm:items-center">
              <PokemonDropdownList />
            </div>

            <div class="sm:hidden cursor-pointer">
              <img src="~/assets/pokedex-logo.png" />
            </div>
          </div>

          <div class="block sm:hidden bg-white py-2">
            <div class="flex flex-col">
              <div class="flex justify-between items-center pt-2">
                <PokemonDropdownList />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
})
</script>