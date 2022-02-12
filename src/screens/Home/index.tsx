import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {FlatList, StatusBar, StyleSheet, Text, View} from 'react-native';
import reactotron from 'reactotron-react-native';
import {RootStackParamList} from '../../App';
import {useLang} from '../../contexts/Language';
import {getArticles} from '../../services/healthCareApi';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({navigation}: Props) => {
  const [articles, setArticles] = useState<any>();
  const [articlesES, setArticlesES] = useState<any>();
  const [articlesEN, setArticlesEN] = useState<any>();
  const {lang} = useLang();

  const fetchData = async () => {
    const articleArr = await getArticles();
    setArticles(articleArr.articles);
    setArticlesES(
      articleArr.articles?.filter((item, index: number) => index % 2 === 0),
    );
    setArticlesEN(
      articleArr.articles?.filter((item, index: number) => index % 2 !== 0),
    );
  };

  React.useEffect(() => {
    if (!articles) {
      fetchData();
    }
  }, [articles]);

  const renderItem = ({item}) => {
    reactotron.log(item);

    return (
      <View style={{width: '100%'}}>
        <Text style={{color: 'blue'}}>{item.title}</Text>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#0050F0" />
      {articles && (
        <FlatList
          data={lang === 'en' ? articlesEN : articlesES}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

export default Home;
