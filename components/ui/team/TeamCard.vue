<script lang="tsx">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

import { ITeam } from '~/types'

export default defineComponent({
  name: 'UITeamCard',
  props: {
    team: { type: Object as PropType<ITeam>, default: undefined },
    searchTerm: { type: String, default: '' },
  },
  setup(props) {
    return () =>
      props.team && (
        <nuxt-link to={`/teams/${props.team.id}`}>
          <div class="card-body">
            <img
              class="card-image"
              src={`https://picsum.photos/250/250?random=${props.team.id}`}
              alt="ramdom image"
            />
            <div class="card-infos">
              <a href="#">
                <h3>{props.team.trainer.pseudo}</h3>
              </a>
            </div>
          </div>
        </nuxt-link>
      )
  },
})
</script>
