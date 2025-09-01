import styled from 'styled-components/native'

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.font.h1}px;
  font-weight: 700;
`

export const Subtitle = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.8;
  font-size: ${({ theme }) => theme.font.h2}px;
  margin-top: ${({ theme }) => theme.spacing(1)}px;
`
