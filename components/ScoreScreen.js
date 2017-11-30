import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { NavigationActions } from 'react-navigation'

import { setLocalNotification, clearLocalNotification } from '../utils/notifications'

export default class ScoreScreen extends Component {
  componentDidMount() {
    clearLocalNotification()
      .then(setLocalNotification)
    }

  render () {
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
   const { goBack } = this.props.navigation

    return (
      <View style={styles.container}>
        <Text style={{fontSize: 40}}>
          Your score: {`${this.props.navigation.state.params.score}`}%
        </Text>
        <View>
          <TouchableOpacity
            onPress={() => goBack()}
            style={styles.button}>
            <Text>
              Restart Quiz
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              goBack(this.props.navigation.state.params.screenKey)
            }}
            style={styles.button}>
            <Text>
              Back to Deck
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
