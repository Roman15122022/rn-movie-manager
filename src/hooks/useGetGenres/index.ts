import { useQuery } from '@tanstack/react-query'
import { getGenres } from '@/services/tmdb'

export const useGenres = () => {
  const { data } = useQuery({
    queryKey: ['genres'],
    queryFn: getGenres,
    staleTime: 24 * 60 * 60 * 1000,
  })
  const dict = new Map<number, string>(
    (data?.genres ?? []).map((g) => [g.id, g.name])
  )
  return { dict }
}
