import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, DeviceEventEmitter } from 'react-native'

import { getDeck } from '../utils/storageAPI'

class Deck extends Component {
  state = {
    title: this.props.navigation.state.params.title,
    questions: []
  }
  componentWillMount() {
    DeviceEventEmitter.addListener('deck cards refresh', (e) => {
      this.refreshCards()})
  }

  componentDidMount() {
    this.refreshCards()
  }

  refreshCards() {
    getDeck(this.props.navigation.state.params.title)
      .then((deck) => {
        this.setState((state) => ({...state, 'questions': deck['questions']}))
      })
  }

  render ()  {
    const styles = StyleSheet.create({
      title: {
        fontSize: 40
      },
      alignment: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
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
    const { navigate } = this.props.navigation
    const { state } = this.props.navigation
    return (
      <View style={styles.alignment}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.title}>{state.params.title}</Text>
          <Text style={{color: 'gray'}}>{this.state.questions.length} cards</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigate('NewQuestion', {
              title: state.params.title,
            })}
            style={styles.button}>
            <Text style={{fontSize: 20}}>
              Add Card
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate('Quiz', {
              //questions: state.params.questions,
              title: state.params.title,
            })}
            style={[styles.button, {backgroundColor: '#000'}]}>
            <Text style={{color: '#fff', fontSize: 20}}>
              Start Quiz
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
export default Deck
