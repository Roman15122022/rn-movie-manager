// useHomeScreen.ts
import { useMemo, useRef, useState } from 'react'
import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native'
import { useDebounceState } from '@/hooks/useDebouncedState'
import { DEFAULT_DEBOUNCED_DELAY } from '@/constants'
import { useMovies } from '@/store/Movies'
import { usePopularInfinite } from '@/hooks/useGetPopular'
import { useSearchInfinite } from '@/hooks/useGetSearch'
import { TmdbMovie } from '@/services/types'
import { SHOW_TOP_AFTER_PX } from '@/screens/HomeScreen/constants'

export const useHomeScreen = () => {
  const [
    searchValue,
    debouncedSearchValue,
    handleSearchChange,
    setDebouncedValue,
  ] = useDebounceState('', DEFAULT_DEBOUNCED_DELAY)

  const { favorites, isOnlyFavs, toggleFav, toggleOnlyFavs } = useMovies()

  const {
    data: popData,
    fetchNextPage: fetchPopularNext,
    hasNextPage: hasPopularNext,
    isFetchingNextPage: isFetchingPopularNext,
    isFetching: isFetchingPopular,
  } = usePopularInfinite()

  const {
    data: searchData,
    fetchNextPage: fetchSearchNext,
    hasNextPage: hasSearchNext,
    isFetchingNextPage: isFetchingSearchNext,
    isFetching: isFetchingSearch,
  } = useSearchInfinite(debouncedSearchValue)

  const isSearch = debouncedSearchValue.trim().length > 0
  const pages = isSearch ? searchData?.pages : popData?.pages

  const movies = useMemo<TmdbMovie[]>(() => {
    const all = pages?.flatMap((p) => p.results) ?? []
    const unique = Array.from(new Map(all.map((m) => [m.id, m])).values())
    const filtered = isOnlyFavs
      ? unique.filter((m) => favorites.includes(m.id))
      : unique
    return filtered.slice().sort((a, b) => a.title.localeCompare(b.title))
  }, [pages, isOnlyFavs, favorites])

  const isLoading = isFetchingPopular || isFetchingSearch
  const isFetchingNext = isSearch ? isFetchingSearchNext : isFetchingPopularNext
  const hasNextPage = isSearch ? !!hasSearchNext : !!hasPopularNext

  const canAutoPaginate = !isOnlyFavs
  const listRef = useRef<any>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)

  const onEndReached = () => {
    if (!canAutoPaginate) return
    if (isFetchingNext || !hasNextPage) return
    ;(isSearch ? fetchSearchNext : fetchPopularNext)()
  }

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { y } = e.nativeEvent.contentOffset
    setShowScrollTop(y > SHOW_TOP_AFTER_PX)
  }

  const scrollToTop = (): void => {
    listRef.current?.scrollToOffset?.({ offset: 0, animated: true })
  }

  const handleClear = (): void => {
    setDebouncedValue('')
    handleSearchChange('')
  }

  return {
    searchValue,
    handleSearchChange,
    movies,
    isLoading,
    isFetchingNext,
    hasNextPage,
    onEndReached,
    onScroll,
    listRef,
    showScrollTop,
    scrollToTop,
    favorites,
    isOnlyFavs,
    toggleFav,
    toggleOnlyFavs,
    canAutoPaginate,
    handleClear,
  }
}
