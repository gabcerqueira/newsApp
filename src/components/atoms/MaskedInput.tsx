import React, { ReactEventHandler } from "react";
import { StyleProp } from "react-native";

import { TextInput } from "react-native-paper";
import { mask } from "remask";
export type maskTypes = "cpf" | "cnpj";

interface maskedInputProps {
  value: string;
  onChangeText: (text: string) => void | Function | undefined;
  style: StyleProp<any>;
  placeholder: string;
  label: string;
  keyboard: "numeric" | "default";
  mode: "flat" | "outlined";
  editable?: boolean;
}

export const MaskedInput = ({
  value,
  onChangeText,
  style,
  label,
  placeholder,
  keyboard,
  mode,
  editable = true,
}: maskedInputProps) => {
  const patterns = ["999.999.999-99", "99.999.999/9999-99"];

  const handleMascaraCpfCnpj = (text: string) => {
    return onChangeText(mask(text.replace(/(\.|\/|\-)/g, ""), patterns));
  };

  return (
    <TextInput
      autoComplete={"off"}
      label={label}
      placeholder={placeholder}
      style={style}
      value={value}
      onChangeText={(text) => handleMascaraCpfCnpj(text)}
      keyboardType={keyboard}
      mode={mode}
      editable={editable}
    />
  );
};

/* 




*/

/*

 <TextInputMask type={value.length > 11 ?'cnpj' :'cpf'} value={value} onChangeText={onChangeText} />

*/
