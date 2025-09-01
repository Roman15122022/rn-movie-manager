import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '@/screens/HomeScreen'
import DetailsScreen from '@/screens/DetailsScreen'
import { Screens } from '@/types/enums'

const Navigation = () => {
  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={Screens.Home} component={HomeScreen} />
        <Stack.Screen name={Screens.Details} component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
