import { JSX } from 'react'
import { ActivityIndicator } from 'react-native'
import { Row } from '@/components/Row'
import { Button, ButtonText } from '@/components/Button'
import { ScreenContainer } from '@/components/Screen'
import { useHomeScreen } from '@/screens/HomeScreen/useHomeScreen'
import { MoviesList } from '@/features/MovieList'
import { SearchInput } from '@/screens/HomeScreen/styles'

export default function HomeScreen(): JSX.Element {
  const {
    handleSearch,
    searchValue,
    isLoading,
    toggleOnlyFavs,
    toggleFav,
    moviesList,
    isOnlyFavs,
    favorites,
  } = useHomeScreen()

  return (
    <ScreenContainer>
      <Row style={{ paddingHorizontal: 4, paddingTop: 4 }}>
        <SearchInput
          placeholder="Search..."
          placeholderTextColor="#8b8b8b"
          value={searchValue}
          onChangeText={handleSearch}
        />
        <Button
          variant="secondary"
          onPress={toggleOnlyFavs}
          style={{ marginLeft: 8 }}
        >
          <ButtonText>{isOnlyFavs ? 'All' : 'Favs'}</ButtonText>
        </Button>
      </Row>

      {isLoading && <ActivityIndicator style={{ marginTop: 24 }} />}

      <MoviesList
        data={moviesList}
        favorites={favorites}
        onlyFavs={isOnlyFavs}
        isLoading={isLoading}
        onToggleFav={toggleFav}
      />
    </ScreenContainer>
  )
}
