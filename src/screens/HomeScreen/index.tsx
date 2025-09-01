import { JSX } from 'react'
import { ActivityIndicator } from 'react-native'
import { Row } from '@/components/Row'
import { Button, ButtonText } from '@/components/Button'
import { ScreenContainer } from '@/components/Screen'
import { useHomeScreen } from '@/screens/HomeScreen/useHomeScreen'
import { MoviesList } from '@/features/MovieList'
import {
  SearchInput,
  SearchContainer,
  ClearButton,
} from '@/screens/HomeScreen/styles'
import { X } from 'lucide-react-native'

export default function HomeScreen(): JSX.Element {
  const {
    searchValue,
    handleSearchChange,
    movies,
    isLoading,
    isFetchingNext,
    hasNextPage,
    onEndReached,
    onScroll,
    listRef,
    showScrollTop,
    scrollToTop,
    favorites,
    isOnlyFavs,
    toggleFav,
    toggleOnlyFavs,
    handleClear,
  } = useHomeScreen()

  return (
    <ScreenContainer>
      <Row style={{ paddingHorizontal: 4, paddingTop: 4 }}>
        <SearchContainer>
          <SearchInput
            placeholder="Search..."
            placeholderTextColor="#8b8b8b"
            value={searchValue}
            onChangeText={handleSearchChange}
          />
          {searchValue.length > 0 && (
            <ClearButton onPress={handleClear}>
              <X size={20} color="#8b8b8b" />
            </ClearButton>
          )}
        </SearchContainer>
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
        ref={listRef}
        data={movies}
        favorites={favorites}
        onlyFavs={isOnlyFavs}
        isLoading={isLoading}
        onToggleFav={toggleFav}
        onEndReached={onEndReached}
        onScroll={onScroll}
        isFetchingNext={isFetchingNext}
        hasNextPage={hasNextPage}
        showScrollTop={showScrollTop}
        onScrollTopPress={scrollToTop}
      />
    </ScreenContainer>
  )
}
