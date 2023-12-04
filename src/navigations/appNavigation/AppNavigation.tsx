import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
//import {RootState} from '../../redux/root-reducer';
//import {connect} from 'react-redux';

// <-- Navigators -->

import MainNavigation from "../mainNavigation/MainNavigation";
import AuthNavigation from "../authNavigation/AuthNavigation";
import { connect } from "react-redux";
import { RootState } from "../../redux/root-reducer";

type Props = {
  isUserAuthenticated?: boolean;
};

export type RootStackParamList = {
  Main: undefined;
  Auth: undefined;
};

const AppNavigation = ({ isUserAuthenticated }: Props) => {
  // console.log('isUserAuthenticated : ', isUserAuthenticated);

  return (
    <NavigationContainer>
      {isUserAuthenticated ? <MainNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

const mapStateToProps = (state: RootState) => ({
  isUserAuthenticated: state.user.isUserAuthenticated,
});

export default connect(mapStateToProps)(AppNavigation);
