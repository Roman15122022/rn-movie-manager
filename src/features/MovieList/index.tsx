import { forwardRef } from 'react'
import { FlatList } from 'react-native'
import { Card } from '@/components/Card'
import { Title } from '@/components/Title'
import {
  InfoRow,
  Label,
  Value,
  ScrollTopButton,
  TitleText,
  TitleRow,
} from './styles'
import { ICON_SIZE, VIEW_CONFIG } from './constants'
import { useMovieList } from './useMovieList'
import { Props } from './types'
import { MovieExtraInfo } from '@/features/MovieExtraInfo'
import { ArrowUp, Star } from 'lucide-react-native'

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
            const isFavorite = favorites.includes(item.id)
            return (
              <Card onPress={() => openMovie(item.id, item.title)}>
                <TitleRow>
                  <TitleText>{item.title}</TitleText>
                  <Star
                    size={20}
                    color={isFavorite ? '#FFD700' : '#888'}
                    fill={isFavorite ? '#FFD700' : 'transparent'}
                    onPress={() => onToggleFav(item.id)}
                  />
                </TitleRow>
                <InfoRow>
                  <Label>Year:</Label>
                  <Value>{year}</Value>
                </InfoRow>
                <MovieExtraInfo item={item} dict={dict} />
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
            <ArrowUp size={ICON_SIZE} color="#fff" />
          </ScrollTopButton>
        )}
      </>
    )
  }
)
