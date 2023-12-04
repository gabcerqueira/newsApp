import {
  FlatList,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
  Linking,
  Share,
} from "react-native";
import React, { useEffect, useState } from "react";
import DefaultScreenContainer from "../../components/atoms/DefaultScreenContainer";
import { NewsChunk } from "../../types/news/NewsChunk";
import HorizontalList from "../../components/atoms/HorizontalList";
import GenericCard from "../../components/atoms/GenericCard";
import News from "../../types/news/News";
import CustomButton from "../../components/atoms/CustomButton";
import { getNewsWithCategoryStart } from "../../features/news/newsActions/newsActions";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/atoms/Spinner";
import { RootState } from "../../redux/root-reducer";
import { ActivityIndicator, IconButton } from "react-native-paper";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ReadStackParamList } from "../../navigations/readNavigation/ReadNavigation";
import * as Sharing from "expo-sharing";
import {
  unFavoriteNews,
  favoriteNews as favNewsFunction,
} from "../../features/user/userActions/userActions";

type Props = {
  newsChunk: NewsChunk[];
};

const Home = ({ newsChunk }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const { isFetching } = useSelector((state: RootState) => state.news);
  const favoriteNews: News[] = useSelector(
    (state: RootState) => state.user.favoriteNews
  );

  const handleScroll = () => {
    if (!isFetching && currentPage < 5000) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    dispatch(getNewsWithCategoryStart(currentPage));
    console.log("CURRENT PAGE : ", currentPage);
  }, [currentPage]);

  useEffect(() => {
    dispatch(getNewsWithCategoryStart(currentPage));
  }, []);

  const shareLink = async (url: string) => {
    try {
      const message = `Olá, parece que temos uma notícia para voce acesse : ${url}`;

      if (!(await Sharing.isAvailableAsync())) {
        throw new Error("Falha ao compartilhar link");
      }

      Share.share({
        //subject: "Compartilhamento de Notícia",
        title: "News de NewsApp",
        message,
        url: "url",
      });
    } catch (error) {
      console.error((error as Error).message);
      Alert.alert((error as Error).name, (error as Error).message);
    }
  };
  console.log("CHUNK : ", newsChunk);
  return (
    <DefaultScreenContainer>
      <FlatList
        data={newsChunk}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={({ item }) => (
          <HorizontalList
            data={item.news}
            title={item.category}
            renderItem={({ item }: any) => (
              <GenericCard
                key={item.date + item.authors}
                altura={400}
                largura={280}
                isTouchable={false}
              >
                <View style={styles.cardContainer}>
                  <View>
                    <Text style={styles.headline}>{item.headline}</Text>
                    <Text style={styles.description}>
                      {item.short_description}
                    </Text>
                    <Text style={styles.description}>{item.authors}</Text>
                    <Text style={styles.description}>{item.date}</Text>
                  </View>

                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        width: "100%",
                        height: 30,
                        justifyContent: "flex-start",
                        alignItems: "center",
                        marginVertical: 10,
                      }}
                    >
                      <IconButton
                        icon={
                          favoriteNews &&
                          favoriteNews.some((news) => news._id === item._id)
                            ? "heart"
                            : "heart-outline"
                        }
                        onPress={() =>
                          favoriteNews &&
                          favoriteNews.some((news) => news._id === item._id)
                            ? dispatch(unFavoriteNews(item))
                            : dispatch(favNewsFunction(item))
                        }
                      />

                      <IconButton
                        icon={"share-outline"}
                        onPress={() => shareLink(item.link)}
                      />
                    </View>
                    <CustomButton
                      title={"Read More"}
                      onPress={() => {
                        navigation.navigate("Read", {
                          screen: "ReadView",
                          params: {
                            news: item,
                          },
                        });
                      }}
                    />
                  </View>
                </View>
              </GenericCard>
            )}
          />
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
            <></>
          )
        }
      />
    </DefaultScreenContainer>
  );
};

export default Home;

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
});
