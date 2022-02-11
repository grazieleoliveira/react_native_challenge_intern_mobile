import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {RootStackParamList} from '../../App';
import GlobalButton from '../../components/GlobalButton';
import GlobalTextInput from '../../components/TextInput';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const height = Dimensions.get('window').height;

const Register = ({navigation}: Props) => {
  // TODO
  // Melhoria:  Talvez usar useReducer() ?
  const [email, setEmail] = React.useState('');
  const [nome, setNome] = React.useState('');
  const [senha, setSenha] = React.useState('');

  return (
    <View style={styles.mainContainer}>
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
        <View style={styles.buttonContainer}>
          <GlobalButton
            title="Finalizar Cadastro"
            color="#FFF"
            colorText="#0050F0"
            onTouch={() => navigation.navigate('Login')}
          />
        </View>
        <Text style={styles.defaultText}>
          Ao clicar em <Text style={styles.boldText}>"Finalizar cadastro"</Text>{' '}
          você estará aceitando também nossos termos e condições
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#0050F0',
    alignItems: 'center',
  },
  imageContainer: {
    padding: 40,
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
    height: height / 1.9,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    paddingTop: 20,
  },
  defaultText: {
    color: '#FFF',
    fontFamily: 'RedHatDisplay-Regular',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  boldText: {
    color: '#FFF',
    fontFamily: 'RedHatDisplay-Bold',
    fontSize: 14,
  },
});

export default Register;
