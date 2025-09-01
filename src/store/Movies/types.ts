export type MoviesFavoritesContextType = {
  favorites: number[]
  isOnlyFavs: boolean
  toggleFav: (id: number) => void
  toggleOnlyFavs: () => void
}
