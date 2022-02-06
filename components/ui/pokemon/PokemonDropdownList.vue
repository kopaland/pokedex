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
      <div class="pokemon-dropdown">
        <span>
          <button
            class="btn-outline-light"
            type="button"
            aria-haspopup="true"
            aria-expanded="true"
            aria-controls="headlessui-menu-items-117"
          >
            <span>Equipes</span>
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </span>
        <div class="pokemon-dropdown__wrapper dropdown-menu">
          <div
            class="pokemon-dropdown__container"
            aria-labelledby="headlessui-menu-button-1"
            id="headlessui-menu-items-117"
            role="menu"
          >
            {store.state.team.pokemons.slice(0, 5).map((data) => {
              return (
                <div class="pokemon-dropdown__row">
                  <div class="pokemon-dropdown__image">
                    <nuxt-link to={`/pokemon/${data.id}`}>
                      <img src={data.imageSrc} alt={data.name} />
                    </nuxt-link>
                  </div>
                  <div class="pokemon-dropdown__infos">
                    <div class="pokemon-dropdown__infos__name">{data.name}</div>
                    <div class="pokemon-dropdown__infos__quantity">
                      Qt: {data.quantity || 1}
                    </div>
                  </div>
                  <div class="pokemon-dropdown__delete">
                    <div>
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
            {store.state.team.pokemons.length > 5 && (
              <div class="pokemon-dropdown__row">...</div>
            )}
            <div class="pokemon-dropdown__team">
              <nuxt-link
                to="/my-team"
                tabindex="3"
                role="menuitem"
              >
                Voir mon équipe
              </nuxt-link>
            </div>
            <div class="pokemon-dropdown__team">
              <nuxt-link to="/teams">
                Voir d'autres équipes
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    )
  },
})
</script>

<style lang="scss" scoped>
.pokemon-dropdown {
  display: inline-block;
  position: relative;
  text-align: left;
  button > svg {
    margin-left: 0.5rem;
    margin-right: -0.25rem;
    width: 1.25rem;
    height: 1.25rem;
  }
  &__wrapper {
    position: relative;
    visibility: hidden;
    z-index: 10;
    transform: scaleX(0.95) scaleY(0.95);
    transition-property: all;
    transition-duration: 300ms;
    transform-origin: top right;
    opacity: 0;
  }
  &__container {
    position: absolute;
    margin-top: 0.5rem;
    background-color: #ffffff;
    transform-origin: top right;
    width: 14rem;
    border-radius: 0.375rem;
    border-width: 1px;
    border-color: #e5e7eb;
    border-top-width: 1px;
    outline: 0;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);

    @media (min-width: 640px) {
      right: 0;
    }
  }
  &__row {
    display: flex;
    padding: 0.5rem;
    background-color: #ffffff;
    display: flex;
    border-bottom-width: 1px;
    border-color: #f3f4f6;
    cursor: pointer;
  }
  &__image {
    padding: 0.5rem;
    width: 3rem;
  }
  &__infos {
    display: flex;
    flex-direction: column;
    font-size: 0.875rem;
    line-height: 1.25rem;
    flex: 1 1 auto;
    width: 8rem;
    &__name {
      font-weight: 700;
      text-transform: capitalize;
    }
    &__quantity {
      color: #9ca3af;
    }
  }
  &__delete {
    display: flex;
    font-weight: 500;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    & > div {
      margin-bottom: 1.5rem;
      color: #b91c1c;
      width: 1rem;
      height: 1rem;
      border-radius: 9999px;
      cursor: pointer;
    }
  }
  &__team {
    display: flex;
    padding: 0.5rem 1rem;
    color: #374151;
    font-size: 0.875rem;
    line-height: 1.25rem;
    text-align: left;
    justify-content: space-between;
    width: 100%;
  }
  &:focus-within .dropdown-menu {
    opacity: 1;
    transform: translate(0) scale(1);
    visibility: visible;
  }
}
</style>
