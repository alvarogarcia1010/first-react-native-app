import React from 'react'
import {View, FlatList, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import MealItem from './MealItem';

const MealList = props => {
  const favoriteMeals = useSelector(state => state.meals.favoriteMeals)

  const onSelectMealHandler = (mealId, title) => {
    const isFavorite = favoriteMeals.some(meal => meal.id === mealId)
    props.navigation.navigate({
      routeName: "MealDetail",
      params: {
        mealId: mealId,
        mealTitle: title,
        isFav: isFavorite
      },
    });
  };

  const renderMealItem = (itemData) => (
    <MealItem
      title = {itemData.item.title}
      duration = {itemData.item.duration}
      complexity = {itemData.item.complexity}
      affordability = {itemData.item.affordability}
      image = {itemData.item.imageUrl}
      onSelectMeal = {() => onSelectMealHandler(itemData.item.id, itemData.item.title)}
    />
  );

  return (
    <View style={styles.screen}>
      <FlatList
        data={props.listData}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
        style={styles.mealList}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  mealList: {
    width: '100%'
  }
})

export default MealList
