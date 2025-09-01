import styled, { css } from 'styled-components/native'
import { TextInput, TouchableOpacity } from 'react-native'

export const SearchContainer = styled.View(
  ({ theme: { colors, radius, spacing } }) => css`
    flex-direction: row;
    align-items: center;
    flex: 1;
    border-width: 1px;
    border-color: ${colors.border};
    border-radius: ${radius.s}px;
    padding: 0 ${spacing(2)}px;
    margin-bottom: ${spacing(2)}px;
    height: 44px;
    background-color: transparent;
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
