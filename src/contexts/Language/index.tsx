import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface LangData {
  lang?: 'es' | 'en';
  changeLang: (lang: 'es' | 'en') => void;
}

const LangContext = createContext<LangData>({} as LangData);

export const LangProvider: React.FC = ({children}) => {
  const [lang, setLang] = useState<'es' | 'en'>('en');

  const changeLang = (_lang: 'es' | 'en') => {
    //Remove  from context, so the App can be notified
    //and send the user to the AuthStack
    setLang(_lang);
  };

  return (
    //This component will be used to encapsulate the whole App,
    //so all components will have access to the Context
    <LangContext.Provider value={{lang, changeLang}}>
      {children}
    </LangContext.Provider>
  );
};

export function useLang(): LangData {
  const context = useContext(LangContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
