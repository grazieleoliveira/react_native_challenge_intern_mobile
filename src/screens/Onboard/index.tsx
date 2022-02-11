import React from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import GlobalButton from '../../components/GlobalButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import SanarLogo from '../../components/SanarLogo';
import {RootStackParamList} from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboard'>;

const Onboard = ({navigation}: Props) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <View style={styles.imageContainer}>
        <SanarLogo />
      </View>
      <Text style={styles.textTitle}>
        Temos uma solução para cada etapa da sua carreira na medicina
      </Text>
      <Text style={styles.textSubtitle}>
        Existimos para te ajudar em cada passo dessa incrível missão de cuidar
        de vidas.
      </Text>
      <Image
        source={require('../../assets/images/desenho.png')}
        fadeDuration={0}
        resizeMode="contain"
        style={styles.desenhoImage}
      />
      <View style={styles.buttonContainer}>
        <GlobalButton
          title="Começar Agora"
          color="#0050F0"
          colorText="#FFF"
          onTouch={() => navigation.navigate('Login')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  imageContainer: {
    padding: 40,
  },
  textTitle: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    fontSize: 22,
    textAlign: 'center',
    color: '#121313',
    fontFamily: 'RedHatDisplay-Black',
  },
  textSubtitle: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    fontSize: 14,
    textAlign: 'center',
    color: '#414545',
    fontFamily: 'RedHatDisplay-Regular',
  },
  desenhoImage: {
    width: 360,
    height: 202,
  },
  buttonContainer: {
    width: '100%',
    position: 'absolute',
    paddingHorizontal: 24,
    bottom: 40,
  },
});

export default Onboard;
