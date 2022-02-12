export type ArticleDTO = {
  date: string;
  url: string;
  content: string;
  tags: [];
  title: string;
  categories: Array<string>;
  lang: string;
  layout: string;
};

export type ArticlesDTO = ArticleDTO[];

