import styled, { css } from 'styled-components/native'
import { TouchableOpacity, Image } from 'react-native'
import { Row } from '@/components/Row'

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: { paddingBottom: 24 },
})`
  flex: 1;
`

export const Header = styled.View(
  ({ theme: { spacing } }) => css`
    margin: ${spacing(4)}px;
    margin-bottom: ${spacing(2)}px;
  `
)

export const PosterRow = styled(Row)(
  ({ theme: { spacing } }) => css`
    margin: 0 ${spacing(2)}px;
    margin-top: -60px;
  `
)

export const Poster = styled(Image)`
  width: 120px;
  height: 180px;
  border-radius: ${({ theme }) => theme.radius.m}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.card};
`

export const Info = styled.View(
  ({ theme: { spacing } }) => css`
    flex: 1;
    margin-left: ${spacing(2)}px;
  `
)

export const TitleRow = styled(Row)(
  ({ theme: { spacing } }) => css`
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${spacing(1)}px;
  `
)

export const Title = styled.Text(
  ({ theme: { colors, font } }) => css`
    color: ${colors.text};
    font-size: ${font.h1}px;
    font-weight: 800;
    flex: 1;
  `
)

export const Meta = styled.Text(
  ({ theme: { colors, font, spacing } }) => css`
    color: ${colors.muted};
    font-size: ${font.small}px;
    margin-top: ${spacing(1)}px;
  `
)

export const StarButton = styled(TouchableOpacity)(
  ({ theme: { spacing } }) => css`
    padding: ${spacing(1)}px;
    margin-left: ${spacing(1)}px;
  `
)

export const Section = styled.View(
  ({ theme: { spacing } }) => css`
    margin: ${spacing(2)}px;
  `
)

export const Label = styled.Text(
  ({ theme: { colors, font } }) => css`
    color: ${colors.secondary};
    font-size: ${font.small}px;
    font-weight: 600;
    margin-bottom: 6px;
  `
)

export const Value = styled.Text.attrs({
  numberOfLines: 6,
  ellipsizeMode: 'tail',
})(
  ({ theme: { colors, font } }) => css`
    color: ${colors.text};
    font-size: ${font.body}px;
    line-height: ${font.body + 6}px;
  `
)

export const WatchButton = styled.TouchableOpacity(
  ({ theme: { colors, spacing, radius } }) => css`
    position: absolute;
    left: ${spacing(4)}px;
    right: ${spacing(4)}px;
    bottom: ${spacing(6)}px;
    background-color: ${colors.primary};
    padding-vertical: ${spacing(3)}px;
    border-radius: ${radius.m}px;
    align-items: center;
    justify-content: center;
  `
)

export const WatchButtonText = styled.Text(
  ({ theme: { colors, font } }) => css`
    color: ${colors.text};
    font-size: ${font.h2}px;
    font-weight: 700;
  `
)

export const HeaderContainer = styled.View<{ hasBackdrop?: boolean }>(
  ({ theme: { spacing }, hasBackdrop }) => css`
    position: relative;
    ${!hasBackdrop &&
    css`
      padding-top: ${spacing(6)}px;
      min-height: 80px;
    `}
  `
)

export const Backdrop = styled(Image)`
  width: 100%;
  height: 180px;
  border-bottom-left-radius: ${({ theme }) => theme.radius.m}px;
  border-bottom-right-radius: ${({ theme }) => theme.radius.m}px;
`

export const BackButton = styled(TouchableOpacity)(
  ({ theme: { spacing } }) => css`
    position: absolute;
    left: ${spacing(2)}px;
    top: ${spacing(1)}px;
    z-index: 50;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.45);
    opacity: 0.8;
    align-items: center;
    justify-content: center;
  `
)
