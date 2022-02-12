import React from 'react';

import {AuthProvider} from './contexts/Auth';
import Routes from './routes';

export type RootStackParamList = {
  Onboard: undefined;
  Register: undefined;
  Login: undefined;
  Home: undefined;
};

export interface AuthContextData {
  authData?: AuthData;
  loading: boolean;
  signIn: (data?: AuthData) => Promise<void>;
  signOut(): void;
}

export interface AuthData {
  nome?: string;
  email: string;
  password: string;
}

const App = () => {
  return (
    <AuthProvider>
      {/* TODO: Usar contextAPI para acessar os dados do usuario na aplicacao. */}
      <Routes />
    </AuthProvider>
  );
};

export default App;
