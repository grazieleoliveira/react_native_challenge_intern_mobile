import axios from 'axios';

const uri = 'https://www.healthcare.gov/api/articles.json';

type Response = {
  data?: Object[];
  status: number;
};

export const getArticles = async () => {
  try {
    const res = await axios.get(uri);
    if (res.status === 200) {
      return res.data;
    }
  } catch (e) {}
};
