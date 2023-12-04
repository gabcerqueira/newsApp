import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";
type Props = {
  site: string;
};

const WebViewComponent = ({ site }: Props) => {
  return <WebView source={{ uri: site }} style={{ marginTop: 20, flex: 1 }} />;
};

export default WebViewComponent;

const styles = StyleSheet.create({});
