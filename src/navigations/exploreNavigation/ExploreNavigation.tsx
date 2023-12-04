import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Menu from "../../screens/menu/Menu";
import DadosPessoais from "../../screens/dadosPessoais/DadosPessoais";
import ReadList from "../../screens/read/ReadList";
import Read from "../../screens/read/Read";
import { IconButton } from "react-native-paper";
import { RootState } from "../../redux/root-reducer";
import { useSelector } from "react-redux";
import ReadListCategories from "../../screens/read/ReadListCategories";
import ExploreContainer from "../../screens/explore/ExploreContainer";

type Props = {};

export type ExploreStackParamList = {
  ["ExploreContainer"]: undefined;
  ["ReadListCategories"]: {
    category: string;
  };
};

const ExploreStack = createStackNavigator<ExploreStackParamList>();

const ExploreNavigation = (props: Props) => {
  const { favoriteNews } = useSelector((state: RootState) => state.user);

  return (
    <ExploreStack.Navigator
      initialRouteName="ExploreContainer"
      screenOptions={() => ({
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "bold",
        },

        /*
        transitionSpec: {
          open: TransitionSpecs.TransitionIOSSpec,
          close: TransitionSpecs.TransitionIOSSpec,
        },
        */
      })}
    >
      <ExploreStack.Screen
        name="ExploreContainer"
        component={ExploreContainer}
        options={{ headerShown: true, headerTitle: "Explore" }}
        //initialParams={{ category: "" }}
      />

      <ExploreStack.Screen
        name="ReadListCategories"
        component={ReadListCategories}
        options={{ headerShown: true, headerTitle: "Read" }}
        initialParams={{ category: "" }}
      />

      {
        // casos de uso vem aq
      }
    </ExploreStack.Navigator>
  );
};

export default ExploreNavigation;

const styles = StyleSheet.create({});
