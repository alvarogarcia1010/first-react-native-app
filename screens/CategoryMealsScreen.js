import React from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import CustomText from "../components/CustomText";
import MealList from "../components/MealList";
import { CATEGORIES } from "../data/dummy-data";

const CategoryMealsScreen = props => {  
  const catId = props.navigation.getParam("categoryId");
  const availableMeals = useSelector(state => state.meals.filteredMeals)

  const displayedMeals = availableMeals.filter(
    (meal) => meal.categoryIds.indexOf(catId) >= 0
  );

  if(!displayedMeals || displayedMeals.length === 0)
  {
    return (
      <View style={styles.content}>
        <CustomText>No meal found, maybe check your filters?</CustomText>
      </View>
    )
  }

  return (
    <MealList listData={displayedMeals} navigation={props.navigation} />
  );
};

CategoryMealsScreen.navigationOptions = (navigationData) => {
  const catId = navigationData.navigation.getParam("categoryId");
  const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);

  return {
    headerTitle: selectedCategory.title,
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center'
  }
})

export default CategoryMealsScreen;
