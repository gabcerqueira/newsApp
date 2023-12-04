import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Switch, useTheme } from "react-native-paper";
import { CustomTheme } from "../../styles/theme";

type Props = {
  value: boolean;
  onValueChange: (value: boolean) => void;
};

const CustomSwitch = ({ value, onValueChange }: Props) => {
  const { colors } = useTheme() as CustomTheme;

  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      color={colors.primary}
    />
  );
};

export default CustomSwitch;
