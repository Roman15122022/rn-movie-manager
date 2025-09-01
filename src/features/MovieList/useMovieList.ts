import { useSelection } from '@/store/SelectedMovie'
import { useNavigate } from '@/hooks/useAppNavigation'
import { Screens } from '@/types/enums'
import { useGenres } from '@/hooks/useGetGenres'
import { usePrefetchMovie } from '@/hooks/usePrefetchMovie'
import { useCallback, useRef } from 'react'
import { ViewToken } from 'react-native'
import type { TmdbMovie } from '@/services/types'

export const useMovieList = () => {
  const { goTo } = useNavigate()
  const setSelectedId = useSelection((s) => s.setSelectedId)

  const { dict } = useGenres()
  const prefetchMovie = usePrefetchMovie()
  const viewed = useRef<Set<number>>(new Set())

  const openMovie = (id: number, title: string) => {
    setSelectedId(id)
    goTo(Screens.Details, { id, title })
  }

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
      for (const v of viewableItems) {
        const item = v.item as TmdbMovie | undefined
        if (v.isViewable && item && !viewed.current.has(item.id)) {
          viewed.current.add(item.id)
          prefetchMovie(item.id)
        }
      }
    },
    [prefetchMovie]
  )

  return { openMovie, dict, onViewableItemsChanged }
}
