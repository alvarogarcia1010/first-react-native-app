import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { TouchableNativeFeedback, TouchableOpacity } from "react-native-gesture-handler";


const CategoryGridTile = props => {

  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21)
  {
    TouchableCmp = TouchableNativeFeedback
  }

  
  return (
    <View style={styles.gridItem}>
      <TouchableCmp  onPress={props.onSelect}>
        <View style={ { ...styles.container, ...{ backgroundColor: props.color} } }>
          <Text style={styles.text} numberOfLines={2}>{props.title}</Text>
        </View>
      </TouchableCmp>
    </View>
  )
}

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
    borderRadius: 10,
    overflow: Platform.OS === 'android' && Platform.Version >= 21? 'hidden' : 'visible',
    elevation: 5,
  },
  container: {
    height: '100%',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    padding: 15,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  text: {
    fontSize: 22,
    textAlign: 'right',
    fontFamily: "open-sans-bold",
  }
})


export default CategoryGridTile
