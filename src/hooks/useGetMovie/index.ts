import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from '@/types/enums'
import { getMovie } from '@/services/tmdb'
import { MovieDetailsResponse } from '@/services/types'
import { TIME_IN_MS } from '@/constants'

export const useGetMovie = (id: number) =>
  useQuery<MovieDetailsResponse>({
    queryKey: [QueryKeys.Movie, id],
    queryFn: () => getMovie(id),
    enabled: false,
    staleTime: TIME_IN_MS.DAY,
  })
