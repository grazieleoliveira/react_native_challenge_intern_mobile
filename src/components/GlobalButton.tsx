import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

interface GlobalButtonProps {
  title: string;
  color: string;
  colorText: string;
  onTouch: () => void;
}

const GlobalButton = ({
  title,
  color,
  colorText,
  onTouch,
}: GlobalButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onTouch}
      style={{...styles.mainContainer, backgroundColor: color}}>
      <Text style={{...styles.text, color: colorText}}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    alignItems: 'center',
    borderRadius: 4,
  },
  text: {
    padding: 16,
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
  },
});

export default GlobalButton;
