import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { NavigationActions } from 'react-navigation'
export default function ScoreScreen (props) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    button: {
      borderColor: 'black',
      borderWidth: 2,
      borderRadius: 10,
      padding: 10,
      width: 150,
      alignItems: 'center',
      margin: 5,
    }
  })
//  const { navigate } = this.props.navigation

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 40}}>
        Your score: {`${props.score}`}%
      </Text>
      <View>
        <TouchableOpacity
          onPress={() => props.navigation.dispatch(NavigationActions.back({
            key: 'Quiz'
          }))}
          style={styles.button}>
          <Text>
            Restart Quiz
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => NavigationActions.back({
            key: 'Deck'
          })}
          style={styles.button}>
          <Text>
            Back to Deck
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
