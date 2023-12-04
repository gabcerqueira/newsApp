import { StyleSheet, Text, View } from "react-native";
import React from "react";

import DropdownAlert, {
  DropdownAlertData,
  DropdownAlertType,
} from "react-native-dropdownalert";

type Props = {};

const DropdownAlertRn = (props: Props) => {
  let alert = (_data: DropdownAlertData) =>
    new Promise<DropdownAlertData>((res) => res);

  return <DropdownAlert alert={(func) => (alert = func)} />;
};

export default DropdownAlertRn;

const styles = StyleSheet.create({});
