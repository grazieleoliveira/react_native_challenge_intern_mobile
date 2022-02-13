import React, {Dispatch, SetStateAction} from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTogglePasswordVisibility} from '../hooks/PasswordVisibility';

interface TextInputProps {
  placeholder: string;
  onChangeText: Dispatch<SetStateAction<string>>;
  keyboardType?:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad';
  isPassword?: boolean;
  value: string;
  borderColor?: string;
  inputColor?: string;
  placeholderColor?: string;
  borderRadius?: number;
  borderWidth?: number;
  paddingVertical?: number;
}

const GlobalTextInput = ({
  placeholder,
  onChangeText,
  keyboardType = 'default',
  isPassword = false,
  value,
  borderColor = '#FFF',
  inputColor = '#FFF',
  placeholderColor = '#FFFFFF80',
  borderRadius = 4,
  borderWidth = 1,
  paddingVertical = 14,
}: TextInputProps) => {
  const {passwordVisibility, handlePasswordVisibility} =
    useTogglePasswordVisibility();

  return (
    <View style={{...styles.container, borderColor, borderRadius, borderWidth}}>
      <TextInput
        style={{...styles.textInput, color: inputColor, paddingVertical}}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholder={placeholder}
        textAlign="left"
        secureTextEntry={passwordVisibility && isPassword}
        placeholderTextColor={placeholderColor}
        value={value}
      />
      {isPassword && !passwordVisibility && (
        <TouchableOpacity
          onPress={handlePasswordVisibility}
          style={styles.iconTouchable}>
          <Image source={require('../assets/images/eye.png')} />
        </TouchableOpacity>
      )}
      {isPassword && passwordVisibility && (
        <TouchableOpacity
          onPress={handlePasswordVisibility}
          style={styles.iconTouchable}>
          <Image source={require('../assets/images/eye-off.png')} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  textInput: {
    width: '90%',
    flexDirection: 'row',
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
  },
  iconTouchable: {
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GlobalTextInput;
