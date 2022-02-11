import React, {useEffect, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboard from './screens/Onboard';
import Register from './screens/Register';
import Login from './screens/Login';
import Home from './screens/Home';
import {ActivityIndicator, View} from 'react-native';
import {loadStorageData} from './services/loginAPI';

// interface UserGlobalProps {
//   email: string;
//   password: string;
//   setEmail: Dispatch<SetStateAction<string>>;
//   setPassword: Dispatch<SetStateAction<string>>;
//   isLoggedIn: boolean;
//   setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
// }

// export const AppContext = React.createContext<UserGlobalProps>();

export type RootStackParamList = {
  Onboard: undefined;
  Register: undefined;
  Login: undefined;
  Home: undefined;
};

export interface AuthDataProps {
  nome: string;
  email: string;
  password: string;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const [authData, setAuthData] = useState<AuthDataProps | {}>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Every time the App is opened, this provider is rendered
    //and call de loadStorageData function.
    loadStorageData({setData: setAuthData, onSuccess: setLoading});
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {/* TODO: Usar contextAPI para acessar os dados do usuario na aplicacao. */}
      <Stack.Navigator
        screenOptions={{headerShadowVisible: false}}
        initialRouteName={authData ? 'Home' : 'Onboard'}>
        {!authData && (
          <>
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
          </>
        )}
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Home',
            headerTitleAlign: 'center',
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
