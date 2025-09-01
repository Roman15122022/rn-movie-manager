import { TmdbMovie } from '@/services/types'

export type Props = {
  data: TmdbMovie[]
  favorites: number[]
  onlyFavs: boolean
  onToggleFav: (id: number) => void
  onEndReached?: () => void
  onScroll?: any
  isFetchingNext?: boolean
  hasNextPage?: boolean
  canAutoPaginate?: boolean
  showScrollTop?: boolean
  onScrollTopPress?: () => void
}
