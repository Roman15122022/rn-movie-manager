import { useQuery } from '@tanstack/react-query'
import { getGenres } from '@/services/tmdb'
import { QueryKeys } from '@/types/enums'
import { GenresResponse } from '@/services/types'

export const useGenres = () => {
  const { data, ...rest } = useQuery<GenresResponse>({
    queryKey: [QueryKeys.Genres],
    queryFn: getGenres,
    staleTime: 24 * 60 * 60 * 1000,
  })

  const list = data?.genres ?? []
  const dict = new Map(list.map((g) => [g.id, g.name]))

  return { list, dict, ...rest }
}
