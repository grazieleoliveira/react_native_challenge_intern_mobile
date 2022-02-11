import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {RootStackParamList} from '../../App';
import GlobalButton from '../../components/GlobalButton';
import SanarLogo from '../../components/SanarLogo';
import GlobalTextInput from '../../components/TextInput';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const Register = ({navigation}: Props) => {
  // TODO
  // Melhoria:  Talvez usar useReducer() ?
  const [email, setEmail] = React.useState('');
  const [nome, setNome] = React.useState('');
  const [senha, setSenha] = React.useState('');

  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar barStyle="light-content" backgroundColor="#0050F0" />
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/logo-negativo.png')}
          style={styles.image}
        />
      </View>
      {/* TODO: INPUT GLOBAL */}
      {/* <Image
        source={require('../../assets/images/user-picture.png')}
        style={styles.userPic}
        resizeMode={'cover'}
      /> */}

      <View style={styles.textInputContainer}>
        <GlobalTextInput
          placeholder="Digite seu nome"
          text={nome}
          onChangeText={setNome}
        />
        <GlobalTextInput
          placeholder="Digite seu e-mail"
          text={email}
          onChangeText={setEmail}
        />
        <GlobalTextInput
          placeholder="Digite sua senha"
          text={senha}
          onChangeText={setSenha}
        />
      </View>
      <View style={styles.buttonContainer}>
        <GlobalButton
          title="Finalizar Cadastro"
          color="#FFF"
          colorText="#0050F0"
          onTouch={() => {}}
        />
      </View>
      <Text style={styles.defaultText}>
        Ao clicar em <Text style={styles.boldText}>"Finalizar cadastro"</Text>{' '}
        você estará aceitando também nossos termos e condições
      </Text>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#0050F0',
    alignItems: 'center',
  },
  imageContainer: {
    paddingTop: 40,
  },
  image: {
    width: 152,
    height: 45,
  },
  userPic: {
    width: 94,
    height: 94,
    borderColor: '#FFF',
    borderWidth: 4,
    borderRadius: 75,
  },
  textInputContainer: {
    width: '100%',
    paddingHorizontal: 24,
    flex: 0.5,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingTop: 32,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 150,
    width: '100%',
    paddingHorizontal: 24,
  },
  defaultText: {
    position: 'absolute',
    bottom: 100,
    color: '#FFF',
    fontFamily: 'RedHatDisplay-Regular',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  boldText: {
    color: '#FFF',
    fontFamily: 'RedHatDisplay-Bold',
    fontSize: 14,
  },
});

export default Register;
