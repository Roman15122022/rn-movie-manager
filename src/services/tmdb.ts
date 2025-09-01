import { http } from '@/services/http'
import {
  PopularResponse,
  MovieDetailsResponse,
  SearchResponse,
  GenresResponse,
} from '@/services/types'

export function getPopular(page = 1): Promise<PopularResponse> {
  return http(`/movie/popular?language=en-US&page=${page}`, { retry: 2 })
}

export function getMovie(id: number): Promise<MovieDetailsResponse> {
  return http(`/movie/${id}?language=en-US&append_to_response=credits`, {
    retry: 1,
  })
}

export function qSearch(term: string, page = 1): Promise<SearchResponse> {
  return http(
    `/search/movie?query=${encodeURIComponent(term)}&language=en-US&page=${page}&include_adult=false`,
    { retry: 2 }
  )
}

export function getGenres(): Promise<GenresResponse> {
  return http(`/genre/movie/list?language=en-US`, { retry: 1 })
}
