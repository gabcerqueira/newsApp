import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { IconButton } from "react-native-paper";
import Home from "../../screens/home/Home";
import QuasarDrawer from "../../components/navigators/QuasarDrawer";
type Props = {};

const Drawer = createDrawerNavigator();

const HomeNavigation = (props: Props) => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <QuasarDrawer props={props} />}
      screenOptions={({ navigation }) => ({
        headerShown: false,

        swipeEdgeWidth: 0,
        /*
        headerShown: false,
        headerTitleAlign: 'center',
        headerLeft: () => (
          <IconButton
            icon={'menu'}
            color={'#08153f'}
            size={36}
            onPress={() => navigation.toggleDrawer()}
            style={{margin: 15}}
          />
        ),
        */
      })}
    >
      <Drawer.Screen
        name="Home"
        options={{
          headerShown: true,
        }}
      >
        {({ navigation }) => <></>}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default HomeNavigation;

const styles = StyleSheet.create({});
