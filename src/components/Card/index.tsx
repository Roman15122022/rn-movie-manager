import styled from 'styled-components/native'

export const Card = styled.View`
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.radius.m}px;
  padding: ${({ theme }) => theme.spacing(4)}px;
  margin: ${({ theme }) => theme.spacing(2)}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
`
