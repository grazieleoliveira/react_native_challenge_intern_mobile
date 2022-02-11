import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboard from './screens/Onboard';
import Register from './screens/Register';
import Login from './screens/Login';

export type RootStackParamList = {
  Onboard: undefined;
  Register: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      {/* TODO: User logado -> initial home Userdeslogado -> Initial onboard */}
      <Stack.Navigator
        screenOptions={{headerShadowVisible: false}}
        initialRouteName="Onboard">
        <Stack.Screen
          name="Onboard"
          component={Onboard}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            title: 'Cadastro',
            headerStyle: {
              backgroundColor: '#0050F0',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: 'RedHatDisplay-Bold',
            },
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: 'Login',
            headerStyle: {
              backgroundColor: '#0050F0',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: 'RedHatDisplay-Bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
