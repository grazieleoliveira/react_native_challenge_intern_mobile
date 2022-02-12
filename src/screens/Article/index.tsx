import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {ScrollView, Text, useWindowDimensions, View} from 'react-native';
import {RootStackParamList} from '../../App';
import RenderHtml from 'react-native-render-html';
import reactotron from 'reactotron-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Article'>;

const Article = ({route}: Props) => {
  const {title, content} = route.params;
  const {width} = useWindowDimensions();

  reactotron.log(`CONT`, content);

  return (
    <ScrollView>
      <Text>{title}</Text>
      <RenderHtml
        ignoredDomTags={['span']}
        contentWidth={width}
        source={{html: content}}
      />
    </ScrollView>
  );
};

export default Article;
