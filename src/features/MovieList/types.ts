import { TmdbMovie } from '@/services/types'

export type Props = {
  data: TmdbMovie[]
  favorites: number[]
  onlyFavs: boolean
  isLoading: boolean
  isFetchingNext?: boolean
  hasNextPage?: boolean
  onToggleFav: (id: number) => void
  onEndReached?: () => void
  onScroll?: any
  showScrollTop?: boolean
  onScrollTopPress?: () => void
}
