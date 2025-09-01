import { FlatList } from 'react-native'
import { Row } from '@/components/Row'
import { Button, ButtonText } from '@/components/Button'
import { Card } from '@/components/Card'
import { Subtitle, Title } from '@/components/Title'
import { TmdbMovie } from '@/services/types'
import { useMovieList } from '@/features/MovieList/useMovieList'

type Props = {
  data: TmdbMovie[]
  favorites: number[]
  onlyFavs: boolean
  isLoading: boolean
  onToggleFav: (id: number) => void
}

export function MoviesList({
  data,
  favorites,
  onlyFavs,
  isLoading,
  onToggleFav,
}: Props) {
  const {openMovie} = useMovieList()

  return (
    <FlatList
      data={data}
      keyExtractor={(x) => String(x.id)}
      contentContainerStyle={{ paddingVertical: 8 }}
      renderItem={({ item }) => (
        <Card>
          <Title>{item.title}</Title>
          <Subtitle>{item.release_date?.slice(0, 4) || '—'}</Subtitle>
          <Row style={{ marginTop: 12 }}>
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
          </Row>
        </Card>
      )}
      ListEmptyComponent={
        !isLoading ? (
          <Card>
            <Title>Nothing to show</Title>
            <Subtitle>
              {onlyFavs && favorites.length === 0
                ? 'Favorites filter is ON, but you have no favorites yet.'
                : 'Try searching another title.'}
            </Subtitle>
          </Card>
        ) : null
      }
    />
  )
}
