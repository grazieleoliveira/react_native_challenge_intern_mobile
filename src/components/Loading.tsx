import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

// import { Container } from './styles';

const Loading = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size={64} color="#0050F0" />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading;
