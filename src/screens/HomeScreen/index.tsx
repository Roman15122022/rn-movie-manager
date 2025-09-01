import { JSX } from 'react'
import { ActivityIndicator } from 'react-native'
import { Row } from '@/components/Row'
import { Button, ButtonText } from '@/components/Button'
import { ScreenContainer } from '@/components/Screen'
import { MoviesList } from '@/features/MovieList'
import {
  SearchContainer,
  SearchInput,
  ClearButton,
} from '@/screens/HomeScreen/styles'
import { X } from 'lucide-react-native'
import { useHomeScreen } from '@/screens/HomeScreen/useHomeScreen'
import {ICONS_SIZE} from "@/screens/HomeScreen/constants";

export default function HomeScreen(): JSX.Element {
  const {
    searchValue,
    handleSearchChange,
    movies,
    isInitialLoading,
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
    canAutoPaginate,
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

      {isInitialLoading ? (
        <ActivityIndicator style={{ marginTop: ICONS_SIZE }} />
      ) : null}

      <MoviesList
        ref={listRef}
        data={movies}
        favorites={favorites}
        onlyFavs={isOnlyFavs}
        onToggleFav={toggleFav}
        onEndReached={onEndReached}
        onScroll={onScroll}
        isFetchingNext={isFetchingNext}
        hasNextPage={hasNextPage}
        canAutoPaginate={canAutoPaginate}
        showScrollTop={showScrollTop}
        onScrollTopPress={scrollToTop}
      />
    </ScreenContainer>
  )
}
