import "react-native-gesture-handler";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import Constants from "expo-constants";
import { MyButton } from "./src/components/Button/Button";
import AppNavigation from "./src/navigations/appNavigation/AppNavigation";
import theme from "./src/styles/theme";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider, useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./src/redux/store";
import DropdownAlert from "./src/components/message/DropdownAlert";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaView style={styles.container}>
          <PaperProvider theme={theme}>
            <StatusBar barStyle="default" />
            <DropdownAlert />
            <AppNavigation />
          </PaperProvider>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}

let AppEntryPoint = App;

if (Constants.expoConfig?.extra?.storybookEnabled === "true") {
  AppEntryPoint = require("./.ondevice").default;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppEntryPoint;
