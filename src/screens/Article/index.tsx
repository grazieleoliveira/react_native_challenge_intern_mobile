import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {RootStackParamList} from '../../App';
import RenderHtml, {defaultSystemFonts} from 'react-native-render-html';
import reactotron from 'reactotron-react-native';

const COLORS_BLUE = '#4040F1';
const COLORS_DARK = '#3B3B3A';

const stylizationObj = {
  a: {
    color: COLORS_BLUE,
  },
  p: {
    color: COLORS_DARK,
  },
  li: {
    color: COLORS_DARK,
  },
  h2: {
    color: COLORS_DARK,
  },
};

type Props = NativeStackScreenProps<RootStackParamList, 'Article'>;

const Article = ({route}: Props) => {
  const {title, content} = route.params;
  const [cleanContent, setCleanContent] = useState('');
  const {width} = useWindowDimensions();

  const systemFonts = [...defaultSystemFonts, 'Roboto-Regular', 'Roboto-Bold'];

  reactotron.log(`CONT`, content);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.mainTitle}>{title}</Text>
      <RenderHtml
        ignoredDomTags={['span']}
        contentWidth={width}
        source={{html: content}}
        baseStyle={{padding: 24, fontFamily: 'Roboto'}}
        systemFonts={systemFonts}
        tagsStyles={stylizationObj}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    color: '#3b3a3a',
    alignSelf: 'center',
    textAlign: 'center',
    margin: 24,
    marginBottom: 0,
  },
  container: {
    width: '100%',
  },
});

export default Article;
