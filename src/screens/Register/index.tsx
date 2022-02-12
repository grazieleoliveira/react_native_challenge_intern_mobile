import {yupResolver} from '@hookform/resolvers/yup';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import reactotron from 'reactotron-react-native';
import {RootStackParamList} from '../../App';
import GlobalButton from '../../components/GlobalButton';
import GlobalTextInput from '../../components/TextInput';
import {doCreateUser} from '../../services/loginAPI';
import {yupRegisterValidationSchema} from '../../utils/schema';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const height = Dimensions.get('window').height;

const Register = ({navigation}: Props) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: {errors},
  } = useForm({resolver: yupResolver(yupRegisterValidationSchema)});

  React.useEffect(() => {
    register('nome');
    register('email');
    register('password');
  }, [register]);

  const registerUser: SubmitHandler<FieldValues> = async data => {
    const newUser = {
      nome: data.nome,
      email: data.email,
      password: data.password,
    };

    const res = await doCreateUser(newUser);
    if (res === 'OK') {
      navigation.navigate('Login');
    }
  };

  reactotron.log('ee', errors);
  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#0050F0" />
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/logo-negativo.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.textInputContainer}>
        <GlobalTextInput
          placeholder="Digite seu nome"
          onChangeText={text => setValue('nome', text)}
        />
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
          errors.email?.type === 'required' ||
          errors.nome?.type === 'required' ? (
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
          <GlobalButton
            title="Finalizar Cadastro"
            color="#FFF"
            colorText="#0050F0"
            onTouch={handleSubmit(registerUser)}
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
  errorContainer: {
    width: '100%',
  },
  errorText: {
    color: '#ec2121',
    textAlign: 'left',
    fontFamily: 'RedHatDisplay-Bold',
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
