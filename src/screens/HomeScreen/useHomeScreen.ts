import { useNavigation } from '@react-navigation/native'
import { useMemo, useState } from 'react'
import { useMovies } from '@/store/Movies'
import { useGetPopular } from '@/hooks/useGetPopular'
import { useGetSearch } from '@/hooks/useGetSearch'

export const useHomeScreen = () => {
  const nav = useNavigation<any>()
  const [text, setText] = useState('')
  const { favorites, onlyFavs, toggleFav, toggleOnlyFavs } = useMovies()

  const { data: popularData, isFetching: isFetchingPopular } = useGetPopular()
  const {
    data: searchData,
    isFetching: isFetchingSearch,
    refetch: refetchSearch,
  } = useGetSearch(text)

  const list = useMemo(() => {
    const src = text.trim()
      ? (searchData?.results ?? [])
      : (popularData?.results ?? [])
    const filtered =
      onlyFavs && favorites.length > 0
        ? src.filter((m: any) => favorites.includes(m.id))
        : src
    return filtered
      .slice()
      .sort((a: any, b: any) => a.title.localeCompare(b.title))
  }, [text, searchData?.results, popularData?.results, onlyFavs, favorites])

  return {
    text,
    setText,
    toggleFav,
    toggleOnlyFavs,
    refetchSearch,
    list,
    isLoading: isFetchingPopular || isFetchingSearch,
    nav,
    onlyFavs,
    favorites,
  }
}
