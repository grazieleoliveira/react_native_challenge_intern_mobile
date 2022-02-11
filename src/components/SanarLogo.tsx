import React, {Component} from 'react';
import {Image} from 'react-native';

class SanarLogo extends Component {
  render() {
    return (
      <Image
        source={require('../assets/logo-sanar.png')}
        style={{width: 152, height: 45}}
      />
    );
  }
}

export default SanarLogo;
