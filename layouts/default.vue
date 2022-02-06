<script lang="tsx">
import {
  computed,
  defineComponent,
  onMounted,
  useContext,
  useStore,
} from '@nuxtjs/composition-api'
import { ITeam, StateStore } from '~/types'
import { useTeams } from '~/components/composables/api/useTeams'

import Hearder from '@/components/ui/Header.vue'
import TrainerModal from '@/components/ui/trainer/TrainerModal.vue'
import Alert from '@/components/ui/Alert.vue'

export default defineComponent({
  name: 'DefaultLayout',
  setup(_props) {
    const store = useStore<StateStore>()
    const { $modal, $alert } = useContext()
    const { saveTeam, updateTeam } = useTeams()

    const trainerPseudo = computed({
      get: () => store.state.team.trainerPseudo,
      set: (value) => {
        store.commit('team/SET_TRAINER', {
          id: store.state.team.trainerId,
          pseudo: value,
        })
      },
    })
    const showTrainerModal = computed({
      get: () => $modal.show,
      set: (value) => {
        $modal.show = value
      },
    })
    const showAlert = computed({
      get: () => {
        if ($alert.show) setTimeout(() => ($alert.show = false), 10000)
        return $alert.show
      },
      set: (value) => {
        $alert.show = value
      },
    })

    onMounted(() => {
      const teamPokemons =
        localStorage.getItem('team') !== 'undefined'
          ? localStorage.getItem('team') ?? '{}'
          : '{}'
      store.commit('team/RECOVER_BACKUP', JSON.parse(teamPokemons))
      setTimeout(() => (showTrainerModal.value = true), 25000)
    })

    function publishMyTeam() {
      const team = {
        id: store.state.team.id,
        trainer: {
          id: store.state.team.trainerId,
          pseudo: store.state.team.trainerPseudo,
        },
        pokemons: store.state.team.pokemons,
      } as ITeam
      if (team.id && team.trainer.id)
        updateTeam(team).then(() => {
          showTrainerModal.value = false
        })
      else
        saveTeam(team).then((response) => {
          store.commit('team/SET_ID', Number(response.id))
          store.commit('team/SET_TRAINER', {
            id: response.trainer_id,
            pseudo: trainerPseudo.value,
          })
          showTrainerModal.value = false
        })
    }

    return () => (
      <div class="app">
        <header>
          <Hearder />
        </header>
        <main>
          <nuxt keep-alive class="app__nuxt" />
          <TrainerModal
            show={showTrainerModal.value}
            {...{
              on: {
                'update:show': (value: boolean) => {
                  showTrainerModal.value = value
                },
              },
            }}
          >
            <h1 slot="header">Publier mon équipe</h1>
            <div slot="body">
              {store.state.team.trainerId && store.state.team.trainerPseudo ? (
                <p>
                  <b>{store.state.team.trainerPseudo}</b> souhaitez-vous
                  partager la composition de votre équipe ?
                </p>
              ) : (
                <div class="slot-trainer-modal__body-input">
                  <div>
                    <label for="pseudoInput" class="form-label">
                      Veuillez saisir un pseudo pour votre nom de dresseur
                    </label>
                    <input
                      id="pseudoInput"
                      type="text"
                      placeholder="Example Sasha"
                      value={store.state.team.trainerPseudo}
                      onInput={(event: any) =>
                        (trainerPseudo.value = event.target.value)
                      }
                    />
                  </div>
                </div>
              )}
            </div>
            <div slot="footer" class="slot-trainer-modal__footer">
              <button
                class="btn-cancel"
                onClick={() => (showTrainerModal.value = false)}
              >
                Annuler
              </button>
              <button
                disabled={!trainerPseudo.value || trainerPseudo.value === ''}
                class="btn-publish"
                onClick={publishMyTeam}
              >
                Publier
              </button>
            </div>
          </TrainerModal>
          <Alert show={showAlert.value} type={$alert.type}>
            <p>{$alert.message}</p>
          </Alert>
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

.slot-trainer-modal {
  &__body-input {
    display: flex;
    justify-content: center;
    & > div {
      margin-bottom: 0.75rem;
      @media (min-width: 1280px) {
        width: 24rem;
      }
      & > label {
        display: inline-block;
        margin-bottom: 0.5rem;
        color: #374151;
      }
      & > input {
        display: block;
        padding: 0.375rem 0.75rem;
        margin: 0;
        background-clip: padding-box;
        background-color: #ffffff;
        transition-property: background-color, border-color, color, fill, stroke,
          opacity, box-shadow, transform;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        color: #374151;
        font-size: 1rem;
        line-height: 1.5rem;
        font-weight: 400;
        width: 100%;
        border-radius: 0.25rem;
        border-width: 1px;
        border-color: #d1d5db;
        border-style: solid;
      }
    }
  }
  &__footer {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }
}
</style>
