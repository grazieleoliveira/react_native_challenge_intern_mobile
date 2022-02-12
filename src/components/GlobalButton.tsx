import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

interface GlobalButtonProps {
  title: string;
  color?: string;
  colorText: string;
  paddingVertical?: number;
  fontSize?: number;
  onTouch: () => void;
}

const GlobalButton = ({
  title,
  color,
  colorText,
  paddingVertical = 16,
  fontSize = 16,
  onTouch,
}: GlobalButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onTouch}
      style={{
        ...styles.mainContainer,
        backgroundColor: color,
        paddingVertical,
      }}>
      <Text style={{...styles.text, color: colorText, fontSize}}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'blue',
    borderWidth: 2,
  },
  text: {
    paddingHorizontal: 16,
    fontFamily: 'Roboto-Bold',
  },
});

export default GlobalButton;
