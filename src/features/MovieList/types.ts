import { TmdbMovie } from '@/services/types'

export type Props = {
  data: TmdbMovie[]
  favorites: number[]
  onlyFavs: boolean
  isLoading: boolean
  onToggleFav: (id: number) => void
}
