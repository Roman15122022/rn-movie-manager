import styled, { css } from 'styled-components/native'
import { Row } from '@/components/Row'
import { TouchableOpacity } from 'react-native'

export const ActionsRow = styled(Row)`
  margin-top: ${({ theme }) => theme.spacing(3)}px;
`

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
`

export const Label = styled.Text(
  ({ theme: { colors, font } }) => css`
    color: ${colors.secondary};
    font-size: ${font.small}px;
    font-weight: 600;
    margin-right: 6px;
  `
)

export const Value = styled.Text(
  ({ theme: { colors, font } }) => css`
    color: ${colors.text};
    font-size: ${font.small}px;
  `
)

export const ScrollTopButton = styled(TouchableOpacity)`
  position: absolute;
  right: 16px;
  bottom: 24px;
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: ${({ theme }) => theme.colors.primary};
  justify-content: center;
  align-items: center;
`
