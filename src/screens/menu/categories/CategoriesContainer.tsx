import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import WithSpinner from "../../../components/atoms/withSpinner";

import { useDispatch, useSelector } from "react-redux";
import Categories from "./Categories";
import { getCategoriesStart } from "../../../features/news/newsActions/newsActions";
import { RootState } from "../../../redux/root-reducer";
import { Category } from "../../../types/category/Category";

type Props = {};

const Container = WithSpinner(Categories);
const CategoriesContainer = (props: Props) => {
  const dispatch = useDispatch();

  const { isFetching, categories } = useSelector(
    (state: RootState) => state.news
  );

  useEffect(() => {
    dispatch(getCategoriesStart());
  }, []);

  return (
    <Container isLoading={isFetching} categories={categories as Category[]} />
  );
};

export default CategoriesContainer;

const styles = StyleSheet.create({});
