import { Plugin } from '@nuxt/types'
import { useBackup } from '~/components/composables/utils/useBackup'

const backupPlugin: Plugin = (_, inject) => {
  inject('backup', {
    ...useBackup(),
  })
}

export default backupPlugin

// import { defineNuxtPlugin } from '@nuxtjs/composition-api'

// export default defineNuxtPlugin((_, inject) => {
//     inject('$pokenodeApi', new PokemonClient())
// })
