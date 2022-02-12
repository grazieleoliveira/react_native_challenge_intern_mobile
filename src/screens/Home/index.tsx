import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import reactotron from 'reactotron-react-native';
import {RootStackParamList} from '../../App';
import GlobalButton from '../../components/GlobalButton';
import {useLang} from '../../contexts/Language';
import {ArticlesDTO, ArticleDTO} from '../../dtos/article';
import {getArticles} from '../../services/healthCareApi';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({navigation}: Props) => {
  const [articles, setArticles] = useState<ArticlesDTO>();
  const [articlesES, setArticlesES] = useState<ArticlesDTO>();
  const [articlesEN, setArticlesEN] = useState<ArticlesDTO>();
  const {lang} = useLang();

  const fetchData = async () => {
    const articleArr = await getArticles();
    setArticles(articleArr.articles);
    setArticlesES(
      articleArr.articles?.filter(
        (item: ArticleDTO, index: number) => index % 2 === 0,
      ),
    );
    setArticlesEN(
      articleArr.articles?.filter(
        (item: ArticleDTO, index: number) => index % 2 !== 0,
      ),
    );
  };

  React.useEffect(() => {
    if (!articles) {
      fetchData();
    }
  }, [articles]);

  const renderItem: ListRenderItem<ArticleDTO> = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <View style={styles.readMore}>
          <GlobalButton
            title="Ler Mais"
            colorText="#FFF"
            color="#0050F0"
            onTouch={() => navigation.navigate('Article')}
            paddingVertical={8}
            fontSize={14}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#0050F0" />
      {articles ? (
        <FlatList
          data={lang === 'en' ? articlesEN : articlesES}
          renderItem={renderItem}
        />
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={64} color="#0050F0" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 16,
  },
  itemTitle: {
    fontFamily: 'Roboto-Medium',
    width: '100%',
    color: '#000',
    flexShrink: 1,
  },
  readMore: {
    marginLeft: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
