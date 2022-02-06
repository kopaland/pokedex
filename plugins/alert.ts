import { reactive } from '@nuxtjs/composition-api'
import { Plugin } from '@nuxt/types'

const backupPlugin: Plugin = (_, inject) => {
  const alert = reactive({
    show: false,
    type: 'ERROR',
    message: null
  })
  inject('alert', alert)
}

export default backupPlugin
