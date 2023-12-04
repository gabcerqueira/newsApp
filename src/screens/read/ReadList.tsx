import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultScreenContainer from "../../components/atoms/DefaultScreenContainer";
import {
  getNewsPaginatedFailure,
  getNewsPaginatedStart,
  getNewsPaginatedSuccess,
} from "../../features/news/newsActions/newsActions";
import { RootState } from "../../redux/root-reducer";
import News from "../../types/news/News";
import { Api } from "../../lib/api/api";
import { serverConfig } from "../../lib/api/config";
import { HttpResponse } from "../../lib/api/@types/httpClient";
import NewsCard from "../../components/atoms/NewsCard";
import uuid from "react-native-uuid";
import { ReadStackParamList } from "../../navigations/readNavigation/ReadNavigation";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
type Props = {};

const ReadList = (props: Props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<ReadStackParamList>>();
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { newsList, isFetching } = useSelector(
    (state: RootState) => state.news
  );

  const { favoriteNews } = useSelector((state: RootState) => state.user);

  const fetchList = async (currentPage: number, isRefreshing: boolean) => {
    try {
      isRefreshing && setRefreshing(true);

      // Simulação de uma requisição assíncrona para obter novos dados
      const api = new Api();

      const response = (await api.Fetch({
        method: "get",
        url:
          serverConfig.pathUseCases.news.getNewsPaginated.servico +
          `?pageNumber=${currentPage}&pageSize=5`,
      })) as HttpResponse<News[]>;

      dispatch(getNewsPaginatedSuccess(response.body!));
      setRefreshing(false);
    } catch (error) {
      dispatch(getNewsPaginatedFailure((error as Error).message));
      setRefreshing(false);
    }
  };

  const onRefresh = async () => {
    fetchList(currentPage, true);
  };

  const handleScroll = () => {
    if (!isFetching && currentPage < 5000 && newsList.length > 0) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    dispatch(getNewsPaginatedStart(currentPage));
    fetchList(currentPage, false);

    const cleanup = () => {
      setCurrentPage(1);
    };
    return cleanup();
  }, []);

  useEffect(() => {
    dispatch(getNewsPaginatedStart(currentPage));
    fetchList(currentPage, false);
    console.log("CURRENT PAGE : ", currentPage);
  }, [currentPage]);

  return (
    <DefaultScreenContainer>
      <FlatList
        data={newsList as News[]}
        keyExtractor={(item) =>
          item._id +
          uuid.v4().toString +
          Date.now().toString() +
          Math.random().toString()
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <View style={styles.containerCard}>
            <NewsCard
              news={item}
              action={() => {
                navigation.navigate("ReadView", {
                  news: item,
                });
              }}
              size={"big"}
              favorited={
                favoriteNews &&
                favoriteNews.some((news) => news._id === item._id)
              }
            />
          </View>
        )}
        onEndReached={handleScroll}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          isFetching ? (
            <ActivityIndicator
              //style={[styles.horizontal]}
              size="large"
              color="#a8a8a8"
            />
          ) : (
            <View style={{ height: 50 }}></View>
          )
        }
      />
    </DefaultScreenContainer>
  );
};

export default ReadList;

const styles = StyleSheet.create({
  cardContainer: {
    padding: 10,
    justifyContent: "space-between",
    flex: 1,
  },
  headline: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "auto",
    marginVertical: 5,
  },
  description: {
    marginVertical: 5,
  },
  containerCard: {
    alignItems: "center",
  },
});
