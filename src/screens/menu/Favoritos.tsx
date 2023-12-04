import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import DefaultScreenContainer from "../../components/atoms/DefaultScreenContainer";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootState } from "../../redux/root-reducer";
import News from "../../types/news/News";
import NewsCard from "../../components/atoms/NewsCard";
import { useSelector } from "react-redux";
import { ReadStackParamList } from "../../navigations/readNavigation/ReadNavigation";

type Props = {};

const Favoritos = (props: Props) => {
  const favoriteNews: News[] = useSelector(
    (state: RootState) => state.user.favoriteNews
  );

  const navigation = useNavigation<NavigationProp<ReadStackParamList>>();

  return (
    <DefaultScreenContainer>
      <FlatList
        data={favoriteNews}
        keyExtractor={(item) =>
          item._id + Date.now().toString() + Math.random().toString()
        }
        renderItem={({ item }) => (
          <View style={styles.containerCard}>
            <NewsCard
              news={item}
              action={() => {
                navigation.navigate("ReadView", {
                  link: item.link,
                });
              }}
              size={"big"}
              favorited
            />
          </View>
        )}
      />
    </DefaultScreenContainer>
  );
};

export default Favoritos;

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
