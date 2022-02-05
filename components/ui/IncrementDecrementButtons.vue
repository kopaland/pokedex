vue
<script lang="tsx">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

interface IIncrementDecrementButtonsProps {
  disabled: {
    plus: boolean
    minus: boolean
  }
}

export default defineComponent({
  name: 'UIIncrementDecrementButtons',
  props: {
    disabled: {
      type: Object as PropType<IIncrementDecrementButtonsProps['disabled']>,
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
      <div class="increment-decrement">
        {slots.title && slots.title()}
        <div>
          <button
            disabled={props.disabled.plus}
            type="button"
            class="increment-decrement__btn-plus"
            onClick={() => handleClick(1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
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
            class="increment-decrement__btn-minus"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
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
<style lang="scss" scoped>
.increment-decrement {
  display: inline-grid;
  padding: 1rem;
  & > div {
    display: flex;
    button {
      padding: 0.375rem;
      font-weight: 700;
      border-radius: 0.25rem;
      width: 2rem;
      height: 2rem;
      & > svg {
        width: 1.25rem;
        height: 1.25rem;
      }
    }
  }
  &__btn-plus {
    background-color: #059669;
  }
  &__btn-minus {
    background-color: #d97706;
  }
}
</style>
