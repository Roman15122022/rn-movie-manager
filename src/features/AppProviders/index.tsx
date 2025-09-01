import { NativeChildrenProps } from '@/types'
import { lightTheme } from '@/theme/theme'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/features/AppProviders/constants'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from 'styled-components'
import { JSX } from 'react'

const AppProviders = (props: NativeChildrenProps): JSX.Element => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <ThemeProvider theme={lightTheme} {...props} />
        </SafeAreaProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  )
}

export default AppProviders
