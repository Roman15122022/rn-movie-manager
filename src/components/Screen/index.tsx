import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

export const ScreenContainer = styled(SafeAreaView).attrs({
  edges: ['top', 'bottom', 'left', 'right'],
})`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.bg};
  padding: ${({ theme }) => theme.spacing(3)}px;
`
