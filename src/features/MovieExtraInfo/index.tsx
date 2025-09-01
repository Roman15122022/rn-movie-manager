import { memo, useMemo } from 'react'
import { InfoRow, Label, Value } from '@/features/MovieList/styles'
import { useGetMovie } from '@/hooks/useGetMovie'
import { MovieExtraInfoProps } from '@/features/MovieExtraInfo/types'

function MovieExtraInfoBase({ item, dict }: MovieExtraInfoProps) {
  const { data } = useGetMovie(item.id)

  const genres = useMemo(
    () =>
      (item.genre_ids ?? [])
        .map((id) => dict.get(id))
        .filter(Boolean)
        .slice(0, 3)
        .join(', '),
    [item.genre_ids, dict]
  )

  const director =
    data?.credits.crew.find((c) => c.job === 'Director')?.name ?? '—'

  const stars = useMemo(
    () =>
      (data?.credits.cast ?? [])
        .slice(0, 3)
        .map((actor) => actor.name)
        .join(', '),
    [data?.credits.cast]
  )

  return (
    <>
      <InfoRow>
        <Label>Genres:</Label>
        <Value>{genres || '—'}</Value>
      </InfoRow>
      <InfoRow>
        <Label>Stars:</Label>
        <Value>{stars || '—'}</Value>
      </InfoRow>
      <InfoRow>
        <Label>Director:</Label>
        <Value>{director}</Value>
      </InfoRow>
    </>
  )
}

export const MovieExtraInfo = memo(MovieExtraInfoBase)
