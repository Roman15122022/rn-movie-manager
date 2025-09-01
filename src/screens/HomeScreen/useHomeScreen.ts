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

  const isSearch = debouncedSearchValue.trim().length > 0
  const pages = isSearch ? searchData?.pages : popularData?.pages

  const movies = useMemo<TmdbMovie[]>(() => {
    const all = pages?.flatMap((page) => page.results) ?? []
    const unique = Array.from(
      new Map(all.map((movie) => [movie.id, movie])).values()
    )
    const filtered = isOnlyFavs
      ? unique.filter((movie) => favorites.includes(movie.id))
      : unique
    return filtered.slice().sort((a, b) => a.title.localeCompare(b.title))
  }, [pages, isOnlyFavs, favorites])

  const isInitialLoading = isSearch
    ? isSearchInitialLoading
    : isPopularInitialLoading
  const isFetchingNext = isSearch ? isFetchingSearchNext : isFetchingPopularNext
  const hasNextPage = isSearch ? !!hasSearchNext : !!hasPopularNext
  const fetchNextPage = isSearch ? fetchSearchNext : fetchPopularNext

  const canAutoPaginate = !isOnlyFavs

  const [showScrollTop, setShowScrollTop] = useState(false)
  const listRef = useRef<any>(null)

  const onEndReached = () => {
    if (!canAutoPaginate) return
    if (!isFetchingNext && hasNextPage) fetchNextPage()
  }

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { y } = event.nativeEvent.contentOffset
    setShowScrollTop(y > SHOW_TOP_AFTER_PX)
  }

  const scrollToTop = () => {
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
  }
}
