import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import WithSpinner from "../../components/atoms/withSpinner";
import Explore from "./Explore";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/root-reducer";
import { getCategoriesStart } from "../../features/news/newsActions/newsActions";

type Props = {};

const Container = WithSpinner(Explore);
const ExploreContainer = (props: Props) => {
  const dispatch = useDispatch();

  const { isFetching, categories } = useSelector(
    (state: RootState) => state.news
  );

  useEffect(() => {
    dispatch(getCategoriesStart());
  }, []);

  return <Container isLoading={isFetching} categories={categories} />;
};

export default ExploreContainer;

const styles = StyleSheet.create({});
