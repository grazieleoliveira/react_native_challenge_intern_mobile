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
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import {AuthData, RootStackParamList} from '../../App';
import GlobalButton from '../../components/GlobalButton';
import GlobalTextInput from '../../components/TextInput';
import {doLogin} from '../../services/loginAPI';
import {useAuth} from '../../contexts/Auth';
import {yupResolver} from '@hookform/resolvers/yup';
import reactotron from 'reactotron-react-native';
import {yupLoginValidationSchema} from '../../utils/schema';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const height = Dimensions.get('window').height;

const Login = ({navigation}: Props) => {
  // TODO
  // Melhoria:  Talvez usar useReducer() ?

  const {
    register,
    setValue,
    handleSubmit,
    formState: {errors},
  } = useForm({resolver: yupResolver(yupLoginValidationSchema)});

  const auth = useAuth();

  const loginUser: SubmitHandler<FieldValues> = async data => {
    const newUser = {
      email: data.email,
      password: data.password,
    };

    const res = await doLogin(newUser);
    reactotron.log(`res`, res);

    if (res === 'OK') {
      await auth.signIn(newUser);
      navigation.navigate(`Login`);
    }
  };

  React.useEffect(() => {
    register('email');
    register('password');
  }, [register]);

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
          onChangeText={text => setValue('email', text)}
        />
        <GlobalTextInput
          placeholder="Digite sua senha"
          onChangeText={text => setValue('password', text)}
        />
        <View style={styles.errorContainer}>
          {errors.password?.type === 'required' ||
          errors.email?.type === 'required' ? (
            <Text style={styles.errorText}>Preencha todos os campos</Text>
          ) : (
            <>
              {errors.password?.message && (
                <Text style={styles.errorText}>
                  •{'  '}
                  {errors.password.message}
                </Text>
              )}
              {errors.email?.message && (
                <Text style={styles.errorText}>
                  •{'  '}
                  {errors.email.message}
                </Text>
              )}
            </>
          )}
        </View>
        <View style={styles.buttonContainer}>
          {/* TODO: Substituir titulo por ActivityIndicator quando o request ta carregando */}
          <GlobalButton
            title="Entrar"
            color="#FFF"
            colorText="#0050F0"
            onTouch={handleSubmit(loginUser)}
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
  errorContainer: {
    width: '100%',
  },
  errorText: {
    color: '#ec2121',
    textAlign: 'left',
    fontFamily: 'RedHatDisplay-Bold',
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
