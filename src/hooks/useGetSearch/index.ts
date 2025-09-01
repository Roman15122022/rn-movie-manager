import { useInfiniteQuery } from '@tanstack/react-query'
import { qSearch } from '@/services/tmdb'
import { QueryKeys } from '@/types/enums'
import type { SearchResponse } from '@/services/types'

export const useSearchInfinite = (term: string) =>
  useInfiniteQuery<SearchResponse>({
    queryKey: [QueryKeys.Search, term],
    queryFn: ({ pageParam = 1 }) => qSearch(term, pageParam as number),
    enabled: term.trim().length > 0,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const next = lastPage.page + 1
      return next <= lastPage.total_pages ? next : undefined
    },
  })
