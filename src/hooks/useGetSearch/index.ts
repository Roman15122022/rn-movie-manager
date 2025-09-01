import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from '@/types/enums'
import { qSearch } from '@/services/tmdb'

export const useGetSearch = (text: string) => {
  return useQuery({
    queryKey: [QueryKeys.Search, text],
    queryFn: () => qSearch(text, 1),
    enabled: false,
  })
}
