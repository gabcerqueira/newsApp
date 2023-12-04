import {Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getTokenFromStorage = async () => {
  const token = await AsyncStorage.getItem('sessionToken');

  if (!token) throw Error('Token inválido');

  return token;
};

export const setTokenToStorage = async (token: string) => {
  await AsyncStorage.setItem('sessionToken', token);
};
