<script lang="tsx">
import { defineComponent, useStore } from '@nuxtjs/composition-api'
import { StateStore } from '~/types'

export default defineComponent({
  name: 'UIPokemonDropdownList',
  setup() {
    const store = useStore<StateStore>()

    function removeToTeam(id: number) {
      store.commit('team/REMOVE_POKEMON_TO_TEAM', id)
    }

    return () => (
      <div class=" relative inline-block text-left dropdown">
        <span class="rounded-md shadow-sm">
          <button
            class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
            type="button"
            aria-haspopup="true"
            aria-expanded="true"
            aria-controls="headlessui-menu-items-117"
            disabled={store.state.team.pokemons.length === 0}
          >
            <span>Mon équipe</span>
            <svg
              class="w-5 h-5 ml-2 -mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </span>
        <div class="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95">
          <div
            class="absolute sm:right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
            aria-labelledby="headlessui-menu-button-1"
            id="headlessui-menu-items-117"
            role="menu"
          >
            {store.state.team.pokemons.slice(0, 5).map((data) => {
              return (
                <div class="p-2 flex bg-white hover:bg-gray-100 cursor-pointer border-b border-gray-100">
                  <div class="p-2 w-12">
                    <img src={data.imageSrc} alt={data.name} />
                  </div>
                  <div class="flex-auto text-sm w-32">
                    <div class="capitalize font-bold">{data.name}</div>
                    <div class="text-gray-400">Qt: {data.quantity || 1}</div>
                  </div>
                  <div class="flex flex-col w-18 font-medium items-end">
                    <div class="w-4 h-4 mb-6 hover:bg-red-200 rounded-full cursor-pointer text-red-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-trash-2"
                        onClick={() => removeToTeam(data.id!!)}
                      >
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                    </div>
                  </div>
                </div>
              )
            })}
            <div class="py-1">
              <nuxt-link
                to="/team"
                tabindex="3"
                class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
                role="menuitem"
              >
                Voir mon équipe
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    )
  },
})
</script>

<style scoped>
.dropdown:focus-within .dropdown-menu {
  opacity: 1;
  transform: translate(0) scale(1);
  visibility: visible;
}
</style>
