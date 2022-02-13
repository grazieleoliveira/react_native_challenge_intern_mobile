import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  FlatList,
  ListRenderItem,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {RootStackParamList} from '../../App';
import GlobalButton from '../../components/GlobalButton';
import Loading from '../../components/Loading';
import GlobalTextInput from '../../components/TextInput';
import {useLang} from '../../contexts/Language';
import {ArticlesDTO, ArticleDTO} from '../../dtos/article';
import {getArticles} from '../../services/healthCareApi';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({navigation}: Props) => {
  const [articles, setArticles] = useState<ArticlesDTO>();
  const [articlesES, setArticlesES] = useState<ArticlesDTO>();
  const [articlesEN, setArticlesEN] = useState<ArticlesDTO>();
  const [search, setSearch] = useState('');
  const {lang} = useLang();

  const fetchData = async () => {
    const articleArr = await getArticles();
    setArticles(articleArr.articles);
    setArticlesES(
      articleArr.articles?.filter((item: ArticleDTO) => item.lang === 'es'),
    );
    setArticlesEN(
      articleArr.articles?.filter((item: ArticleDTO) => item.lang === 'en'),
    );
  };

  const filterArticle = (text: string, articleList?: ArticlesDTO) => {
    return articleList?.filter(
      (item: ArticleDTO) =>
        item.title.toUpperCase().indexOf(text.toUpperCase()) > -1,
    );
  };

  const searchFilter = (text: string) => {
    if (text) {
      const newText =
        lang === 'en'
          ? filterArticle(text, articlesEN)
          : filterArticle(text, articlesES);
      setArticles(newText);
    } else {
      setArticles(lang === 'en' ? articlesEN : articlesES);
    }
    setSearch(text);
  };

  React.useEffect(() => {
    setArticles(
      lang === 'en'
        ? filterArticle(search, articlesEN)
        : filterArticle(search, articlesES),
    );
  }, [search, lang, articlesEN, articlesES]);

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
            onTouch={() => navigation.navigate('Article', item)}
            paddingVertical={8}
            fontSize={14}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0050F0"
        translucent
      />
      <View style={styles.textInput}>
        <GlobalTextInput
          value={search}
          onChangeText={text => searchFilter(String(text))}
          placeholder="Pesquisar"
          borderColor="#858585b5"
          inputColor="#3b3a3a"
          placeholderColor="#5a5a5a55"
          borderRadius={50}
          borderWidth={2}
          paddingVertical={8}
        />
      </View>
      {articles ? (
        <FlatList
          data={articles}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Loading />
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
    color: '#3b3a3a',
    flexShrink: 1,
  },
  textInput: {
    paddingHorizontal: 8,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomColor: '#7474747a',
    borderBottomWidth: 1,
  },
  readMore: {
    marginLeft: 16,
  },
});

export default Home;
