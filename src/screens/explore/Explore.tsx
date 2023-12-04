import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import { Category } from "../../types/category/Category";
import GenericCard from "../../components/atoms/GenericCard";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import {
  clearNewsListState,
  clearNewsState,
  getCategoriesStart,
  getNewsByCategoryStart,
} from "../../features/news/newsActions/newsActions";
import { ExploreStackParamList } from "../../navigations/exploreNavigation/ExploreNavigation";

type Props = {
  categories: Category[];
};

const Explore = ({ categories }: Props) => {
  const navigation = useNavigation<NavigationProp<ExploreStackParamList>>();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    dispatch(getCategoriesStart());
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <Text style={styles.title}>Explore</Text>
        <View style={styles.cardContainer}>
          {categories &&
            categories.map((category, idx) => (
              <GenericCard
                key={idx}
                altura={160}
                largura={160}
                children={
                  <>
                    <Text>{category.name}</Text>
                  </>
                }
                style={styles.cardStyle}
                action={() => {
                  dispatch(clearNewsListState());
                  dispatch(getNewsByCategoryStart(category.name, 1));

                  navigation.navigate("ReadListCategories", {
                    category: category.name,
                  });
                }}
              />
            ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    paddingVertical: 10,
    fontSize: 20,
  },
  cardContainer: {
    flexDirection: "row", // Set flexDirection to row for horizontal arrangement
    flexWrap: "wrap", // Allow cards to wrap to the next line
    justifyContent: "space-between", // Add space between the cards
  },
  cardStyle: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: "12px",
    textWrap: "wrap",
  },
});
