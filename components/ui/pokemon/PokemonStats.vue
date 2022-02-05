<script lang="tsx">
import { PropType, defineComponent } from '@vue/composition-api'
import { PokemonStat } from 'pokenode-ts'

export default defineComponent({
  name: 'UIPokemonStats',
  props: {
    value: {
      type: Array as PropType<PokemonStat[]>,
      default: () => {
        return []
      },
    },
  },
  setup(props) {
    return () => (
      <div class="pokemon-stats">
        <h2>Statistiques</h2>
        {props.value.map((item) => {
          const ref = item.stat.name === 'speed' ? 300 : 255
          return (
            <div>
              <h5>{item.stat.name}</h5>
              <div class="pokemon-stats__gauge">
                <div />
                <div style={`width: ${(item.base_stat / ref) * 100}%`}>
                  <span>
                    {item.base_stat} / {ref}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  },
})
</script>
<style lang="scss" scoped>
.pokemon-stats {
  display: flex;
  flex-direction: column;
  h5 {
    text-transform: uppercase;
  }
  &__gauge {
    overflow: hidden;
    position: relative;
    height: 2rem;
    border-radius: 9999px;
    & > div:nth-child(1) {
      position: absolute;
      background-color: #e5e7eb;
      width: 100%;
      height: 100%;
    }
    & > div:nth-child(2) {
      display: flex;
      position: absolute;
      background-color: #fbbf24;
      align-items: center;
      height: 100%;
      & > span {
        margin-left: 1rem;
      }
    }
  }
}
</style>
