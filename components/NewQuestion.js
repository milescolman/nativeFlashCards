import React, { Component } from 'react'
import { TextInput, Text, View, TouchableOpacity, Dimensions, StyleSheet, DeviceEventEmitter } from 'react-native'

import { addCardToDeck } from '../utils/storageAPI'

export default class NewQuestion extends Component {
  constructor (props) {
    super(props)
    this.state = {
      question: '',
      answer: '',
    }
  }

  render () {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
//        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 20,
      },
      button: {
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        width: 150,
        alignItems: 'center',
        margin: 5,
      },
    })
    const { goBack } = this.props.navigation

    return (
      <View style={styles.container}>
        <TextInput
          style={{padding: 10, margin: 10, borderRadius: 10, borderWidth: 2, width: Dimensions.get('window').width * 0.9}}
          placeholder='eg. What is a component?'
          onChangeText={(question) => this.setState({question})}
          value={this.state.question}
        />
        <TextInput
          style={{padding: 10, margin: 10, borderRadius: 10, borderWidth: 2, width: Dimensions.get('window').width * 0.9}}
          placeholder='eg. Components let you split the UI into pieces'
          onChangeText={(answer) => this.setState({answer})}
          value={this.state.answer}
        />
        <TouchableOpacity
          style={[styles.button, {margin: 10}]}
          onPress={() => {
            if (this.state.question && this.state.answer) {
              addCardToDeck (this.props.navigation.state.params.title, {question: this.state.question, answer: this.state.answer})
              .then(() => DeviceEventEmitter.emit('deck cards refresh', {}) )
              goBack()
            } else {
              alert('Enter a question and an answer first!')
            }
          }}
        >
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
