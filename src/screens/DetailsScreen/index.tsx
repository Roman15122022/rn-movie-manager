import { JSX } from 'react'
import { ActivityIndicator } from 'react-native'
import { ScreenContainer } from '@/components/Screen'
import { Star } from 'lucide-react-native'
import {
  Backdrop,
  Container,
  Header,
  Info,
  Label,
  Meta,
  Poster,
  PosterRow,
  Section,
  StarButton,
  Title,
  Value,
  TitleRow,
  WatchButton,
  WatchButtonText,
} from './styles'
import { useDetailsScreen } from './useDetailsScreen'

const DetailsScreen = (): JSX.Element => {
  const {
    status,
    error,
    refetch,
    isFetching,
    isFavorite,
    onToggleFavorite,
    posterUri,
    backdropUri,
    year,
    runtime,
    rating,
    votes,
    genres,
    director,
    stars,
    data,
    handleWatchNow,
  } = useDetailsScreen()

  return (
    <ScreenContainer>
      <Container>
        <Header />
        {backdropUri ? (
          <Backdrop source={backdropUri} resizeMode="cover" />
        ) : null}

        <PosterRow>
          <Poster source={posterUri} resizeMode="cover" />
          <Info>
            <TitleRow>
              <Title>{data?.title || '—'}</Title>
              <StarButton onPress={onToggleFavorite} activeOpacity={0.7}>
                <Star
                  size={22}
                  color={isFavorite ? '#FFD700' : '#888'}
                  fill={isFavorite ? '#FFD700' : 'transparent'}
                />
              </StarButton>
            </TitleRow>

            <Meta>
              {year} • {genres || '—'}
            </Meta>
            <Meta>
              Runtime: {runtime} • Rating: {rating} ({votes})
            </Meta>
          </Info>
        </PosterRow>

        <Section>
          <Label>Overview</Label>
          <Value>{data?.overview || '—'}</Value>
        </Section>

        <Section>
          <Label>Director</Label>
          <Value>{director}</Value>
        </Section>

        <Section>
          <Label>Stars</Label>
          <Value>{stars || '—'}</Value>
        </Section>

        {status === 'pending' || isFetching ? (
          <ActivityIndicator style={{ marginTop: 12 }} />
        ) : null}

        {status === 'error' ? (
          <Section>
            <Label>Error</Label>
            <Value onPress={() => refetch()}>{String(error)}</Value>
          </Section>
        ) : null}
      </Container>
      <WatchButton onPress={handleWatchNow}>
        <WatchButtonText>Watch Now</WatchButtonText>
      </WatchButton>
    </ScreenContainer>
  )
}

export default DetailsScreen
