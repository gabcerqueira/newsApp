import { View, Text, StyleSheet } from "react-native";
import React, { ReactNode } from "react";
import { useTheme } from "react-native-paper";
import { CustomTheme } from "../../styles/theme";

type DefaultScreenContainerProps = {
  children: ReactNode;
};

const DefaultScreenContainer = ({ children }: DefaultScreenContainerProps) => {
  const { colors } = useTheme() as CustomTheme;

  return <View style={[styles.container]}>{children}</View>;
};

export default DefaultScreenContainer;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
});
