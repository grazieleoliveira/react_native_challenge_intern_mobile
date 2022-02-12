import React, {Dispatch, SetStateAction} from 'react';
import {StyleSheet, TextInput} from 'react-native';

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
}

const GlobalTextInput = ({
  placeholder,
  onChangeText,
  keyboardType = 'default',
}: TextInputProps) => {
  return (
    <TextInput
      style={styles.textInput}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      placeholder={placeholder}
      placeholderTextColor="#FFFFFF80"
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: '#FFF',
    borderWidth: 1,
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    paddingVertical: 14,
    color: '#FFF',
  },
});

export default GlobalTextInput;
