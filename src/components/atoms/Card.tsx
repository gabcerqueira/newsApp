import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useTheme } from "react-native-paper";
import { CustomTheme } from "../../styles/theme";

export type CardType = {
  img: string;
  title: string;
  text: string;
  action?: () => void;
};

type Props = {
  card: CardType;
};

const Card = ({ card: { img, title, text, action } }: Props) => {
  const { colors } = useTheme() as CustomTheme;

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.backgroundItem }]}
      onPress={action}
    >
      <Image style={styles.img} source={{ uri: img }} />
      <View style={styles.cardInfo}>
        <Text style={[styles.title, { color: colors.secondary }]}>{title}</Text>
        <Text style={[styles.title, { color: colors.primary }]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    alignItems: "center",
    width: 140,
    height: 200,
    borderRadius: 16,
    padding: 5,
    margin: 10,
    elevation: 3,
  },
  title: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 10,
    //alignSelf: 'center',
  },
  cardInfo: {
    margin: 5,
    justifyContent: "space-between",

    height: "35%",
    alignItems: "center",
    // flexWrap: 'wrap',
  },
});
