import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default class Quiz extends Component {
  state = {
    questionIdx: 0,
    status: 'showQuestion',
    showAnswer: false,
  }

  render () {
    const styles = StyleSheet.create({
      alignment: {
        flex: 10,
        justifyContent: 'space-around',
        alignItems: 'center'
      },
      button: {
        borderRadius: 10,
        padding: 10,
        width: 150,
        alignItems: 'center',
        margin: 5,
      }
    })
    const { navigate } = this.props.navigation
    const { state } = this.props.navigation

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
              {this.state.showAnswer ?
                ('The answer from the store') :
                (' A question from the  store?') }
            </Text>
            <TouchableOpacity
              onPress={() => this.setState((state) => ({
                ...state,
                showAnswer: !state.showAnswer,
              }))}
            >
              <Text style={{color: 'red'}}>
                {this.state.showAnswer ?
                  ('Answer') :
                  ('Question') }
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: 'green'}]}
              onPress={() =>
                this.setState((state) => ({
                  ...state,
                  questionIdx: state.questionIdx + 1
                }))
              }
            >
              <Text style={{color: 'white'}}>
                Correct
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: 'red'}]}
            >
              <Text style={{color: 'white'}}>
                Incorrect
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      )
    }
}
