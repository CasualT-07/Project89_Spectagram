import {NavigationContainer} from '@react-navigation/native'
import DrawerNavigator from './navigation/DrawerNavigation';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import db from './config';

const Stack = createStackNavigator();

const StackNav = () => {
  return(
    <Stack.Navigator
      initialRouteName='Login'
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Register' component={RegisterScreen} />
      <Stack.Screen name='Dashboard' component={DrawerNavigator} />
    </Stack.Navigator>
  )
}

export default function App() {
  return(
    <NavigationContainer>
      <StackNav />
    </NavigationContainer>
  )
}
