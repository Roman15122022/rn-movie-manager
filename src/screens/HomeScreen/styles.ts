import styled from 'styled-components/native'
import { TextInput } from 'react-native'
import { css } from 'styled-components'

export const SearchInput = styled(TextInput)(
  ({ theme: { spacing, colors, radius } }) => css`
    flex: 1;
    color: ${colors.text};
    border-width: 1px;
    border-color: ${colors.border};
    border-radius: ${radius.s}px;
    padding: 0 ${spacing(3)}px;
    height: 44px;
    background-color: transparent;
  `
)
