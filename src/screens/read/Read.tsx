import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ReadStackParamList } from "../../navigations/readNavigation/ReadNavigation";
import WebViewComponent from "../../components/atoms/WebView";
import { IconButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/root-reducer";
import { User } from "../../types/user/User";
import { addReadingTimeStart } from "../../features/user/userActions/userActions";

type Props = {};

const Read = (props: Props) => {
  const {
    params: { news },
  } = useRoute<RouteProp<ReadStackParamList, "ReadView">>();
  const dispatch = useDispatch();
  const user: User = useSelector((state: RootState) => state.user.user);

  const startTimeRef = useRef(performance.now());

  useEffect(() => {
    return () => {
      // Componente está sendo desmontado
      const endTime = performance.now();
      const totalTimeOnScreen = endTime - startTimeRef.current;

      dispatch(
        addReadingTimeStart({
          news: news._id,
          readingTime: totalTimeOnScreen,
          userProfile: user.userProfile._id,
        })
      );
    };
  }, []);

  return <WebViewComponent site={news.link || "google.com"} />;
};

export default Read;

const styles = StyleSheet.create({});
