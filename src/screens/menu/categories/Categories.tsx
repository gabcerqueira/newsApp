import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Chip } from "react-native-paper";
import HorizontalList from "../../../components/atoms/HorizontalList";
import Constants from "expo-constants";
import CustomButton from "../../../components/atoms/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { selectCategoriesStart } from "../../../features/user/userActions/userActions";
import { RootState } from "../../../redux/root-reducer";
import { User } from "../../../types/user/User";
import { Category } from "../../../types/category/Category";

interface Props {
  categories: Category[];
}

const Categories = ({ categories }: Props) => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [categoriesState, setCategories] = useState<Category[]>(
    categories.sort((a, b) => (a.name < b.name ? -1 : 1))
  );

  const dispatch = useDispatch();
  const { user, isFetching } = useSelector((state: RootState) => state.user);

  function selectCategory(category: Category) {
    // Logic to handle selected categories

    //check if category is already selected

    //Add the category
    setSelectedCategories([category, ...selectedCategories]);

    setCategories(
      categoriesState.filter((item) => item.name !== category.name)
    );
  }

  const deleteCategory = (category: Category) => {
    setSelectedCategories(
      selectedCategories.filter((item) => item.name !== category.name)
    );

    setCategories(
      [category, ...categoriesState].sort((a, b) => (a.name < b.name ? -1 : 1))
    );
  };
  console.log("USER : ", user);

  const selectCategories = () => {
    dispatch(
      selectCategoriesStart(
        user.userProfile._id as string,
        selectedCategories.map((category) => category._id)
      )
    );
  };

  return (
    <View style={{ padding: 10, flex: 1, backgroundColor: "#fff" }}>
      <ScrollView stickyHeaderIndices={[1]}>
        <Text style={styles.titleStyle}>
          Selecione as categorias que mais combinam com o seu perfil
        </Text>
        <View style={{ zIndex: 10, backgroundColor: "#fff" }}>
          {selectedCategories.length > 0 ? (
            <HorizontalList
              data={selectedCategories}
              title={"Categorias selecionadas :"}
              renderItem={({ item }: any) => (
                <Chip
                  //onPress={() => deleteCategory(item)}
                  style={{ minWidth: item.name.length * 10 + 20, margin: 5 }}
                  onClose={() => deleteCategory(item)}
                >
                  {item.name}
                </Chip>
              )}
            />
          ) : (
            <Text style={styles.subTitle}>Nenhuma categoria selecionada</Text>
          )}
        </View>

        <>
          <Text style={styles.titleStyle}>Categorias</Text>
          <View style={styles.chipContainer}>
            {categoriesState &&
              categoriesState.map((category: Category) => (
                <View key={category._id} style={styles.chipStyle}>
                  <Chip
                    onPress={() => selectCategory(category)}
                    style={{ minWidth: category.name.length * 10 + 20 }}
                  >
                    {category.name}
                  </Chip>
                </View>
              ))}
          </View>
        </>
      </ScrollView>
      <CustomButton
        title={"Selecionar"}
        onPress={() => selectCategories()}
        disabled={selectedCategories.length === 0}
        loading={isFetching}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chipStyle: {
    margin: 5, // Adjust as needed
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignSelf: "center",

    padding: 5,
    margin: 5,
  },
  titleStyle: { fontSize: 20, margin: 5, fontWeight: "bold" },
  subTitle: {
    fontSize: 12,
    margin: 5,
  },
});

export default Categories;
