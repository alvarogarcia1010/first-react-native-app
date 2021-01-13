import React from 'react'
import { useSelector } from "react-redux";
import MealList from '../components/MealList'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import { StyleSheet, View } from 'react-native';
import CustomText from '../components/CustomText';

const FavoritesScreen = props => {
  const favMeals = useSelector(state => state.meals.favoriteMeals)

  if(!favMeals || favMeals.length === 0)
  {
    return (
      <View style={styles.content}>
        <CustomText>No favorite meals found. Start adding some!</CustomText>
      </View>
    )
  }

  return (
    <MealList listData={favMeals} navigation={props.navigation} />
  )
}

FavoritesScreen.navigationOptions = (navigationData) => {
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center'
  }
})


export default FavoritesScreen

