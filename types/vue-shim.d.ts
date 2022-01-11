import { EvolutionClient, PokemonClient } from 'pokenode-ts'
import { IPokemonTeamStore } from '~/types'

interface PokenodeApi {
  pokemon: PokemonClient
  evolution: EvolutionClient
}

interface Backup {
  setBackup: (team: IPokemonTeamStore[]) => void
  getBackup: () => {
    team: IPokemonTeamStore[]
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $pokenodeApi: PokenodeApi
    $backup: Backup
  }
}

declare module '@nuxt/types' {
  interface Context {
    $pokenodeApi: PokenodeApi
    $backup: Backup
  }
  interface NuxtAppOptions {
    $pokenodeApi: PokenodeApi
    $backup: Backup
  }
}
