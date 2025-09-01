import styled from 'styled-components/native'

export const Button = styled.Pressable<{ variant?: 'primary' | 'secondary' }>`
  background-color: ${({ theme, variant }) =>
    variant === 'secondary' ? theme.colors.secondary : theme.colors.primary};
  padding: ${({ theme }) => theme.spacing(3)}px;
  border-radius: ${({ theme }) => theme.radius.s}px;
  align-items: center;
  justify-content: center;
`
export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.font.body}px;
`
