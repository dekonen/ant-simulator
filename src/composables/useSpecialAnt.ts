export function getSeasonText(seasonNumber?: number) {
  if (!seasonNumber) {
    return ''
  }
  return 'S' + seasonNumber
}


