import styled, { css } from 'styled-components/native'
import { TouchableOpacity } from 'react-native'

export const BarContainer = styled.View(
  ({ theme: { spacing } }) => css`
    padding: ${spacing(1)}px 0;
    margin-top: ${spacing(3)}px;
  `
)

export const Chip = styled(TouchableOpacity)<{ active?: boolean }>(
  ({ theme: { colors, radius, spacing }, active }) => css`
    padding: 8px 12px;
    margin: 0 ${spacing(1)}px;
    border-radius: ${radius.s}px;
    border-width: 1px;
    border-color: ${active ? colors.primary : colors.border};
    background-color: ${active ? colors.primary : colors.card};
  `
)

export const ChipText = styled.Text(
  ({ theme: { colors, font } }) => css`
    color: ${colors.text};
    font-size: ${font.small}px;
    font-weight: 600;
  `
)

export const ListContent = styled.View(
  ({ theme: { spacing } }) => css`
    padding: 0 ${spacing(2)}px;
  `
)
