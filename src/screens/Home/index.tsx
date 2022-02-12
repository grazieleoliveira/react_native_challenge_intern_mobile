import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {StatusBar, Text, TouchableOpacity, View} from 'react-native';
import reactotron from 'reactotron-react-native';
import {RootStackParamList} from '../../App';
import {useAuth} from '../../contexts/Auth';
import {getArticles} from '../../services/healthCareApi';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({navigation}: Props) => {
  const [articles, setArticles] = useState();

  const fetchData = async () => {
    const articleArr = await getArticles();
    setArticles(articleArr);
  };

  React.useEffect(() => {
    if (!articles) {
      fetchData();
    }
  }, [articles]);

  reactotron.log('arc', articles);
  return (
    <View>
      <StatusBar barStyle="light-content" backgroundColor="#0050F0" />
    </View>
  );
};

export default Home;
