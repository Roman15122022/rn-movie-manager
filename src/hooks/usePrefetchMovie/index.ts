import { useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { getMovie } from '@/services/tmdb'
import { QueryKeys } from '@/types/enums'

export const usePrefetchMovie = () => {
  const qc = useQueryClient()
  return useCallback(
    (id: number) => {
      qc.prefetchQuery({
        queryKey: [QueryKeys.Movie, id],
        queryFn: () => getMovie(id),
        staleTime: 24 * 60 * 60 * 1000,
      })
    },
    [qc]
  )
}
