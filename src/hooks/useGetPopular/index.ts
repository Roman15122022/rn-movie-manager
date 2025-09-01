import { useInfiniteQuery } from '@tanstack/react-query'
import { getPopular } from '@/services/tmdb'
import { QueryKeys } from '@/types/enums'
import type { PopularResponse } from '@/services/types'

export const usePopularInfinite = () =>
  useInfiniteQuery<PopularResponse>({
    queryKey: [QueryKeys.Popular],
    queryFn: ({ pageParam = 1 }) => getPopular(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const next = lastPage.page + 1
      return next <= lastPage.total_pages ? next : undefined
    },
  })
