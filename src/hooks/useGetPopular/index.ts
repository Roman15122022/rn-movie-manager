import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from '@/types/enums'
import { getPopular } from '@/services/tmdb'

export const useGetPopular = () => {
  return useQuery({
    queryKey: [QueryKeys.Popular],
    queryFn: () => getPopular(1),
  })
}
