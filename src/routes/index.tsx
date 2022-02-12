import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboard from '../screens/Onboard';
import Register from '../screens/Register';
import Login from '../screens/Login';
import Home from '../screens/Home';
import {ActivityIndicator, View} from 'react-native';
import {useAuth} from '../contexts/Auth';
import {RootStackParamList} from '../App';
import reactotron from 'reactotron-react-native';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Routes = () => {
  // const [authData, setAuthData] = useState<AuthData | {}>({});
  // const [loading, setLoading] = useState(true);
  const {authData, loading} = useAuth();

  reactotron.log('auth', authData);

  if (loading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShadowVisible: false}}
        initialRouteName={authData ? 'Home' : 'Onboard'}>
        {!authData ? (
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
        ) : (
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
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
