import { Text, View } from "react-native";
import React, { ReactChild, ReactNode } from "react";
import { Button } from "react-native-paper";

export type QuasarButtonProps = {
  title: string;
  mode?: "text" | "outlined" | "contained";
  onPress: () => void;
  style?: object;
  icon?: string;
  disabled?: boolean;
  loading?: boolean;
};

const CustomButton: React.FC<QuasarButtonProps> = ({
  title,
  onPress,
  mode = "contained",
  style,
  icon,
  disabled = false,
  loading = false,
}) => {
  return (
    <Button
      mode={!disabled ? mode : "outlined"}
      onPress={onPress}
      style={[style, { borderRadius: 16 }]}
      icon={icon && icon}
      disabled={disabled}
      loading={loading}
      uppercase={false}
    >
      {title}
    </Button>
  );
};

export default CustomButton;
