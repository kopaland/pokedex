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

interface Modal {
  show: boolean
  target: 'team'
  header: any
  body: any
  footer: any
}

interface Alert {
  show: boolean
  type: 'ERROR' | 'SUCCESS' | 'WARNING' | 'INFO'
  message: any
}

declare module 'vue/types/vue' {
  interface Vue {
    $pokenodeApi: PokenodeApi
    $backup: Backup
    $modal: Modal
    $alert: Alert
  }
}

declare module '@nuxt/types' {
  interface Context {
    $pokenodeApi: PokenodeApi
    $backup: Backup
    $modal: Modal
    $alert: Alert
  }
  interface NuxtAppOptions {
    $pokenodeApi: PokenodeApi
    $backup: Backup
    $modal: Modal
    $alert: Alert
  }
}
