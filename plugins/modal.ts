import { reactive } from '@nuxtjs/composition-api'
import { Plugin } from '@nuxt/types'

const backupPlugin: Plugin = (_, inject) => {
  const modal = reactive({
    show: false,
    target: '',
    header: null,
    body: null,
    footer: null,
  })
  inject('modal', modal)
}

export default backupPlugin
