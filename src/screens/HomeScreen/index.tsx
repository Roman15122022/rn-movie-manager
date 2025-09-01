import { JSX } from 'react'
import { ActivityIndicator } from 'react-native'
import { Row } from '@/components/Row'
import { Button, ButtonText } from '@/components/Button'
import { ScreenContainer } from '@/components/Screen'
import { useHomeScreen } from '@/screens/HomeScreen/useHomeScreen'
import { MoviesList } from '@/features/MovieList'
import {SearchInput} from "@/screens/HomeScreen/styles";

export default function HomeScreen(): JSX.Element {
  const {
    refetchSearch,
    setText,
    text,
    isLoading,
    toggleOnlyFavs,
    toggleFav,
    list,
    onlyFavs,
    favorites,
  } = useHomeScreen()


  return (
    <ScreenContainer>
      <Row style={{ paddingHorizontal: 4, paddingTop: 4 }}>
        <SearchInput
          placeholder="Search..."
          placeholderTextColor="#8b8b8b"
          value={text}
          onChangeText={setText}
          onSubmitEditing={() => refetchSearch()}
        />
        <Button
          variant="secondary"
          onPress={toggleOnlyFavs}
          style={{ marginLeft: 8 }}
        >
          <ButtonText>{onlyFavs ? 'All' : 'Favs'}</ButtonText>
        </Button>
      </Row>

      {isLoading && <ActivityIndicator style={{ marginTop: 24 }} />}

      <MoviesList
        data={list}
        favorites={favorites}
        onlyFavs={onlyFavs}
        isLoading={isLoading}
        onToggleFav={toggleFav}
      />
    </ScreenContainer>
  )
}
