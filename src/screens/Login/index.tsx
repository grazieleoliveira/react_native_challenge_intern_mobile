import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useContext} from 'react';
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import reactotron from 'reactotron-react-native';
import {AppContext, RootStackParamList} from '../../App';
import GlobalButton from '../../components/GlobalButton';
import GlobalTextInput from '../../components/TextInput';
import {doLogin} from '../../services/loginAPI';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const height = Dimensions.get('window').height;

interface UserLoginProps {
  email: string;
  password: string;
}

const Login = ({navigation}: Props) => {
  // TODO
  // Melhoria:  Talvez usar useReducer() ?
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [user, setUser] = React.useState<UserLoginProps>();
  const myContext = useContext(AppContext);

  React.useEffect(() => {
    if (email && senha) {
      const newUser = {
        email,
        password: senha,
      };
      setUser(newUser);
    }
  }, [email, senha]);

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#0050F0" />
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/logo-negativo.png')}
          style={styles.image}
        />
      </View>
      <Image
        source={require('../../assets/images/user-picture.png')}
        style={styles.userPic}
        resizeMode={'cover'}
      />

      <View style={styles.textInputContainer}>
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
          {/* TODO: Substituir titulo por ActivityIndicator quando o request ta carregando */}
          <GlobalButton
            title="Entrar"
            color="#FFF"
            colorText="#0050F0"
            onTouch={async () => {
              const res = await doLogin(user);
              if (res === 'OK') {
                navigation.navigate('Home');
              }
            }}
          />
        </View>
        <Text style={styles.defaultText}>
          Não possui um acesso?
          <Text
            onPress={() => navigation.navigate('Register')}
            style={styles.boldText}>
            {' '}
            Cadastre-se aqui
          </Text>
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
    padding: 32,
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
    marginBottom: 16,
  },
  textInputContainer: {
    width: '100%',
    paddingHorizontal: 24,
    height: height / 2.5,
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

export default Login;
