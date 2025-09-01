export type MoviesFavoritesContextType = {
  favorites: number[]
  onlyFavs: boolean
  toggleFav: (id: number) => void
  toggleOnlyFavs: () => void
}
