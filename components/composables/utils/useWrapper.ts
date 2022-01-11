export function useWrapper() {
  function getIdFromUrl(url: string) {
    let pathArray = url.split('/')
    pathArray = pathArray.filter((v) => v !== '')
    pathArray.reverse()
    return Number(pathArray[0])

    // const queryString = url.split('?')[1]
    // const urlParams = new URLSearchParams(queryString)
    // return Number(urlParams.get('id'))
  }

  return {
    getIdFromUrl,
  }
}
