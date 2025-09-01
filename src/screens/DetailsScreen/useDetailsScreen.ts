import { useMemo } from 'react'
import { useMovies } from '@/store/Movies'
import { useSelection } from '@/store/SelectedMovie'
import { useGetMovie } from '@/hooks/useGetMovie'
import { useGenres } from '@/hooks/useGetGenres'
import { Linking } from 'react-native'
import {
  IMG_BASE,
  SIZE_BACKDROP,
  SIZE_POSTER,
} from '@/screens/DetailsScreen/constants'
import { useNavigate } from '@/hooks/useAppNavigation'

export const useDetailsScreen = () => {
  const { selectedId } = useSelection()
  const { dict } = useGenres()
  const { toggleFav, favorites } = useMovies()

  const { goBack } = useNavigate()

  const id = selectedId || 0
  const { data, status, error, refetch, isFetching } = useGetMovie(id)

  const isFavorite = favorites.includes(id)

  const posterUri = data?.poster_path
    ? { uri: `${IMG_BASE}${SIZE_POSTER}${data.poster_path}` }
    : undefined

  const backdropUri = data?.backdrop_path
    ? { uri: `${IMG_BASE}${SIZE_BACKDROP}${data.backdrop_path}` }
    : undefined

  const year = data?.release_date?.slice(0, 4) || '—'
  const runtime = data?.runtime ? `${data.runtime} min` : '—'
  const rating = data?.vote_average ? data.vote_average.toFixed(1) : '—'
  const votes = data?.vote_count ? data.vote_count.toLocaleString() : '—'

  const genres = useMemo(
    () =>
      (data?.genres ?? [])
        .map((g) => g.name || dict.get(g.id) || '')
        .filter(Boolean)
        .join(', '),
    [data?.genres, dict]
  )

  const director =
    data?.credits.crew.find((m) => m.job === 'Director')?.name || '—'

  const stars = useMemo(
    () =>
      (data?.credits.cast ?? [])
        .slice(0, 8)
        .map((a) => a.name)
        .join(', '),
    [data?.credits.cast]
  )

  const onToggleFavorite = () => toggleFav(id)

  const handleWatchNow = () => {
    if (!data?.title) return
    const query = encodeURIComponent(`${data.title} watch online film`)
    Linking.openURL(`https://www.google.com/search?q=${query}`)
  }

  return {
    status,
    error,
    refetch,
    isFetching,
    data,
    isFavorite,
    onToggleFavorite,
    posterUri,
    backdropUri,
    year,
    runtime,
    rating,
    votes,
    genres,
    director,
    stars,
    handleWatchNow,
    goBack,
  }
}
