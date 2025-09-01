import { useNavigation, useRoute } from '@react-navigation/native'
import { useCallback } from 'react'
import { AnyRoute, NavigationRoute, NavigationType } from '@/types'
import { Screens } from '@/types/enums'

export const useNavigate = () => {
  const navigation = useNavigation<NavigationType>()

  const route = useRoute<AnyRoute>()
  const currentRouteName = route?.name as Screens

  const state = navigation.getState()
  const routes = (state?.routes || []) as unknown as NavigationRoute[]
  const previous =
    routes.length > 1
      ? (routes[routes.length - 2] as NavigationRoute)
      : undefined

  const goTo = useCallback(
    (screen: Screens, params?: any) => {
      navigation.navigate(screen, params)
    },
    [navigation]
  )

  const replaceTo = useCallback(
    (screen: Screens, params?: any) => {
      navigation.replace(screen, params)
    },
    [navigation]
  )

  const goBack = useCallback(() => {
    if (navigation.canGoBack()) navigation.goBack()
  }, [navigation])

  return {
    previous,
    goTo,
    goBack,
    replaceTo,
    navigation,
    currentRouteName,
  }
}
