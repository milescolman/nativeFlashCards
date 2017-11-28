import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function Quiz (props) {
  const styles = StyleSheet.create({
    alignment: {
      flex: 10,
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    button: {
//      borderColor: 'black',
//      borderWidth: 2,
      borderRadius: 10,
      padding: 10,
      width: 150,
      alignItems: 'center',
      margin: 5,
    }
  })
  const { navigate } = props.navigation
  const { state } = props.navigation

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Text>
          2 / 2 to be replaced with progress through quiz
        </Text>
      </View>
      <View style={styles.alignment}>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 30, textAlign: 'center'}}>
            A question from the question store?
          </Text>
          <Text style={{color: 'red'}}>
            Answer
          </Text>
        </View>
        <View>
          <TouchableOpacity style={[styles.button, {backgroundColor: 'green'}]}>
            <Text style={{color: 'white'}}>
              Correct
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, {backgroundColor: 'red'}]}>
            <Text style={{color: 'white'}}>
              Incorrect
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
      )
}
