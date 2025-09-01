import { JSX } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { ScreenContainer } from '@/components/Screen'
import { MoviesList } from '@/features/MovieList'
import {
  SearchContainer,
  SearchInput,
  ClearButton,
  Tabs,
  TabButton,
  TabText,
} from '@/screens/HomeScreen/styles'
import { X } from 'lucide-react-native'
import { useHomeScreen } from '@/screens/HomeScreen/useHomeScreen'
import { ICONS_SIZE } from '@/screens/HomeScreen/constants'
import { GenresBar } from '@/features/GenreBar'

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
      <View style={{ paddingHorizontal: 8, paddingTop: 8 }}>
        <Tabs>
          <TabButton
            left
            active={!isOnlyFavs}
            onPress={() => isOnlyFavs && toggleOnlyFavs()}
          >
            <TabText>All</TabText>
          </TabButton>
          <TabButton
            right
            active={isOnlyFavs}
            onPress={() => !isOnlyFavs && toggleOnlyFavs()}
          >
            <TabText>Favorites</TabText>
          </TabButton>
        </Tabs>

        <GenresBar />

        <SearchContainer>
          <SearchInput
            placeholder="Search..."
            placeholderTextColor="#8b8b8b"
            value={searchValue}
            onChangeText={handleSearchChange}
          />
          {searchValue.length > 0 && (
            <ClearButton onPress={handleClear}>
              <X size={ICONS_SIZE} color="#8b8b8b" />
            </ClearButton>
          )}
        </SearchContainer>
      </View>

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
