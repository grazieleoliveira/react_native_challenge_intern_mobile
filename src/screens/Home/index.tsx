import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StatusBar, View} from 'react-native';
import {RootStackParamList} from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({navigation}: Props) => {
  return (
    <View>
      <StatusBar barStyle="light-content" backgroundColor="#0050F0" />
    </View>
  );
};

export default Home;
