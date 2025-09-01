import type { TmdbMovie } from '@/services/types'

export type MovieExtraInfoProps = {
  item: TmdbMovie
  dict: Map<number, string>
}
