import styled, { css } from 'styled-components/native'
import { TextInput, TouchableOpacity } from 'react-native'

export const SearchContainer = styled.View(
  ({ theme: { colors, radius, spacing } }) => css`
    flex-direction: row;
    align-items: center;
    width: 100%;
    border-width: 1px;
    border-color: ${colors.border};
    border-radius: ${radius.s}px;
    padding: 0 ${spacing(2)}px;
    height: 44px;
    background-color: transparent;
    margin: ${spacing(5)}px 0;
  `
)

export const SearchInput = styled(TextInput)(
  ({ theme: { colors } }) => css`
    flex: 1;
    color: ${colors.text};
  `
)

export const ClearButton = styled(TouchableOpacity)(
  ({ theme: { spacing } }) => css`
    margin-left: ${spacing(1)}px;
  `
)

export const Tabs = styled.View(
  ({ theme: { spacing } }) => css`
    flex-direction: row;
    width: 100%;
    margin-top: ${spacing(1)}px;
  `
)

export const TabButton = styled(TouchableOpacity)<{
  active?: boolean
  left?: boolean
  right?: boolean
}>(
  ({ theme: { colors, radius }, active, left, right }) => css`
    flex: 1;
    padding: 10px 0;
    background-color: ${active ? colors.secondary : colors.card};
    border-color: ${colors.border};
    border-width: 1px;
    ${left &&
    css`
      border-top-left-radius: ${radius.m}px;
      border-bottom-left-radius: ${radius.m}px;
    `}
    ${right &&
    css`
      border-top-right-radius: ${radius.m}px;
      border-bottom-right-radius: ${radius.m}px;
    `}
    align-items: center;
    justify-content: center;
  `
)

export const TabText = styled.Text(
  ({ theme: { colors, font } }) => css`
    color: ${colors.text};
    font-size: ${font.small}px;
    font-weight: 600;
  `
)
