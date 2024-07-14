import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import splashScreen from './screens/SplashScreen';
import signUpScreen from './screens/Signup';
import loginScreen from './screens/Login';
import charactersScreen from './screens/Characters';
import { Provider } from 'react-redux';
import store from './store/store';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="splash">
          <Stack.Screen name="splash" component={splashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="signUp" component={signUpScreen} options={{ headerShown: false }} />
          <Stack.Screen name="login" component={loginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="characters" component={charactersScreen} options={{ headerShown: false }} />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
