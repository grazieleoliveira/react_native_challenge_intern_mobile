import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useLang} from '../contexts/Language';

const ChangeLanguage = () => {
  const {changeLang} = useLang();


  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={() => changeLang('en')}>
        <Image
          style={styles.image}
          source={require('../assets/images/united-states.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => changeLang('es')}>
        <Image
          style={styles.image}
          source={require('../assets/images/spain.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 32,
    height: 32,
    marginRight: 16,
    borderColor: '#FFF',
    borderWidth: 2,
    borderRadius: 75,
  },
});

export default ChangeLanguage;
