import * as yup from 'yup';

const schemaObject = {
  email: yup
    .string()
    .required('O email não pode ser vazio')
    .email('Seu email deve ser válido')
    .matches(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, 'Email inválido'),
  password: yup
    .string()
    .required('A senha não pode ser vazia')
    .min(8, 'A senha deve conter pelo menos 8 dígitos')
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$_%^&*-]).{8,}$/,
      'Sua senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, 1 dígito e um caractere especial',
    ),
};

export const yupLoginValidationSchema = yup.object().shape({...schemaObject});

export const yupRegisterValidationSchema = yup.object().shape({
  ...schemaObject,
  nome: yup.string().required('O nome não pode ser vazio'),
});
