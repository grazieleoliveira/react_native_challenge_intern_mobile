import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dispatch, SetStateAction} from 'react';
import reactotron from 'reactotron-react-native';
import {AuthDataProps} from '../App';

const TIMEOUT = 2500;
const SUCCESS_STATUS = 'OK';
const FORBIDDEN_STATUS = 'FORBIDDEN';
const USER_KEY = 'user_key';
const LOGGED_USER_KEY = 'logged_key';

const saveUser = (users: any) => AsyncStorage.setItem(USER_KEY, users);

export const readUser = async () => {
  const item = await AsyncStorage.getItem(USER_KEY);
  reactotron.log('item', item);
  return AsyncStorage.getItem(USER_KEY);
};

const simulateRequest =
  (response: string) => (callback: (arg0: any) => void) => {
    setTimeout(() => {
      callback(response);
    }, TIMEOUT);
  };

export const doCreateUser = (user: any) =>
  new Promise(async resolve => {
    var users: any[] = [];
    const savedUsers = await readUser();

    if (savedUsers) {
      const recoveredUsers = JSON.parse(savedUsers);
      users = [...recoveredUsers];
    }

    users.push(user);

    await saveUser(JSON.stringify(users));
    simulateRequest(SUCCESS_STATUS)(resolve);
  });

const saveLoggedUser = (user: any) =>
  AsyncStorage.setItem(LOGGED_USER_KEY, user);

export const doLogin = (user: any) =>
  new Promise(async resolve => {
    const savedUsers = await readUser();

    if (!savedUsers) {
      return simulateRequest(FORBIDDEN_STATUS)(resolve);
    }
    const arraySavedUsers = JSON.parse(savedUsers);
    const userMatch = arraySavedUsers.some(
      (existentUser: {password: any}) =>
        user.password === existentUser.password,
    );
    if (userMatch) {
      simulateRequest(SUCCESS_STATUS)(resolve);
      // adicionei essa função pra fazer a verificação no login
      saveLoggedUser(JSON.stringify(userMatch));
    } else {
      simulateRequest(FORBIDDEN_STATUS)(resolve);
    }
  });

interface loadStorageDataProps {
  setData: Dispatch<SetStateAction<AuthDataProps>>;
  onSuccess: Dispatch<SetStateAction<boolean>>;
}
export const loadStorageData = async ({
  setData,
  onSuccess,
}: loadStorageDataProps) => {
  try {
    //Try get the data from Async Storage
    const authDataSerialized = await AsyncStorage.getItem('logged_key');
    if (authDataSerialized) {
      //If there are data, it's converted to an Object and the state is updated.
      const _authData = JSON.parse(authDataSerialized);
      setData(_authData);
    }
  } catch (error) {
  } finally {
    onSuccess(false);
  }
};
