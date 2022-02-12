import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StatusBar, Text, TouchableOpacity, View} from 'react-native';
import reactotron from 'reactotron-react-native';
import {RootStackParamList} from '../../App';
import {useAuth} from '../../contexts/Auth';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({navigation}: Props) => {
  const auth = useAuth();
  const signOut = () => {
    auth.signOut();
    if (!auth.authData) {
      navigation.navigate('Onboard')
    }
  };

  React.useEffect(() => {
    reactotron.log(auth.authData);
  }, [auth]);

  return (
    <View>
      <StatusBar barStyle="light-content" backgroundColor="#0050F0" />
      <TouchableOpacity onPress={signOut}>
        <Text>dasdas</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
