import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/root-reducer";
import WithSpinner from "../../components/atoms/withSpinner";
import Home from "./Home";
import { getNewsWithCategoryStart } from "../../features/news/newsActions/newsActions";

type Props = {};

const Container = WithSpinner(Home);
const HomeContainer = (props: Props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { isFetching, newsChunk } = useSelector(
    (state: RootState) => state.news
  );

  useEffect(() => {
    //dispatch(getNewsWithCategoryStart(1));
  }, []);

  return <Container isLoading={false} newsChunk={newsChunk!} />;
};

export default HomeContainer;

const styles = StyleSheet.create({});
