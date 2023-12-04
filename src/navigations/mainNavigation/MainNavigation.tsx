import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeNavigation from "../homeNavigation/HomeNavigation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Explore from "../../screens/explore/Explore";
import Read from "../../screens/read/Read";
import Menu from "../../screens/menu/Menu";
import Home from "../../screens/home/Home";
import { IconButton } from "react-native-paper";
import MenuNavigation from "../menuNavigation/MenuNavigation";
import ExploreContainer from "../../screens/explore/ExploreContainer";
import HomeContainer from "../../screens/home/HomeContainer";
import ReadNavigation from "../readNavigation/ReadNavigation";
import ExploreNavigation from "../exploreNavigation/ExploreNavigation";

type Props = {};

export type MainStackParamList = {
  Home: undefined;
  AnaliseDeRecursos: undefined;
};

const Tab = createBottomTabNavigator();

const MainNavigation = (props: Props) => {
  return (
    <Tab.Navigator
      initialRouteName="HomeNavigation"
      screenOptions={({ navigation, route }) => ({
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
      <Tab.Screen
        name="HomeNavigation"
        component={HomeContainer}
        options={{
          headerShown: true,
          tabBarLabel: "Home",
          headerTitle: "Home",
          tabBarIcon: (props) => <IconButton icon={"home"} size={props.size} />,
        }}
      />

      <Tab.Screen
        name="Read"
        component={ReadNavigation}
        options={{
          headerShown: false,
          tabBarIcon: (props) => (
            <IconButton icon={"book-open"} size={props.size} />
          ),
        }}
      />

      <Tab.Screen
        name="Explore"
        component={ExploreNavigation}
        options={{
          headerShown: false,
          tabBarIcon: (props) => (
            <IconButton icon={"compass"} size={props.size} />
          ),
        }}
      />

      <Tab.Screen
        name="Menu"
        component={MenuNavigation}
        options={{
          headerShown: false,
          tabBarIcon: (props) => <IconButton icon={"menu"} size={props.size} />,
        }}
      />

      {
        // casos de uso vem aq
      }
    </Tab.Navigator>
  );
};

export default MainNavigation;

const styles = StyleSheet.create({});
