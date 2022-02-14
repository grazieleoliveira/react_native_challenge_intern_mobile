import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {RootStackParamList} from '../../App';
import RenderHtml, {defaultSystemFonts} from 'react-native-render-html';
import {formatDate} from '../../utils/date';

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

const BASE_URL = 'https://www.healthcare.gov';

type Props = NativeStackScreenProps<RootStackParamList, 'Article'>;

const Article = ({route, navigation}: Props) => {
  const {title, content, date, url} = route.params;
  const {width} = useWindowDimensions();

  React.useLayoutEffect(() => {
    if (url) {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            onPress={() => Linking.openURL(`${BASE_URL}${url}`)}>
            <Image
              style={styles.externalLink}
              source={require('../../assets/images/exit-top-right.png')}
            />
          </TouchableOpacity>
        ),
      });
    }
  }, [url, navigation]);

  const systemFonts = [...defaultSystemFonts, 'Roboto-Regular', 'Roboto-Bold'];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.mainTitle}>{title}</Text>
      {!date.startsWith('0') && (
        <Text style={styles.date}>{formatDate(date)}</Text>
      )}
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
    fontSize: 24,
    color: '#3b3a3a',
    alignSelf: 'center',
    textAlign: 'center',
    margin: 24,
    marginBottom: 0,
  },
  date: {
    alignSelf: 'center',
    marginTop: 4,
    color: '#414545',
  },
  container: {
    width: '100%',
  },
  externalLink: {
    width: 24,
    height: 24,
    tintColor: '#FFF',
  },
});

export default Article;
