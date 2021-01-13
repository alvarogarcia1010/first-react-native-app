import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { useSelector, useDispatch } from "react-redux";
import { ScrollView } from 'react-native-gesture-handler';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import CustomText from '../components/CustomText';
import { toggleFavorite } from '../store/actions/meals';
import { useCallback } from 'react';

const ListItem = props => (
  <View style={styles.listItem}>
    <CustomText>{props.children}</CustomText>
  </View>
)

const MealDetailScreen = props => {
  const availableMeals = useSelector(state => state.meals.meals)
  const mealId = props.navigation.getParam('mealId');
  const selectedMeal = availableMeals.find(meal => meal.id === mealId);
  const currentMealIsFavorite = useSelector(state => state.meals.favoriteMeals.some(meal => meal.id === mealId))
  const dispatch = useDispatch()

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId))
  },[dispatch, mealId])

  useEffect(() => {
    props.navigation.setParams({toggleFav: toggleFavoriteHandler})
  }, [toggleFavoriteHandler])

  useEffect(() => {
    props.navigation.setParams({isFav: currentMealIsFavorite})
  }, [currentMealIsFavorite])
  
  return (
    <ScrollView>
      <Image source={{uri: selectedMeal.imageUrl}} style={styles.image} />
      <View style={styles.details}>
        <CustomText>{selectedMeal.duration}m</CustomText>
        <CustomText>{selectedMeal.complexity.toUpperCase()}</CustomText>
        <CustomText>{selectedMeal.affordability.toUpperCase()}</CustomText>
      </View>
      <Text style={styles.title}>Ingredientes</Text>
      {selectedMeal.ingredients.map( ingredient => <ListItem key={ingredient}>{ingredient}</ListItem>)}
      <Text style={styles.title}>Pasos</Text>
      {selectedMeal.steps.map( step => <ListItem key={step}>{step}</ListItem>)}

    </ScrollView>
  )
}

MealDetailScreen.navigationOptions = (navigationData) => {
  //const mealId = navigationData.navigation.getParam("mealId");
  const toggleFav = navigationData.navigation.getParam("toggleFav");
  const mealTitle = navigationData.navigation.getParam("mealTitle");
  const isFavorite = navigationData.navigation.getParam("isFav");
  console.log(isFavorite)

  return {
    headerTitle: mealTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title="Favorite" iconName={isFavorite? 'ios-star' : 'ios-star-outline'} onPress={ toggleFav } />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    textAlign: 'center'
  }, 
  listItem: {
    marginVertical: 5,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10
  }
})

export default MealDetailScreen