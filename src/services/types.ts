export type HttpInit = RequestInit & { retry?: number }

export type GenresResponse = { genres: TmdbGenre[] }

export type Id<T = number> = { id: T }
export type Name<N = string> = { name: N }

export type BaseMovie = Id & {
  title: string
  original_title: string
  overview: string
  release_date: string
  poster_path: string | null
  backdrop_path: string | null
  popularity: number
  vote_average: number
  vote_count: number
}

export type TmdbMovie = BaseMovie & {
  genre_ids?: number[]
}

export type TmdbListResponse<T> = {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export type PopularResponse = TmdbListResponse<TmdbMovie>
export type SearchResponse = TmdbListResponse<TmdbMovie>

export type TmdbGenre = Id & Name

export type TmdbCast = Id &
  Name & {
    character: string
    profile_path: string | null
  }

export type TmdbCrew = Id &
  Name & {
    job: string
  }

export type TmdbCredits = {
  cast: TmdbCast[]
  crew: TmdbCrew[]
}

export type MovieDetailsResponse = BaseMovie & {
  runtime: number | null
  genres: TmdbGenre[]
  credits: TmdbCredits
}
