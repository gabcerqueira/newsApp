import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from "react-native";
import React, { ReactNode } from "react";

type Props = {
  altura?: number;
  largura?: number;
  children: ReactNode;
  style?: Object;
  action?: Function;
  isTouchable?: boolean;
};

const GenericCard = ({
  altura = 160,
  largura = 160,
  children,
  style,
  action,
  isTouchable = true,
}: Props) => {
  return isTouchable ? (
    <TouchableOpacity
      onPress={() => action && action()}
      style={[styles.card, { height: altura, width: largura }, style]}
    >
      {children}
    </TouchableOpacity>
  ) : (
    <View style={[styles.card, { height: altura, width: largura }, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    elevation: 3, // Adiciona sombra no Android
    shadowColor: "#000000", // Cor da sombra
    shadowOpacity: 0.3, // Opacidade da sombra
    shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra
    shadowRadius: 4, // Raio da sombra
    marginVertical: 6,
    marginHorizontal: 4,
  },
});

export default GenericCard;
