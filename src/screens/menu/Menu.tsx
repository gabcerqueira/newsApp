import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";

import theme, { CustomTheme } from "../../styles/theme";
import { useTheme } from "react-native-paper";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import MenuItemList, {
  MenuItemListType,
} from "../../components/menuItemList/MenuItemList";
import { MenuStackParamList } from "../../navigations/menuNavigation/MenuNavigation";
import ScreenContainer from "../../components/ScreenContainer/ScreenContainer";
import { logout } from "../../features/user/userActions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/root-reducer";
import { User } from "../../types/user/User";
import { clearNewsState } from "../../features/news/newsActions/newsActions";

type Props = {};

const Menu = (props: Props) => {
  const { colors } = useTheme() as CustomTheme;

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user) as User;

  const navigation = useNavigation<NavigationProp<MenuStackParamList>>();

  useEffect(() => {}, []);

  const listaMenu: MenuItemListType[] = [
    {
      icon: "key-outline",
      title: "Dados Pessoais",
      action: () => navigation.navigate("Dados Pessoais"),
      description: "Entre para ver os dados pessoais",
    },
    {
      icon: "text-box-outline",
      title: "Categorias",
      action: () => navigation.navigate("Categorias"),
      description: "Escolha as categorias de seu interesse",
    },
    {
      icon: "star-outline",
      title: "Favoritos",
      action: () => navigation.navigate("Favoritos"),
      description: "Suas notícias favoritas",
    },
    {
      icon: "logout",
      title: "logout",
      action: () => {
        dispatch(logout());
        dispatch(clearNewsState());
      },
      description: "",
    },
  ];

  return (
    <ScreenContainer>
      <View style={styles.userInfo}>
        {/* 

             <MAvatarImage imageSize={48} imageUrl={user.image} />
            */}

        <View>
          <Text style={{ color: colors.primary, fontSize: 28, paddingTop: 8 }}>
            {user.name}
          </Text>
          <Text style={{ color: colors.primary, fontSize: 18 }}>
            {user.email}
          </Text>
        </View>
      </View>
      <View>
        {listaMenu.map((item, idx) => (
          <MenuItemList key={idx} menuItemList={item} />
        ))}
      </View>
    </ScreenContainer>
  );
};

export default Menu;

const styles = StyleSheet.create({
  userInfo: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
