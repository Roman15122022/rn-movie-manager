import styled, { css } from 'styled-components/native'
import { Row } from '@/components/Row'
import { TouchableOpacity } from 'react-native'

export const ActionsRow = styled(Row)`
  margin-top: ${({ theme }) => theme.spacing(3)}px;
`

export const TitleRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
`

export const TitleText = styled.Text(
  ({ theme: { colors, font } }) => css`
    color: ${colors.text};
    font-size: ${font.h2}px;
    font-weight: 700;
    flex: 1;
    margin-right: 8px;
  `
)

export const Meta = styled.Text(
  ({ theme: { colors, font } }) => css`
    color: ${colors.muted};
    font-size: ${font.small}px;
  `
)

export const Director = styled.Text(
  ({ theme: { colors, font, spacing } }) => css`
    color: ${colors.text};
    font-size: ${font.small}px;
    margin-top: ${spacing(1)}px;
  `
)

export const InfoRow = styled(Row)`
  margin-top: ${({ theme }) => theme.spacing(1)}px;
  align-items: flex-start;
`

export const Label = styled.Text(
  ({ theme: { colors, font } }) => css`
    color: ${colors.secondary};
    font-size: ${font.small}px;
    font-weight: 600;
    margin-right: 6px;
    min-width: 60px;
  `
)

export const Value = styled.Text.attrs({
  numberOfLines: 2,
  ellipsizeMode: 'tail',
})(
  ({ theme: { colors, font } }) => css`
    color: ${colors.text};
    font-size: ${font.small}px;
    flex: 1;
  `
)

export const ScrollTopButton = styled(TouchableOpacity)`
  position: absolute;
  right: 16px;
  bottom: 24px;
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: ${({ theme }) => theme.colors.secondary};
  justify-content: center;
  align-items: center;
`
