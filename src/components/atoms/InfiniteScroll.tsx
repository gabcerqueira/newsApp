import React, { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator, Text } from "react-native";
import axios from "axios";

interface NewsItem {
  title: string;
  // Adicione outras propriedades da notícia conforme necessário
}

const InfiniteScrollComponent: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNews();
  }, [page]);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.example.com/news?page=${page}`
      );
      const newNews = response.data as NewsItem[];
      setNews([...news, ...newNews]);
      setPage(page + 1);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderNewsItem = ({ item }: { item: NewsItem }) => {
    return <Text>{item.title}</Text>; // Renderiza o título da notícia
  };

  const renderFooter = () => {
    return loading ? <ActivityIndicator size="large" color="#0000ff" /> : null;
  };

  const handleLoadMore = () => {
    if (!loading) {
      fetchNews();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={news}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderNewsItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default InfiniteScrollComponent;
