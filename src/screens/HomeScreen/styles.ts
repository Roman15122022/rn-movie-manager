import styled from 'styled-components/native'
import { TextInput, TouchableOpacity } from 'react-native'

export const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.s}px;
  padding: 0 ${({ theme }) => theme.spacing(2)}px;
  height: 44px;
  background-color: transparent;
`

export const SearchInput = styled(TextInput)`
  flex: 1;
  color: ${({ theme }) => theme.colors.text};
`

export const ClearButton = styled(TouchableOpacity)`
  margin-left: ${({ theme }) => theme.spacing(1)}px;
`
