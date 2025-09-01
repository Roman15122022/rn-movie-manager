import { useMemo, useRef, useState } from 'react'
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native'
import { useDebounceState } from '@/hooks/useDebouncedState'
import { DEFAULT_DEBOUNCED_DELAY } from '@/constants'
import { useMovies } from '@/store/Movies'
import { usePopularInfinite } from '@/hooks/useGetPopular'
import { useSearchInfinite } from '@/hooks/useGetSearch'
import { useSelectedGenres } from '@/store/Genres'
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
  const { selected, clear } = useSelectedGenres()

  const {
    data: popularData,
    fetchNextPage: fetchPopularNext,
    hasNextPage: hasPopularNext,
    isFetchingNextPage: isFetchingPopularNext,
    isLoading: isPopularInitialLoading,
  } = usePopularInfinite()

  const {
    data: searchData,
    fetchNextPage: fetchSearchNext,
    hasNextPage: hasSearchNext,
    isFetchingNextPage: isFetchingSearchNext,
    isLoading: isSearchInitialLoading,
  } = useSearchInfinite(debouncedSearchValue)

  const hasSearch = debouncedSearchValue.trim().length > 0
  const hasGenreFilter = selected.length > 0

  const isSearchMode = hasSearch
  const pages = isSearchMode ? searchData?.pages : popularData?.pages

  const movies = useMemo<TmdbMovie[]>(() => {
    const all = pages?.flatMap((p) => p.results) ?? []
    const unique = Array.from(new Map(all.map((m) => [m.id, m])).values())
    const afterFav = isOnlyFavs
      ? unique.filter((m) => favorites.includes(m.id))
      : unique
    if (selected.length === 0) {
      return afterFav.slice().sort((a, b) => a.title.localeCompare(b.title))
    }
    const selectedSet = new Set(selected)
    return afterFav
      .filter((m) => {
        const ids = m.genre_ids ?? []
        return Array.from(selectedSet).every((g) => ids.includes(g))
      })
      .slice()
      .sort((a, b) => a.title.localeCompare(b.title))
  }, [pages, isOnlyFavs, favorites, selected])

  const isInitialLoading = isSearchMode
    ? isSearchInitialLoading
    : isPopularInitialLoading
  const isFetchingNext = isSearchMode
    ? isFetchingSearchNext
    : isFetchingPopularNext
  const hasNextPage = isSearchMode ? !!hasSearchNext : !!hasPopularNext
  const fetchNextPage = isSearchMode ? fetchSearchNext : fetchPopularNext

  const canAutoPaginate = !isOnlyFavs && !hasGenreFilter && !hasSearch

  const [showScrollTop, setShowScrollTop] = useState(false)
  const listRef = useRef<import('react-native').FlatList<TmdbMovie>>(null)

  const onEndReached = () => {
    if (!canAutoPaginate) return
    if (!isFetchingNext && hasNextPage) fetchNextPage()
  }

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { y } = e.nativeEvent.contentOffset
    setShowScrollTop(y > SHOW_TOP_AFTER_PX)
  }

  const scrollToTop = () =>
    listRef.current?.scrollToOffset?.({ offset: 0, animated: true })

  const handleClear = () => {
    setDebouncedValue('')
    handleSearchChange('')
    clear()
  }

  return {
    searchValue,
    handleSearchChange,
    movies,
    isInitialLoading,
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
    fetchNextPage,
  }
}
