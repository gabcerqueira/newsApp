import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

// <-- Screens -->
import Login from "../../screens/login/Login";
import CriarConta from "../../screens/criarConta/CriarConta";

export type AuthStackParamList = {
  Login: undefined;
  CreateAccount: undefined;
};

const AuthStack = createStackNavigator();

type Props = {};

const AuthNavigation = (props: Props) => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="CreateAccount"
        component={CriarConta}
        options={{ headerShown: true, title: "Criar Conta" }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;

const styles = StyleSheet.create({});
