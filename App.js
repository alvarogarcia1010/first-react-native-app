import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { enableScreens} from 'react-native-screens'
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import mealsReducer from './store/reducers/meals';
import MealsNavigator from './navigation/MealsNavigator';

enableScreens()

const rootReducer = combineReducers({
  meals: mealsReducer
})

const store = createStore(rootReducer);

const fetchFonts = () => {
  return Font.loadAsync({
    "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
  });
};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  
  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setDataLoaded(true)
        }}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <MealsNavigator />
    </Provider>
  );
}