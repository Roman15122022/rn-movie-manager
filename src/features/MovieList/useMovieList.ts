import { useSelection } from '@/store/SelectedMovie'
import { useNavigate } from '@/hooks/useAppNavigation'
import { Screens } from '@/types/enums'

export const useMovieList = () => {
  const { goTo } = useNavigate()
  const setSelectedId = useSelection((s) => s.setSelectedId)

  const openMovie = (id: number, title: string) => {
    setSelectedId(id)
    goTo(Screens.Details, { id, title })
  }

  return { openMovie }
}
