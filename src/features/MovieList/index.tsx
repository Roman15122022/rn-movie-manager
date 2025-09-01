import { useCallback, useRef } from 'react'
import { FlatList, ViewToken } from 'react-native'
import { Button, ButtonText } from '@/components/Button'
import { Card } from '@/components/Card'
import { Title } from '@/components/Title'
import { ActionsRow, InfoRow, Label, Value } from '@/features/MovieList/styles'
import { usePrefetchMovie } from '@/hooks/usePrefetchMovie'
import { useGenres } from '@/hooks/useGetGenres'
import { VIEW_CONFIG } from '@/features/MovieList/constants'
import { useMovieList } from '@/features/MovieList/useMovieList'
import type { Props } from '@/features/MovieList/types'
import type { TmdbMovie } from '@/services/types'
import { MovieExtraInfo } from '@/features/MovieExtraInfo'

export function MoviesList({
  data,
  favorites,
  onlyFavs,
  isLoading,
  onToggleFav,
}: Props) {
  const { openMovie } = useMovieList()
  const { dict } = useGenres()
  const prefetchMovie = usePrefetchMovie()
  const viewed = useRef<Set<number>>(new Set())

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
      for (const v of viewableItems) {
        const item = v.item as TmdbMovie | undefined
        if (v.isViewable && item && !viewed.current.has(item.id)) {
          viewed.current.add(item.id)
          prefetchMovie(item.id)
        }
      }
    },
    [prefetchMovie]
  )

  return (
    <FlatList
      data={data}
      keyExtractor={(x) => String(x.id)}
      contentContainerStyle={{ paddingVertical: 8 }}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={VIEW_CONFIG}
      renderItem={({ item }) => {
        const year = item.release_date?.slice(0, 4) || '—'

        return (
          <Card>
            <Title>{item.title}</Title>

            <InfoRow>
              <Label>Year:</Label>
              <Value>{year}</Value>
            </InfoRow>

            <MovieExtraInfo item={item} dict={dict} />

            <ActionsRow>
              <Button
                onPress={() => openMovie(item.id, item.title)}
                style={{ flex: 1 }}
              >
                <ButtonText>Open</ButtonText>
              </Button>
              <Button
                variant="secondary"
                onPress={() => onToggleFav(item.id)}
                style={{ flex: 1 }}
              >
                <ButtonText>
                  {favorites.includes(item.id) ? 'Remove' : 'Favorite'}
                </ButtonText>
              </Button>
            </ActionsRow>
          </Card>
        )
      }}
      ListEmptyComponent={
        !isLoading ? (
          <Card>
            <Title>Nothing to show</Title>
            <Value>
              {onlyFavs && favorites.length === 0
                ? 'Favorites filter is ON, but you have no favorites yet.'
                : 'Try searching another title.'}
            </Value>
          </Card>
        ) : null
      }
    />
  )
}
