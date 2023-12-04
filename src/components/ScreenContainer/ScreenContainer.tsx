import { StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";

export interface Props {
  children: ReactNode;
}

export default function ScreenContainer({ children }: Props) {
  return <View style={[styles.container]}>{children}</View>;
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
});
