import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Menu from "../../screens/menu/Menu";
import DadosPessoais from "../../screens/dadosPessoais/DadosPessoais";
import CategoriesContainer from "../../screens/menu/categories/CategoriesContainer";
import Favoritos from "../../screens/menu/Favoritos";

type Props = {};

export type MenuStackParamList = {
  ["Menu"]: undefined;
  ["Dados Pessoais"]: undefined;
  Categorias: undefined;
  Favoritos: undefined;
};

const MenuStack = createStackNavigator<MenuStackParamList>();

const MenuNavigation = (props: Props) => {
  return (
    <MenuStack.Navigator
      initialRouteName="Menu"
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
      <MenuStack.Screen
        name="Menu"
        component={Menu}
        options={{ headerShown: false }}
      />
      <MenuStack.Screen
        name="Dados Pessoais"
        component={DadosPessoais}
        options={{ headerShown: true }}
      />
      <MenuStack.Screen
        name="Categorias"
        component={CategoriesContainer}
        options={{ headerShown: true }}
      />

      <MenuStack.Screen
        name="Favoritos"
        component={Favoritos}
        options={{ headerShown: true }}
      />

      {
        //
        // casos de uso vem aq
      }
    </MenuStack.Navigator>
  );
};

export default MenuNavigation;

const styles = StyleSheet.create({});
