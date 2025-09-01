import { memo, useCallback } from 'react'
import { FlatList } from 'react-native'
import { BarContainer, Chip, ChipText } from './styles'
import { useGenres } from '@/hooks/useGetGenres'
import { useSelectedGenres } from '@/store/Genres'

export const GenresBar = memo(function GenresBar() {
  const { list } = useGenres()
  const { selected, toggle, clear } = useSelectedGenres()

  const renderItem = useCallback(
    ({ item }: any) => {
      const active = selected.includes(item.id)
      return (
        <Chip active={active} onPress={() => toggle(item.id)}>
          <ChipText>{item.name}</ChipText>
        </Chip>
      )
    },
    [selected, toggle]
  )

  return (
    <BarContainer>
      <FlatList
        data={list}
        keyExtractor={(x) => String(x.id)}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        ListHeaderComponent={
          <Chip active={selected.length === 0} onPress={clear}>
            <ChipText>All</ChipText>
          </Chip>
        }
      />
    </BarContainer>
  )
})
