import { forwardRef } from 'react'
import { FlatList } from 'react-native'
import { Button, ButtonText } from '@/components/Button'
import { Card } from '@/components/Card'
import { Title } from '@/components/Title'
import { InfoRow, ActionsRow, Label, Value, ScrollTopButton } from './styles'
import { VIEW_CONFIG } from './constants'
import { useMovieList } from './useMovieList'
import { Props } from './types'
import { MovieExtraInfo } from '@/features/MovieExtraInfo'
import { ArrowUp } from 'lucide-react-native'

export const MoviesList = forwardRef<any, Props>(
  (
    {
      data,
      favorites,
      onlyFavs,
      onToggleFav,
      onEndReached,
      onScroll,
      isFetchingNext,
      hasNextPage,
      canAutoPaginate,
      showScrollTop,
      onScrollTopPress,
    },
    ref
  ) => {
    const { openMovie, dict, onViewableItemsChanged } = useMovieList()

    return (
      <>
        <FlatList
          ref={ref}
          data={data}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          contentContainerStyle={{ paddingVertical: 8, paddingBottom: 72 }}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={VIEW_CONFIG}
          onEndReachedThreshold={0.5}
          onEndReached={canAutoPaginate ? onEndReached : undefined}
          onScroll={onScroll}
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
            <Card>
              <Title>Nothing to show</Title>
              <Value>
                {onlyFavs && favorites.length === 0
                  ? 'Favorites filter is ON, but you have no favorites yet.'
                  : 'Try searching another title.'}
              </Value>
            </Card>
          }
          ListFooterComponent={
            canAutoPaginate && isFetchingNext && hasNextPage ? (
              <Value style={{ textAlign: 'center', paddingVertical: 12 }}>
                Loading…
              </Value>
            ) : null
          }
        />
        {showScrollTop && (
          <ScrollTopButton onPress={onScrollTopPress}>
            <ArrowUp size={22} color="#fff" />
          </ScrollTopButton>
        )}
      </>
    )
  }
)
