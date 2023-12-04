import { Share, StyleSheet, Text, View } from "react-native";
import React from "react";
import GenericCard from "./GenericCard";
import News from "../../types/news/News";
import CustomButton from "./CustomButton";
import uuid from "react-native-uuid";
import { IconButton } from "react-native-paper";
import { useDispatch } from "react-redux";
import {
  favoriteNews,
  unFavoriteNews,
} from "../../features/user/userActions/userActions";
type Props = {
  news: News;
  action: Function;
  size: "big" | "medium";
  favorited: boolean;
};
const CardSize = {
  medium: {
    height: 360,
    width: 240,
  },
  big: {
    height: 480,
    width: 360,
  },
};

const NewsCard = ({ news, action, size, favorited = false }: Props) => {
  const dispatch = useDispatch();

  return (
    <GenericCard
      //key={uuid.v4().toString + Date.now().toString() + news._id}
      altura={CardSize[size].height}
      largura={CardSize[size].width}
      action={() => console.log("tey")}
      isTouchable={false}
    >
      <View style={styles.cardContainer}>
        <View>
          <Text style={styles.category}>{news.category}</Text>
          <Text style={styles.headline}>{news.headline}</Text>
          <Text style={styles.short_description}>{news.short_description}</Text>

          <Text style={styles.description}>{news.authors}</Text>
          <Text style={styles.description}>{news.date}</Text>
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
              icon={favorited ? "heart" : "heart-outline"}
              onPress={() => {
                return favorited
                  ? dispatch(unFavoriteNews(news))
                  : dispatch(favoriteNews(news));
              }}
            />
            <IconButton
              icon={"share-outline"}
              onPress={() =>
                Share.share({
                  //subject: "Compartilhamento de Notícia",
                  title: "News de NewsApp",
                  message: `Parece que temos uma notícia pra você ! acesse : ${news.link}`,
                  url: "url",
                })
              }
            />
          </View>
          <CustomButton title={"Read More"} onPress={() => action()} />
        </View>
      </View>
    </GenericCard>
  );
};

export default NewsCard;

const styles = StyleSheet.create({
  cardContainer: {
    padding: 10,
    justifyContent: "space-between",
    flex: 1,
  },
  headline: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "auto",
    marginVertical: 5,
  },
  description: {
    marginVertical: 5,
  },
  short_description: {
    fontSize: 16,

    textAlign: "auto",
    marginVertical: 20,
  },
  category: {
    fontSize: 18,
    //fontWeight: "bold",
    textAlign: "auto",
    marginVertical: 10,
  },
});
