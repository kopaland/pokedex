<script lang="tsx">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

import { ITrainer } from '~/types'

export default defineComponent({
  name: 'UITrainerCard',
  props: {
    trainer: { type: Object as PropType<ITrainer>, default: undefined },
    searchTerm: { type: String, default: '' },
  },
  setup(props) {
    return () =>
      props.trainer && (
        <div>
          <div class="card-body">
            <nuxt-link to={`/trainers/${props.trainer.id}`}>
              <img
                class="card-image"
                src={`https://picsum.photos/250/250?random=${props.trainer.id}`}
                alt="ramdom image"
              />
            </nuxt-link>
            <div class="card-infos">
              <a href="#">
                <h3>{props.trainer.pseudo}</h3>
              </a>
            </div>
          </div>
        </div>
      )
  },
})
</script>
