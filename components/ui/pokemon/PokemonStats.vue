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
      <div class="col-span-2 flex flex-col gap-2">
        {props.value.map((item) => {
          const ref = item.stat.name === 'speed' ? 300 : 255
          return (
            <div>
              <h1>{item.stat.name}</h1>
              <div class="h-8 relative rounded-full overflow-hidden">
                <div class="w-full h-full bg-gray-200 absolute "></div>
                <div
                  class="flex items-center h-full bg-red-500 sm:bg-yellow-400 absolute"
                  style={`width: ${(item.base_stat / ref) * 100}%`}
                >
                  <span class="ml-4">
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
