import { ref } from '@vue/composition-api'

export function useGlobal() {

  function debounceInput<T = any>(
    timeout = 1000,
    callback?: (value: T) => void
  ) {
    // eslint-disable-next-line no-undef
    let timeoutRef: NodeJS.Timeout | null = null
    const inputValue = ref<T>()
    const debounceValue = ref<T>()

    const debounceListener = (value: T) => {
      if (timeoutRef !== null) {
        clearTimeout(timeoutRef)
      }

      inputValue.value = value
      timeoutRef = setTimeout(() => {
        if (callback) callback(value)
        debounceValue.value = value
      }, timeout)
    }

    return {
      debounceValue,
      inputValue,
      debounceListener,
    }
  }
  return {
    debounceInput,
  }
}
