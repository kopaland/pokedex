import { Store } from 'vuex'
import { StateStore } from '~/types'

declare module '@vue/runtime-core' {
  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<StateStore>
  }
}
