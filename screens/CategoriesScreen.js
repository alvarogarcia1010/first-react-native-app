import React from "react";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import CategoryGridTile from "../components/CategoryGridTile";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import { CATEGORIES } from "../data/dummy-data";

const CategoriesScreen = (props) => {
  const onSelectCategoryHandler = (categoryId) => {
    props.navigation.navigate({
      routeName: "CategoryMeals",
      params: {
        categoryId: categoryId,
      },
    });
  };

  const renderGridItem = (itemData) => (
    <CategoryGridTile
      title={itemData.item.title}
      color={itemData.item.color}
      onSelect={() => onSelectCategoryHandler(itemData.item.id)}
    />
  );

  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={CATEGORIES}
      renderItem={renderGridItem}
      numColumns={2}
      
    />
  );
};

CategoriesScreen.navigationOptions = (navigationData) => {
  return {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title="Menu" iconName='ios-menu' onPress={ () => {
          navigationData.navigation.toggleDrawer();
        }} />
      </HeaderButtons>
    )
  };
};


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoriesScreen;
