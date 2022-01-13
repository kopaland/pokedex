vue
<script lang="tsx">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

interface IIncremenDecrementButtonsProps {
  disabled: {
    plus: boolean
    minus: boolean
  }
}

export default defineComponent({
  name: 'UIIncremenDecrementButtons',
  props: {
    disabled: {
      type: Object as PropType<IIncremenDecrementButtonsProps['disabled']>,
      default: () => {
        return {
          plus: false,
          minus: false,
        }
      },
    },
    onClickPlusOrMinus: {
      type: Function as PropType<(plusOrMinus: -1 | 1) => void>,
      default: () => {},
    },
  },
  setup(props, { slots, emit }) {
    function handleClick(plusOrMinus: -1 | 1) {
      emit('clickPlusOrMinus', plusOrMinus)
    }

    return () => (
      <div class="p-4 flex justify-between">
        {slots.title && slots.title()}
        <div class="flex">
          <button
            disabled={props.disabled.plus}
            type="button"
            class="bg-green-600 p-1.5 font-bold rounded"
            onClick={() => handleClick(1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          {slots.default && slots.default()}
          <button
            disabled={props.disabled.minus}
            type="button"
            onClick={() => handleClick(-1)}
            class="bg-yellow-600 p-1.5 font-bold rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    )
  },
})
</script>
