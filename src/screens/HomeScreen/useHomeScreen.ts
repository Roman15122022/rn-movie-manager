import { useMemo } from 'react'
import { useMovies } from '@/store/Movies'
import { useGetPopular } from '@/hooks/useGetPopular'
import { useGetSearch } from '@/hooks/useGetSearch'
import { TmdbMovie } from '@/services/types'
import { DEFAULT_DEBOUNCED_DELAY } from '@/constants'
import { useDebounceState } from '@/hooks/useDebouncedState'

export const useHomeScreen = () => {
  const [searchValue, debouncedSearchValue, handleSearchChange] =
    useDebounceState('', DEFAULT_DEBOUNCED_DELAY)
  const { favorites, isOnlyFavs, toggleFav, toggleOnlyFavs } = useMovies()

  const { data: popularMovies, isFetching: isFetchingPopular } = useGetPopular()
  const { data: searchedMovies, isFetching: isFetchingSearch } =
    useGetSearch(debouncedSearchValue)

  const moviesList = useMemo<TmdbMovie[]>(() => {
    const source =
      debouncedSearchValue.trim().length > 0
        ? (searchedMovies?.results ?? [])
        : (popularMovies?.results ?? [])

    const filtered =
      isOnlyFavs && favorites.length > 0
        ? source.filter((movie) => favorites.includes(movie.id))
        : source

    return filtered.slice().sort((a, b) => a.title.localeCompare(b.title))
  }, [
    debouncedSearchValue,
    searchedMovies?.results,
    popularMovies?.results,
    isOnlyFavs,
    favorites,
  ])

  return {
    searchValue,
    handleSearch: handleSearchChange,
    moviesList,
    isLoading: isFetchingPopular || isFetchingSearch,
    toggleFav,
    toggleOnlyFavs,
    isOnlyFavs,
    favorites,
  }
}
