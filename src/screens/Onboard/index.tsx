import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text} from 'react-native';

import SanarLogo from '../../components/SanarLogo';

const Onboard = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <SanarLogo />
      <Text>Temos uma solução para cada etapa da sua carreira na medicina</Text>
      <Text>
        Existimos para te ajudar em cada passo dessa incrível misão de cuidar de
        vidas
      </Text>
      {/* TODO: Buttonn global component */}
      <Text>Começar agora</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Onboard;
