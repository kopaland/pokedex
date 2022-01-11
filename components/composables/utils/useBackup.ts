import { IPokemonTeamStore } from '~/types'

export function useBackup() {
  function setBackup(team: IPokemonTeamStore[]) {
    sessionStorage.setItem('backup', JSON.stringify({ team }))
  }

  function getBackup() {
    const json =
      sessionStorage.getItem('backup') !== 'undefined'
        ? sessionStorage.getItem('backup') ?? '{ "team": [] }'
        : '{ "team": [] }'
    return JSON.parse(json) as {
      team: IPokemonTeamStore[]
    }
  }

  return {
    setBackup,
    getBackup,
  }
}
