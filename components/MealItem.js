import React from "react";
import { View, Text, StyleSheet, Platform, ImageBackground } from "react-native";
import {TouchableNativeFeedback,TouchableOpacity} from "react-native-gesture-handler";
import CustomText from "./CustomText";

const MealItem = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.mealItem}>
      <TouchableCmp onPress={props.onSelectMeal}>
        <View>
          <View style={{...styles.mealRow, ...styles.mealHeader}}>
            <ImageBackground source={{uri: props.image}} style={styles.bgImage}>
              <View style={styles.titleContainer}>
                <Text style={styles.title} numberOfLines={1}>{props.title}</Text>
              </View>
            </ImageBackground>
          </View>
          <View style={{...styles.mealRow, ...styles.mealDetail}}>
            <CustomText>{props.duration}m</CustomText>
            <CustomText>{props.complexity.toUpperCase()}</CustomText>
            <CustomText>{props.affordability.toUpperCase()}</CustomText>
          </View>
        </View>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  mealItem: {
    height: 200,
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10
  },
  bgImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end'
  },
  mealRow: {
    flexDirection: 'row'
  },
  mealHeader: {
    height: '85%'
  },
  mealDetail: {
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '15%'
  },
  titleContainer: {
    backgroundColor:'rgba(0,0,0,0.5)',
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: 'white',
    textAlign: 'center'
  }
});

export default MealItem;
