import { Screens } from '@/types/enums'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RouteProp } from '@react-navigation/native'

export type NativeChildrenProps = {
  children: React.ReactNode
}

export type RootStackParamList = {
  [Screens.Home]: undefined
  [Screens.Details]: { id: number; title: string }
}

export type NavigationType = NativeStackNavigationProp<RootStackParamList>
export type AnyRoute = RouteProp<RootStackParamList, keyof RootStackParamList>

export type NavigationRoute = {
  key: string
  name: Screens
  params?: any
  path?: string
}
