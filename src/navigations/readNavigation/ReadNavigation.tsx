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
import News from "../../types/news/News";

type Props = {};

export type ReadStackParamList = {
  ["ReadList"]: undefined;
  ["ReadListCategories"]: {
    category: string;
  };
  ["ReadView"]: {
    news: News;
  };
};

const ReadStack = createStackNavigator<ReadStackParamList>();

const ReadNavigation = (props: Props) => {
  const { favoriteNews } = useSelector((state: RootState) => state.user);

  return (
    <ReadStack.Navigator
      initialRouteName="ReadList"
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
      <ReadStack.Screen
        name="ReadList"
        component={ReadList}
        options={{ headerShown: true, headerTitle: "Read" }}
        //initialParams={{ category: "" }}
      />

      <ReadStack.Screen
        name="ReadView"
        component={Read}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: "Read",
          headerLeft: (props) => (
            <IconButton
              icon="arrow-left"
              onPress={() => navigation.navigate("ReadList")} // Use navigation.goBack() to navigate back
              iconColor="#000"
            />
          ),
          headerRight: (props) => (
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                height: 30,
                justifyContent: "flex-end",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <IconButton icon={"heart-outline"} />
              <IconButton icon={"share-outline"} />
            </View>
          ),
        })}
      />

      {
        // casos de uso vem aq
      }
    </ReadStack.Navigator>
  );
};

export default ReadNavigation;

const styles = StyleSheet.create({});
