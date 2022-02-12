import React from 'react';

import {AuthProvider} from './contexts/Auth';
import {LangProvider} from './contexts/Language';
import Routes from './routes';

export type RootStackParamList = {
  Onboard: undefined;
  Register: undefined;
  Login: undefined;
  Home: undefined;
};

export interface AuthData {
  nome?: string;
  email: string;
  password: string;
}

const App = () => {
  return (
    <AuthProvider>
      <LangProvider>
        <Routes />
      </LangProvider>
    </AuthProvider>
  );
};

export default App;
