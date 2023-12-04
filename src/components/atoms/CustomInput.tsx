import { StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";
import { TextInput, useTheme } from "react-native-paper";
import { CustomTheme } from "../../styles/theme";

interface CustomInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  mode?: "flat" | "outlined";
  placeholder?: string;
  style?: Object;
  right?: ReactNode;
  secureTextEntry?: boolean;
  multiline?: boolean;
  onBlur?: Function;
  editable?: boolean;
  keyboardType?: "default" | "numeric";
  error?: boolean;
  numberOfLines?: number;
}

const CustomInput = ({
  label,
  value,
  mode = "outlined",
  onChangeText,
  placeholder,
  style,
  right,
  secureTextEntry,
  multiline = false,
  onBlur,
  editable = true,
  keyboardType = "default",
  error = false,
  numberOfLines = 1,
}: CustomInputProps) => {
  const { colors } = useTheme() as CustomTheme;

  return (
    <TextInput
      label={label}
      mode={mode}
      value={value}
      onChangeText={(text) => onChangeText(text)}
      placeholder={placeholder}
      theme={{ colors: { placeholder: error ? colors.error : colors.surface } }}
      style={[
        style,
        {
          borderRadius: 5,
          //borderWidth: 1,
          //borderColor: error ? colors.error : colors.accent,
        },
      ]}
      right={right}
      secureTextEntry={secureTextEntry}
      multiline={multiline}
      onBlur={() => onBlur && onBlur()}
      editable={editable}
      keyboardType={keyboardType}
      numberOfLines={numberOfLines}
      autoCapitalize="none"
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({});
