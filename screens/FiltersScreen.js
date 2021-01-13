import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { useDispatch } from 'react-redux'
import { Switch } from "react-native-gesture-handler";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import CustomText from "../components/CustomText";
import Colors from "../constants/Colors";
import { setFilter } from "../store/actions/meals";

const FilterSwitch = props => {
  return (
    <View style={styles.filterContainer}>
      <CustomText>{props.label}</CustomText>
      <Switch
        trackColor={{true: Colors.primaryColor}}
        thumbColor={Platform.OS === 'android'? Colors.primaryColor : '' }
        value={props.value}
        onValueChange={props.onValueChange}
      />
    </View>
  )
}

const FiltersScreen = (props) => {
  const { navigation } = props;
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const dispatch = useDispatch()

  const saveFilter = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vegetarian: isVegetarian
    }

    dispatch(setFilter(appliedFilters))
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian])

  useEffect(() => {
    navigation.setParams({
      save: saveFilter
    });
  }, [saveFilter])

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>
      <FilterSwitch 
        label="Gluten-free"
        value={isGlutenFree}
        onValueChange={(newValue) => setIsGlutenFree(newValue)}
      />
      <FilterSwitch 
        label="Lactose free"
        value={isLactoseFree}
        onValueChange={(newValue) => setIsLactoseFree(newValue)}
      />
      <FilterSwitch 
        label="Vegan"
        value={isVegan}
        onValueChange={(newValue) => setIsVegan(newValue)}
      />
      <FilterSwitch 
        label="Vegetarian"
        value={isVegetarian}
        onValueChange={(newValue) => setIsVegetarian(newValue)}
      />
    </View>
  );
};

FiltersScreen.navigationOptions = (navigationData) => {
  return {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navigationData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title="Save"
        iconName="ios-save"
        onPress={ navigationData.navigation.getParam('save') }
      />
    </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    margin: 20,
    textAlign: "center",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginVertical: 6
  },
});

export default FiltersScreen;
