import { Platform, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import { resetGlobalReducer } from "../../redux/global/globalActions/globalActions";
import DropdownAlert from "react-native-dropdownalert";
import { default as Container } from "react-native-dropdownalert";
import { RootState } from "../../redux/root-reducer";
import { dropdownAlertConstants } from "../../lib/constants/DropdownAlertConstants";

type DropdownVariantTypes = "info" | "warn" | "error" | "success";

interface DropdownAlertComponentProps {
  message: string;
  variant: DropdownVariantTypes;
}

const DropdownAlertComponent = ({
  message,
  variant,
}: DropdownAlertComponentProps) => {
  const dispatch = useDispatch();
  let dropDownAlertRef: any = useRef(null);
  useEffect(() => {
    if (message && variant) {
      // disparo do componente de mensagens
      dropDownAlertRef.alertWithType(variant, message);
    }
  }, [message, variant]);

  return (
    <Container
      closeInterval={dropdownAlertConstants.DROPDOWN_CLOSE_INTERVAL}
      tapToCloseEnabled={dropdownAlertConstants.DROPDOWN_TAP_TO_CLOSE_ENABLED}
      onClose={() => dispatch(resetGlobalReducer())}
      onCancel={() => dispatch(resetGlobalReducer())}
      ref={(ref) => {
        if (ref) {
          dropDownAlertRef = ref;
        }
      }}
      containerStyle={
        Platform.OS === "android" ? styles.contentAndroid : styles.contentIOS
      }
      titleNumOfLines={dropdownAlertConstants.DROPDOWN_TITLE_NUM_OF_LINES}
      messageNumOfLines={dropdownAlertConstants.DROPDOWN_MESSAGE_NUM_OF_LINES}
      isInteraction={false}
      zIndex={9999}
    />
  );
};

const mapStateToToProps = (state: RootState) => ({
  message: state.global.message,
  variant: state.global.variantMessage,
});

export default connect(mapStateToToProps)(DropdownAlertComponent);

const styles = StyleSheet.create({
  contentAndroid: {
    height: 50,
    backgroundColor: "red",
    paddingLeft: 20,
    alignItems: "center",
  },
  contentIOS: {
    backgroundColor: "red",
    paddingLeft: 20,
    alignItems: "center",
  },
});
