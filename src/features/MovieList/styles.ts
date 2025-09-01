import styled, { css } from 'styled-components/native'
import { Row } from '@/components/Row'

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
