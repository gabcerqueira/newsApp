import React from "react";
import { StyleSheet, View, Image } from "react-native";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
  IconButton,
  Divider,
} from "react-native-paper";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";

interface drawerComponent {
  props: DrawerContentComponentProps;

  //getBotdialogStart: () => void;
}

const DrawerContent = ({
  props,
}: //getBotdialogStart,
drawerComponent) => {
  const { colors } = useTheme();
  const theme = useTheme();
  const { navigation } = props;
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View
        style={{
          height: 120,
          backgroundColor: colors.background,
          margin: 0,
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
      >
        {/*
          
            <Image
          style={{ height: "100%", width: "90%", alignSelf: "center" }}
          resizeMode={"contain"}
          source={require("../../../assets/QUASAR-MARCA.png")}
        />
          
          */}
      </View>
      <DrawerContentScrollView {...props}>
        <Drawer.Section style={[styles.drawerSection]}>
          <Divider />
          <Drawer.Item
            icon={"home"}
            label={"Página Inicial"}
            onPress={() => navigation.navigate("Home")}
            style={[styles.drawerItem]}
            right={() => <IconButton icon={"chevron-right"} />}
          />
          <Divider />
          <Drawer.Item
            icon={"account-outline"}
            label={"Minha Conta"}
            onPress={() => navigation.navigate("Minha Conta Navigation")}
            style={styles.drawerItem}
            right={() => <IconButton icon={"chevron-right"} />}
          />
          <Divider />

          <Drawer.Item
            icon={"credit-card-outline"}
            label={"Pagamentos"}
            onPress={() => {
              navigation.navigate("Pagamentos Navigation");
            }}
            style={styles.drawerItem}
            right={() => <IconButton icon={"chevron-right"} />}
          />
          <Divider />
          <Drawer.Item
            icon={"account-voice"}
            label={"Comunicação"}
            onPress={() => {
              navigation.navigate("Comunicacao Navigation");
            }}
            style={styles.drawerItem}
            right={() => <IconButton icon={"chevron-right"} />}
          />
          <Divider />

          <Drawer.Item
            icon={"cog-outline"}
            label={"Geral"}
            onPress={() => {
              navigation.navigate("Geral Navigation");
            }}
            style={styles.drawerItem}
            right={() => <IconButton icon={"chevron-right"} />}
          />
          <Divider />

          <Drawer.Item
            icon={"logout"}
            label={"Sair"}
            onPress={() => console.log("logout")}
            style={styles.drawerItem}
            right={() => <IconButton icon={"chevron-right"} />}
          />
        </Drawer.Section>
      </DrawerContentScrollView>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  drawerItem: {
    marginHorizontal: 10,
    textAlign: "center",
    marginVertical: 5,
  },
  drawerSection: {
    flex: 1,
  },
});
