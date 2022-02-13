import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Controller, FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import {RootStackParamList} from '../../App';
import GlobalButton from '../../components/GlobalButton';
import GlobalTextInput from '../../components/TextInput';
import {doLogin} from '../../services/loginAPI';
import {useAuth} from '../../contexts/Auth';
import {yupResolver} from '@hookform/resolvers/yup';
import {yupLoginValidationSchema} from '../../utils/schema';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const height = Dimensions.get('window').height;

const Login = ({navigation}: Props) => {
  const [errorForbidden, setErrorForbidden] = useState(false);

  const {
    handleSubmit,

    formState: {errors},
    control,
    reset,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(yupLoginValidationSchema),
  });

  const auth = useAuth();

  const loginUser: SubmitHandler<FieldValues> = async data => {
    const newUser = {
      email: data.email,
      password: data.password,
    };

    const res = await doLogin(newUser);

    if (res === 'OK') {
      await auth.signIn(newUser);
    }
    if (res === 'FORBIDDEN') {
      setErrorForbidden(true);
    }
  };

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
        <Controller
          control={control}
          name="email"
          render={({field: {onChange, value}}) => (
            <GlobalTextInput
              placeholder="Digite seu e-mail"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <GlobalTextInput
              placeholder="Digite sua senha"
              onChangeText={text =>
                String(text).includes(' ')
                  ? onChange(String(text).trim())
                  : onChange(text)
              }
              isPassword={true}
              value={value}
            />
          )}
          name="password"
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
              {errorForbidden && (
                <Text style={styles.errorText}>
                  Usuário ou senha incorretos
                </Text>
              )}
            </>
          )}
        </View>
        <View style={styles.buttonContainer}>
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
            onPress={() => {
              navigation.navigate('Register');
              reset({
                email: '',
                password: '',
              });
            }}
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
